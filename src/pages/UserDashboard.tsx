
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Download, Play } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";

interface GameHistory {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  file_path: string | null;
  trial_url: string | null;
  downloaded_at: string | null;
  played_trial_at: string | null;
  last_action: 'download' | 'play_trial';
}

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
      
      // Query user game history
      const { data: historyData, error: historyError } = await supabase
        .from('user_game_history')
        .select(`
          *,
          game:game_id (
            id,
            title,
            description,
            file_path,
            trial_url,
            thumbnail_path
          )
        `)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
        
      if (historyError) {
        throw historyError;
      }

      if (historyData) {
        // Process and enrich the game history data
        const processedGames = await Promise.all(historyData.map(async (item) => {
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

  const renderGameList = (games: GameHistory[], emptyMessage: string) => {
    if (games.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden flex flex-col transition-all hover:shadow-md">
            <div className="h-36 bg-muted relative overflow-hidden">
              {game.thumbnailUrl ? (
                <img 
                  src={game.thumbnailUrl} 
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20">
                  <span className="text-lg font-semibold">{game.title}</span>
                </div>
              )}
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{game.title}</CardTitle>
              <CardDescription>
                {game.last_action === 'download' ? 'Downloaded' : 'Tried'}{' '}
                {game.last_action === 'download' 
                  ? new Date(game.downloaded_at!).toLocaleDateString()
                  : new Date(game.played_trial_at!).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0 pb-4 flex gap-2 mt-auto">
              {game.trial_url && (
                <Link to={`/trial/${game.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    <Play className="h-3.5 w-3.5 mr-1" /> 
                    Play Trial
                  </Button>
                </Link>
              )}
              {game.file_path && (
                <Link to={`/`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3.5 w-3.5 mr-1" /> 
                    Download
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <Link to="/">
            <Button variant="outline">Browse Games</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-lg">Loading your game history...</p>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Games ({recentGames.length})</TabsTrigger>
              <TabsTrigger value="downloaded">Downloaded ({downloadedGames.length})</TabsTrigger>
              <TabsTrigger value="trials">Played Trials ({triedGames.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {renderGameList(recentGames, "You haven't played or downloaded any games yet.")}
            </TabsContent>
            
            <TabsContent value="downloaded" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Downloaded Games</h2>
              {renderGameList(downloadedGames, "You haven't downloaded any games yet.")}
            </TabsContent>
            
            <TabsContent value="trials" className="pt-4">
              <h2 className="text-xl font-semibold mb-4">Played Trials</h2>
              {renderGameList(triedGames, "You haven't tried any game trials yet.")}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </MainLayout>
  );
};

export default UserDashboard;
