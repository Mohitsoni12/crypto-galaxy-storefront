
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Play, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Game } from "@/types/game";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GameListPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setGames(data as Game[]);
      }
    } catch (error: any) {
      console.error("Error fetching games:", error);
      toast({
        title: "Error",
        description: "Failed to load games. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (game: Game) => {
    if (!game.file_path) {
      toast({
        title: "Download unavailable",
        description: "This game doesn't have a downloadable file.",
        variant: "destructive",
      });
      return;
    }

    // If user is not logged in, we don't proceed with download
    if (!user) {
      return;
    }

    try {
      setDownloadingId(game.id);

      // Get download URL
      const { data, error } = await supabase.storage
        .from('game_files')
        .createSignedUrl(game.file_path, 60); // URL expires in 60 seconds

      if (error) throw error;

      // Update download count
      const { error: updateError } = await supabase
        .from('games')
        .update({ download_count: (game.download_count || 0) + 1 })
        .eq('id', game.id);
        
      if (updateError) {
        console.error("Error updating download count:", updateError);
      }

      // Trigger download
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = game.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `${game.title} is being downloaded.`,
      });
      
      // Refresh games to show updated download count
      fetchGames();
      
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Unable to download the game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Game Library</h1>
          {isAdmin && (
            <Link to="/admin">
              <Button>Upload New Game</Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No Games Available</h2>
            <p className="text-muted-foreground">
              {isAdmin 
                ? "Add a new game by clicking the 'Upload New Game' button above."
                : "Check back later for new games!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden flex flex-col">
                <CardHeader>
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>
                    {game.download_count} {game.download_count === 1 ? 'download' : 'downloads'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {game.description || "No description available."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  {user ? (
                    <Button
                      variant={game.file_path ? "default" : "outline"}
                      className="flex-1"
                      disabled={!game.file_path || downloadingId === game.id}
                      onClick={() => handleDownload(game)}
                    >
                      {downloadingId === game.id ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Download
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" className="flex-1">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Login Required</DialogTitle>
                          <DialogDescription>
                            You need to be logged in to download games.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Link to="/auth">
                            <Button>Login / Register</Button>
                          </Link>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                  
                  {game.trial_url ? (
                    <Link to={`/trial/${game.id}`} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Play Trial
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" disabled className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      No Trial
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default GameListPage;
