
import { useState } from "react";
import { User, Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface LabHeaderProps {
  userName?: string;
}

export function LabHeader({ userName = "Lab Admin" }: LabHeaderProps) {
  const [isSearching, setIsSearching] = useState(false);
  
  return (
    <header className="border-b w-full bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-primary text-2xl font-bold hidden md:inline">MediView</span>
          <span className="text-primary text-2xl font-bold md:hidden">MV</span>
        </div>
        
        <div className={`ml-auto flex items-center gap-4 transition-all ${isSearching ? 'w-full md:w-1/2 justify-between' : ''}`}>
          {isSearching ? (
            <div className="w-full relative flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search for patients, bookings, tests..." 
                className="w-full pl-9 bg-muted"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsSearching(false)} 
                className="absolute right-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full" 
                onClick={() => setIsSearching(true)}
              >
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Search</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="flex flex-col gap-2 p-2">
                    <p className="text-sm text-muted-foreground">No new notifications</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={userName} />
                      <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default LabHeader;
