
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Game } from "@/types/game";

interface TrialPageHeaderProps {
  game: Game;
  isDownloading: boolean;
  handleDownload: () => Promise<void>;
  user: any | null;
}

const TrialPageHeader = ({ game, isDownloading, handleDownload, user }: TrialPageHeaderProps) => {
  const navigate = useNavigate();
  const gameId = game.id;

  return (
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
  );
};

export default TrialPageHeader;
