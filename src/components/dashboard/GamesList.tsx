
import { GameHistory } from "@/types/game";
import GameHistoryCard from "./GameHistoryCard";

interface GamesListProps {
  games: GameHistory[];
  emptyMessage: string;
}

const GamesList = ({ games, emptyMessage }: GamesListProps) => {
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
        <GameHistoryCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
