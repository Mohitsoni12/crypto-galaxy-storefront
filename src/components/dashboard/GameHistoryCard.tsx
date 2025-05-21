
import { Link } from "react-router-dom";
import { Play, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameHistory } from "@/types/game";

interface GameHistoryCardProps {
  game: GameHistory;
}

const GameHistoryCard = ({ game }: GameHistoryCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col transition-all hover:shadow-md">
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
  );
};

export default GameHistoryCard;
