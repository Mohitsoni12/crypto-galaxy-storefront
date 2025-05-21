
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Dialog } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Game } from "@/types/game";

interface GameEditDialogProps {
  game: Game;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

const GameEditDialog = ({ game, isOpen, onOpenChange, onUpdate }: GameEditDialogProps) => {
  const [editedGame, setEditedGame] = useState<Game>(game);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedGame({ ...editedGame, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleUpdateGame = async () => {
    try {
      setIsUploading(true);

      // Upload thumbnail to Supabase Storage (if provided)
      let thumbnailPath = editedGame.thumbnail_path;
      if (thumbnail) {
        // Delete existing thumbnail if there is one
        if (editedGame.thumbnail_path) {
          await supabase.storage
            .from('game_thumbnails')
            .remove([editedGame.thumbnail_path]);
        }

        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `thumbnail_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const fullPath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('game_thumbnails')
          .upload(fullPath, thumbnail);

        if (uploadError) {
          throw uploadError;
        }

        thumbnailPath = fullPath;
      }

      // Upload file to Supabase Storage (if provided)
      let filePath = editedGame.file_path;
      if (file) {
        // Delete existing file if there is one
        if (editedGame.file_path) {
          await supabase.storage
            .from('game_files')
            .remove([editedGame.file_path]);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const fullPath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('game_files')
          .upload(fullPath, file);

        if (uploadError) {
          throw uploadError;
        }

        filePath = fullPath;
      }

      // Update game data in database
      const { error: updateError } = await supabase
        .from('games')
        .update({
          title: editedGame.title,
          description: editedGame.description,
          file_path: filePath,
          trial_url: editedGame.trial_url,
          thumbnail_path: thumbnailPath,
        })
        .eq('id', editedGame.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success!",
        description: "Game has been updated successfully.",
      });

      onOpenChange(false);
      onUpdate();

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update game. Please try again.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
          <DialogDescription>
            Make changes to the game details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-title">Game Title</Label>
            <Input
              id="edit-title"
              name="title"
              value={editedGame.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-description">Game Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              value={editedGame.description || ''}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-file">Game File</Label>
              <Input
                id="edit-file"
                type="file"
                onChange={handleFileChange}
                accept=".zip,.exe,.rar,.7z"
              />
              <p className="text-xs text-muted-foreground">
                {editedGame.file_path ? 'A file is already uploaded. Uploading a new file will replace it.' : 'No file currently uploaded.'}
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-thumbnail">Game Thumbnail</Label>
              <Input
                id="edit-thumbnail"
                type="file"
                onChange={handleThumbnailChange}
                accept="image/*"
              />
              <p className="text-xs text-muted-foreground">
                {editedGame.thumbnail_path ? 'A thumbnail is already uploaded. Uploading a new one will replace it.' : 'No thumbnail currently uploaded.'}
              </p>
              
              {editedGame.thumbnailUrl && (
                <div className="mt-2">
                  <p className="text-xs mb-1">Current thumbnail:</p>
                  <img 
                    src={editedGame.thumbnailUrl} 
                    alt="Current thumbnail" 
                    className="h-20 w-auto object-contain rounded-md border border-border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="edit-trial-url">Trial URL</Label>
            <Input
              id="edit-trial-url"
              name="trial_url"
              value={editedGame.trial_url || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/game-trial"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpdateGame} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameEditDialog;
