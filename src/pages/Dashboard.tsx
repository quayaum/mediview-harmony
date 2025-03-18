
import { LabHeader } from "@/components/LabHeader";
import { PathLabTabs } from "@/components/PathLabTabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      <LabHeader />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Bookings & Tests</h1>
          <p className="text-muted-foreground">
            Manage all your path lab bookings, patients, and tests
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm border p-4">
          <PathLabTabs />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
