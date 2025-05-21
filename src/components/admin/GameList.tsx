
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Game } from "@/types/game";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  isLoading: boolean;
  onUpdate: () => void;
}

const GameList = ({ games, isLoading, onUpdate }: GameListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  
  if (games.length === 0) {
    return (
      <div className="text-center py-6">
        <p>No games available. Add a new game using the upload tab.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onUpdate={onUpdate} 
        />
      ))}
    </div>
  );
};

export default GameList;
