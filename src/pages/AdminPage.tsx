
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import { GameFormData } from "@/types/game";

const AdminPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<GameFormData>({
    title: "",
    description: "",
    trial_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to upload games.",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "File required",
        description: "Please select a game file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title) {
      toast({
        title: "Title required",
        description: "Please enter a title for the game.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload the file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('game_files')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Storage error: ${uploadError.message}`);
      }

      // 2. Insert the game data into the database
      const { error: dbError } = await supabase
        .from('games')
        .insert({
          title: formData.title,
          description: formData.description || null,
          file_path: filePath,
          trial_url: formData.trial_url || null,
        });

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      toast({
        title: "Game uploaded successfully",
        description: `${formData.title} has been added to the game library.`,
      });
      
      // Reset the form
      setFormData({
        title: "",
        description: "",
        trial_url: "",
      });
      setFile(null);
      
      // Redirect to the game list page
      navigate("/");
    } catch (error: any) {
      console.error("Error uploading game:", error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Upload a New Game</CardTitle>
            <CardDescription>
              Add a new game to the library. All fields with * are required.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Game title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Game description"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">
                  Game File (.zip, .exe, etc.) *
                </label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".zip,.exe,.rar,.7z,.tar.gz"
                  required
                />
                {file && (
                  <p className="text-xs text-green-500">
                    Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="trial_url" className="text-sm font-medium">
                  Trial URL (optional)
                </label>
                <Input
                  id="trial_url"
                  name="trial_url"
                  value={formData.trial_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/game-trial"
                  type="url"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload Game"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
