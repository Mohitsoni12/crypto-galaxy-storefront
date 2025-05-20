
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const TrialPlayerPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

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

        setGame(data);
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
  }, [gameId, navigate, toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
          </div>
          <h1 className="text-2xl font-bold">{game.title} - Trial</h1>
          <div></div> {/* Empty div for flex spacing */}
        </div>

        <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ height: "80vh" }}>
          <iframe
            src={game.trial_url}
            title={`${game.title} Trial`}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default TrialPlayerPage;
