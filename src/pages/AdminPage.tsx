
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { Game } from "@/types/game";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameUploadForm from "@/components/admin/GameUploadForm";
import GameList from "@/components/admin/GameList";

const AdminPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        // Get thumbnail URLs for each game
        const gamesWithThumbnailUrls = await Promise.all(data.map(async (game) => {
          let thumbnailUrl = null;
          if (game.thumbnail_path) {
            const { data: urlData } = await supabase.storage
              .from('game_thumbnails')
              .getPublicUrl(game.thumbnail_path);
            
            if (urlData) {
              thumbnailUrl = urlData.publicUrl;
            }
          }
          return { ...game, thumbnailUrl };
        }));
        
        setGames(gamesWithThumbnailUrls as Game[]);
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

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="upload">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload New Game</TabsTrigger>
            <TabsTrigger value="manage">Manage Games ({games.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <GameUploadForm onSuccess={fetchGames} />
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Games</CardTitle>
                <CardDescription>Edit, delete or view details of your games</CardDescription>
              </CardHeader>
              <CardContent>
                <GameList 
                  games={games} 
                  isLoading={isLoading} 
                  onUpdate={fetchGames} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
