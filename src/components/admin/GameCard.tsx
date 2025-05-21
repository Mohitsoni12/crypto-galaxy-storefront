
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Edit, EyeOff, Eye, FileText, Trash } from "lucide-react";
import { Game } from "@/types/game";
import GameEditDialog from "./GameEditDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface GameCardProps {
  game: Game;
  onUpdate: () => void;
}

const GameCard = ({ game, onUpdate }: GameCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDeleteGame = async () => {
    try {
      // Delete thumbnail from storage if it exists
      if (game.thumbnail_path) {
        await supabase.storage
          .from('game_thumbnails')
          .remove([game.thumbnail_path]);
      }
      
      // Delete file from storage if it exists
      if (game.file_path) {
        await supabase.storage
          .from('game_files')
          .remove([game.file_path]);
      }
      
      // Delete game from database
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', game.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Game deleted",
        description: "The game has been removed successfully.",
      });
      
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete the game. Please try again.",
        variant: "destructive",
      });
      console.error("Delete error:", error);
    }
  };

  return (
    <Card key={game.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            {/* Thumbnail preview */}
            {game.thumbnailUrl ? (
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={game.thumbnailUrl} 
                  alt={`${game.title} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{game.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {game.description || "No description available"}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" /> 
                  {game.download_count || 0} downloads
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" /> 
                  {game.file_path ? "File available" : "No file"}
                </div>
                <div className="flex items-center">
                  {game.trial_url ? (
                    <Eye className="h-4 w-4 mr-1" />
                  ) : (
                    <EyeOff className="h-4 w-4 mr-1" />
                  )}
                  {game.trial_url ? "Trial available" : "No trial"}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Game</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{game.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteGame}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
      
      <GameEditDialog 
        game={game}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUpdate={onUpdate}
      />
    </Card>
  );
};

export default GameCard;
