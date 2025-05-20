
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { GameFormData } from "@/types/game";

const AdminPage = () => {
  const [gameData, setGameData] = useState<GameFormData>({
    title: "",
    description: "",
    trial_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGameData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!gameData.title) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the game.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Upload file to Supabase Storage (if provided)
      let filePath = null;
      if (file) {
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

      // Save game data to database
      const { error: insertError } = await supabase
        .from('games')
        .insert({
          title: gameData.title,
          description: gameData.description || null,
          file_path: filePath,
          trial_url: gameData.trial_url || null,
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Success!",
        description: "Game has been uploaded successfully.",
      });

      // Reset form
      setGameData({
        title: "",
        description: "",
        trial_url: "",
      });
      setFile(null);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload game. Please try again.",
        variant: "destructive",
      });
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Game</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Game Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={gameData.title}
                  onChange={handleInputChange}
                  placeholder="Enter game title"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Game Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={gameData.description}
                  onChange={handleInputChange}
                  placeholder="Enter game description"
                  rows={4}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file">Game File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".zip,.exe,.rar,.7z"
                />
                <p className="text-sm text-muted-foreground">
                  Upload game file (.zip, .exe, .rar, .7z)
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="trial_url">Trial URL (Optional)</Label>
                <Input
                  id="trial_url"
                  name="trial_url"
                  value={gameData.trial_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/game-trial"
                />
                <p className="text-sm text-muted-foreground">
                  URL to a playable web version of the game
                </p>
              </div>

              <Button type="submit" disabled={isUploading} className="w-full">
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Game
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
