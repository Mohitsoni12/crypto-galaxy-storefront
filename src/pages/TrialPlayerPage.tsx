
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import TrialPageHeader from "@/components/trial/TrialPageHeader";
import GameInfoCard from "@/components/trial/GameInfoCard";
import GameDescription from "@/components/trial/GameDescription";
import TrialFrame from "@/components/trial/TrialFrame";
import DashboardLoading from "@/components/dashboard/DashboardLoading";

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
          await supabase
            .from('user_game_history')
            .upsert({ 
              user_id: user.id, 
              game_id: gameId,
              played_trial_at: new Date().toISOString(),
              last_action: 'play_trial'
            }, {
              onConflict: 'user_id,game_id'
            });
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
      await supabase
        .from('user_game_history')
        .upsert({ 
          user_id: user.id, 
          game_id: game.id,
          downloaded_at: new Date().toISOString(),
          last_action: 'download'
        }, {
          onConflict: 'user_id,game_id'
        });

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
        <DashboardLoading message="Loading trial..." />
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
        <TrialPageHeader 
          game={game}
          isDownloading={isDownloading}
          handleDownload={handleDownload}
          user={user}
        />

        <GameInfoCard game={game} />
        
        <TrialFrame title={game.title} trialUrl={game.trial_url} />
        
        <GameDescription description={game.description} />
      </div>
    </MainLayout>
  );
};

export default TrialPlayerPage;
