
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = () => {
  const { user, isAdmin, signOut } = useAuth();
  
  if (!user) {
    return null;
  }

  // Extract first letter from email for avatar
  const avatarLetter = user.email ? user.email[0].toUpperCase() : "U";

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <div className="font-medium">{user.email}</div>
        {isAdmin && <div className="text-xs text-muted-foreground">Admin</div>}
      </div>
      <Avatar>
        <AvatarFallback>{avatarLetter}</AvatarFallback>
      </Avatar>
      <Button variant="outline" size="sm" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
