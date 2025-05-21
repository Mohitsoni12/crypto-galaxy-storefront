
import { Card, CardContent } from "@/components/ui/card";

interface GameDescriptionProps {
  description: string | null;
}

const GameDescription = ({ description }: GameDescriptionProps) => {
  if (!description) return null;
  
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-3">About This Game</h2>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default GameDescription;
