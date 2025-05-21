
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Download, Star, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrialPlayerPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;

      try {
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .eq("id", gameId)
          .single();

        if (error) {
          throw error;
        }

        if (!data.trial_url) {
          toast({
            title: "No trial available",
            description: "This game doesn't have a trial version.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }

        // Get thumbnail URL
        let thumbnailUrl = null;
        if (data.thumbnail_path) {
          const { data: urlData } = await supabase.storage
            .from('game_thumbnails')
            .getPublicUrl(data.thumbnail_path);
          
          if (urlData) {
            thumbnailUrl = urlData.publicUrl;
          }
        }
        
        // Track user trial play history if logged in
        if (user) {
          const { error: historyError } = await supabase
            .from('user_game_history')
            .upsert({ 
              user_id: user.id, 
              game_id: gameId,
              played_trial_at: new Date().toISOString(),
              last_action: 'play_trial'
            }, {
              onConflict: 'user_id,game_id'
            });

          if (historyError) {
            console.error("Error tracking play history:", historyError);
          }
        }

        setGame({ ...data, thumbnailUrl } as Game);

      } catch (error: any) {
        console.error("Error fetching game:", error);
        toast({
          title: "Error",
          description: "Failed to load game trial. Please try again.",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId, navigate, toast, user]);

  const handleDownload = async () => {
    if (!game || !game.file_path || !user) return;
    
    try {
      setIsDownloading(true);

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
      
      // Track user download history
      const { error: historyError } = await supabase
        .from('user_game_history')
        .upsert({ 
          user_id: user.id, 
          game_id: game.id,
          downloaded_at: new Date().toISOString(),
          last_action: 'download'
        }, {
          onConflict: 'user_id,game_id'
        });

      if (historyError) {
        console.error("Error tracking download history:", historyError);
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
      
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Unable to download the game. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading trial...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!game || !game.trial_url) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Trial Not Available</h2>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="self-start">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Games
          </Button>
          
          <div className="flex items-center justify-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Trial Version
            </Badge>
            
            {game.file_path && (
              user ? (
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  variant="default"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Game
                    </>
                  )}
                </Button>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download Full Game
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login Required</DialogTitle>
                      <DialogDescription>
                        You need to be logged in to download the full game.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link to="/auth" state={{ from: { pathname: `/trial/${gameId}` } }}>
                        <Button>Login / Register</Button>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )
            )}
          </div>
        </div>

        <Card className="mb-4">
          <CardHeader className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {game.thumbnailUrl && (
              <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden">
                <img 
                  src={game.thumbnailUrl} 
                  alt={`${game.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-3xl">{game.title}</CardTitle>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <Download className="h-4 w-4 mr-1" /> 
                {game.download_count || 0} downloads
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-xl border border-primary/20" style={{ height: "70vh" }}>
          <iframe
            src={game.trial_url}
            title={`${game.title} Trial`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          />
        </div>
        
        {game.description && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-3">About This Game</h2>
              <p className="text-gray-700 dark:text-gray-300">{game.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default TrialPlayerPage;
