
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GamesList from "@/components/dashboard/GamesList";
import DashboardLoading from "@/components/dashboard/DashboardLoading";
import { GameHistory } from "@/types/game";

const UserDashboard = () => {
  const [recentGames, setRecentGames] = useState<GameHistory[]>([]);
  const [downloadedGames, setDownloadedGames] = useState<GameHistory[]>([]);
  const [triedGames, setTriedGames] = useState<GameHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchUserGameHistory();
  }, [user, navigate]);

  const fetchUserGameHistory = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const { data: historyData, error: historyError } = await supabase
        .from('user_game_history')
        .select(`
          *,
          game:games(*)
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
        
      if (historyError) {
        throw historyError;
      }

      if (historyData) {
        // Process and enrich the game history data
        const processedGames = await Promise.all(historyData.map(async (item: any) => {
          const game = item.game;
          let thumbnailUrl = null;
          
          if (game.thumbnail_path) {
            const { data: urlData } = await supabase.storage
              .from('game_thumbnails')
              .getPublicUrl(game.thumbnail_path);
              
            if (urlData) {
              thumbnailUrl = urlData.publicUrl;
            }
          }
          
          return {
            id: game.id,
            title: game.title,
            description: game.description,
            file_path: game.file_path,
            trial_url: game.trial_url,
            thumbnailUrl,
            downloaded_at: item.downloaded_at,
            played_trial_at: item.played_trial_at,
            last_action: item.last_action,
          } as GameHistory;
        }));
        
        // Set all recent games
        setRecentGames(processedGames);
        
        // Filter for downloaded games
        setDownloadedGames(
          processedGames.filter(game => game.downloaded_at)
        );
        
        // Filter for tried games
        setTriedGames(
          processedGames.filter(game => game.played_trial_at)
        );
      }
    } catch (error: any) {
      console.error("Error fetching user game history:", error);
      toast({
        title: "Error",
        description: "Failed to load your game history. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <DashboardHeader 
          title="My Dashboard" 
          buttonText="Browse Games" 
          buttonLink="/" 
        />

        {isLoading ? (
          <DashboardLoading message="Loading your game history..." />
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Games ({recentGames.length})</TabsTrigger>
              <TabsTrigger value="downloaded">Downloaded ({downloadedGames.length})</TabsTrigger>
              <TabsTrigger value="trials">Played Trials ({triedGames.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <GamesList 
                games={recentGames} 
                emptyMessage="You haven't played or downloaded any games yet." 
              />
            </TabsContent>
            
            <TabsContent value="downloaded" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Downloaded Games</h2>
              <GamesList 
                games={downloadedGames} 
                emptyMessage="You haven't downloaded any games yet." 
              />
            </TabsContent>
            
            <TabsContent value="trials" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Played Trials</h2>
              <GamesList 
                games={triedGames} 
                emptyMessage="You haven't tried any game trials yet." 
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
