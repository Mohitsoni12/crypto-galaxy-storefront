
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2, Edit, Trash, FileText, EyeOff, Eye, Download } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Game, GameFormData } from "@/types/game";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [gameData, setGameData] = useState<GameFormData>({
    title: "",
    description: "",
    trial_url: "",
  });
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        // Get thumbnail URLs for each game
        const gamesWithThumbnailUrls = await Promise.all(data.map(async (game) => {
          let thumbnailUrl = null;
          if (game.thumbnail_path) {
            const { data: urlData } = await supabase.storage
              .from('game_thumbnails')
              .getPublicUrl(game.thumbnail_path);
            
            if (urlData) {
              thumbnailUrl = urlData.publicUrl;
            }
          }
          return { ...game, thumbnailUrl };
        }));
        
        setGames(gamesWithThumbnailUrls as Game[]);
      }
    } catch (error: any) {
      console.error("Error fetching games:", error);
      toast({
        title: "Error",
        description: "Failed to load games. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGameData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedGame) {
      setSelectedGame({ ...selectedGame, [name]: value });
    }
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

  const resetForm = () => {
    setGameData({
      title: "",
      description: "",
      trial_url: "",
    });
    setFile(null);
    setThumbnail(null);
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

      // Upload thumbnail to Supabase Storage (if provided)
      let thumbnailPath = null;
      if (thumbnail) {
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
          thumbnail_path: thumbnailPath,
        });

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Success!",
        description: "Game has been uploaded successfully.",
      });

      // Reset form and fetch updated games list
      resetForm();
      fetchGames();

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

  const handleUpdateGame = async () => {
    if (!selectedGame) return;
    
    try {
      setIsUploading(true);

      // Upload thumbnail to Supabase Storage (if provided)
      let thumbnailPath = selectedGame.thumbnail_path;
      if (thumbnail) {
        // Delete existing thumbnail if there is one
        if (selectedGame.thumbnail_path) {
          await supabase.storage
            .from('game_thumbnails')
            .remove([selectedGame.thumbnail_path]);
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
      let filePath = selectedGame.file_path;
      if (file) {
        // Delete existing file if there is one
        if (selectedGame.file_path) {
          await supabase.storage
            .from('game_files')
            .remove([selectedGame.file_path]);
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
          title: selectedGame.title,
          description: selectedGame.description,
          file_path: filePath,
          trial_url: selectedGame.trial_url,
          thumbnail_path: thumbnailPath,
        })
        .eq('id', selectedGame.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: "Success!",
        description: "Game has been updated successfully.",
      });

      setSelectedGame(null);
      setFile(null);
      setThumbnail(null);
      fetchGames();

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

  const handleDeleteGame = async (gameId: string) => {
    try {
      // Find the game to get its file_path and thumbnail_path
      const gameToDelete = games.find(g => g.id === gameId);
      
      // Delete thumbnail from storage if it exists
      if (gameToDelete?.thumbnail_path) {
        await supabase.storage
          .from('game_thumbnails')
          .remove([gameToDelete.thumbnail_path]);
      }
      
      // Delete file from storage if it exists
      if (gameToDelete?.file_path) {
        await supabase.storage
          .from('game_files')
          .remove([gameToDelete.file_path]);
      }
      
      // Delete game from database
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId);

      if (error) {
        throw error;
      }

      toast({
        title: "Game deleted",
        description: "The game has been removed successfully.",
      });
      
      fetchGames();
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
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs defaultValue="upload">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload New Game</TabsTrigger>
            <TabsTrigger value="manage">Manage Games ({games.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Game</CardTitle>
                <CardDescription>Add a new game to your library</CardDescription>
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

                  <div className="grid md:grid-cols-2 gap-4">
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
                      <Label htmlFor="thumbnail">Game Thumbnail</Label>
                      <Input
                        id="thumbnail"
                        type="file"
                        onChange={handleThumbnailChange}
                        accept="image/*"
                      />
                      <p className="text-sm text-muted-foreground">
                        Upload game thumbnail (JPG, PNG)
                      </p>
                    </div>
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
          </TabsContent>
          
          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Games</CardTitle>
                <CardDescription>Edit, delete or view details of your games</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : games.length === 0 ? (
                  <div className="text-center py-6">
                    <p>No games available. Add a new game using the upload tab.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {games.map((game) => (
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
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedGame(game)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit Game</DialogTitle>
                                    <DialogDescription>
                                      Make changes to the game details.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {selectedGame && (
                                    <div className="space-y-6 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-title">Game Title</Label>
                                        <Input
                                          id="edit-title"
                                          name="title"
                                          value={selectedGame.title}
                                          onChange={handleEditInputChange}
                                          required
                                        />
                                      </div>

                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-description">Game Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          name="description"
                                          value={selectedGame.description || ''}
                                          onChange={handleEditInputChange}
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
                                            {selectedGame.file_path ? 'A file is already uploaded. Uploading a new file will replace it.' : 'No file currently uploaded.'}
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
                                            {selectedGame.thumbnail_path ? 'A thumbnail is already uploaded. Uploading a new one will replace it.' : 'No thumbnail currently uploaded.'}
                                          </p>
                                          
                                          {selectedGame.thumbnailUrl && (
                                            <div className="mt-2">
                                              <p className="text-xs mb-1">Current thumbnail:</p>
                                              <img 
                                                src={selectedGame.thumbnailUrl} 
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
                                          value={selectedGame.trial_url || ''}
                                          onChange={handleEditInputChange}
                                          placeholder="https://example.com/game-trial"
                                        />
                                      </div>
                                    </div>
                                  )}
                                  
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedGame(null)}>Cancel</Button>
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
                                      onClick={() => handleDeleteGame(game.id)}
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
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
