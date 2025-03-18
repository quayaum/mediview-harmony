
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          MediView Harmony
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your complete solution for managing pathology lab bookings, patients, and tests
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="font-semibold">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
