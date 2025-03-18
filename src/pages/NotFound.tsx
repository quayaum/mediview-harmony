
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-5 max-w-md px-6">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <MapPin className="h-10 w-10 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
              404
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">
          We couldn't find the page you were looking for. Please check the URL or return to the dashboard.
        </p>
        
        <Button asChild className="mt-6">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
