
import { Download } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "@/types/game";

interface GameInfoCardProps {
  game: Game;
}

const GameInfoCard = ({ game }: GameInfoCardProps) => {
  return (
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
  );
};

export default GameInfoCard;
