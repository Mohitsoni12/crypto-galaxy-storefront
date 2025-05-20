
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, ExternalLink } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const GameListPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setGames(data);
      } catch (error: any) {
        console.error("Error fetching games:", error.message);
        toast({
          title: "Error",
          description: "Failed to load games. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [toast]);

  const handleDownload = async (game: Game) => {
    try {
      if (!game.file_path) {
        toast({
          title: "Download unavailable",
          description: "This game doesn't have a downloadable file.",
          variant: "destructive",
        });
        return;
      }

      // Get file URL
      const { data, error } = await supabase.storage
        .from("game_files")
        .createSignedUrl(game.file_path, 60);

      if (error) {
        throw error;
      }

      if (!data.signedUrl) {
        throw new Error("Failed to generate download URL");
      }

      // Update download count
      const { error: updateError } = await supabase
        .from("games")
        .update({ download_count: (game.download_count || 0) + 1 })
        .eq("id", game.id);

      if (updateError) {
        console.error("Failed to update download count:", updateError);
      } else {
        // Update local state
        setGames(games.map(g => 
          g.id === game.id ? { ...g, download_count: (g.download_count || 0) + 1 } : g
        ));
      }

      // Trigger download
      window.open(data.signedUrl, "_blank");
    } catch (error: any) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-lg">Loading games...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Game Library</h1>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-2">No games available yet</h2>
            <p className="text-muted-foreground">Check back later for new releases!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden flex flex-col h-full">
                <CardHeader>
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>
                    {game.download_count || 0} downloads
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm line-clamp-4">
                    {game.description || "No description available."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownload(game)}
                    disabled={!game.file_path}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  
                  {game.trial_url && (
                    <Button 
                      variant="secondary"
                      asChild
                    >
                      <Link to={`/trial/${game.id}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Play Trial
                      </Link>
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
