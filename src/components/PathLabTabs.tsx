
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingWiseTable } from "./tables/BookingWiseTable";
import { PatientWiseTable } from "./tables/PatientWiseTable";
import { TestWiseTable } from "./tables/TestWiseTable";
import { User, Book, TestTube } from "lucide-react";

export function PathLabTabs() {
  const [activeTab, setActiveTab] = useState("booking");
  
  return (
    <Tabs 
      defaultValue="booking" 
      className="w-full"
      onValueChange={setActiveTab}
    >
      <div className="border-b">
        <TabsList className="h-12 w-full rounded-none bg-transparent p-0 justify-start">
          <TabsTrigger
            value="booking"
            className={`relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none ${activeTab === "booking" ? "data-[state=active]:border-b-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Booking-wise</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="patient"
            className={`relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none ${activeTab === "patient" ? "data-[state=active]:border-b-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Patient-wise</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="test"
            className={`relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none ${activeTab === "test" ? "data-[state=active]:border-b-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              <span>Test-wise</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent 
        value="booking" 
        className="mt-6 animate-slide-in"
      >
        <BookingWiseTable />
      </TabsContent>
      <TabsContent 
        value="patient" 
        className="mt-6 animate-slide-in"
      >
        <PatientWiseTable />
      </TabsContent>
      <TabsContent 
        value="test" 
        className="mt-6 animate-slide-in"
      >
        <TestWiseTable />
      </TabsContent>
    </Tabs>
  );
}

export default PathLabTabs;
