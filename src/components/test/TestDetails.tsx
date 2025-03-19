
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TestTube, BarChart2, FileEdit } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TestDetails {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  normalRange?: string;
  preparationRequired?: string;
  bookingCount: number;
  completedCount: number;
  pendingCount: number;
  inProgressCount: number;
  totalRevenue: number;
}

interface TestDetailsProps {
  test?: TestDetails;
  onClose?: () => void;
}

export function TestDetails({ test, onClose }: TestDetailsProps) {
  const navigate = useNavigate();
  
  // Sample data if no test provided
  const testData: TestDetails = test || {
    id: "T001",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    price: 500,
    description: "A blood test that evaluates the cells that circulate in blood. It measures the levels of red blood cells, white blood cells, platelets, hemoglobin, and hematocrit.",
    normalRange: "WBC: 4.5-11.0 x10^9/L\nRBC: 4.5-5.9 x10^12/L\nHemoglobin: 14-18 g/dL\nHematocrit: 42-52%\nPlatelets: 150-450 x10^9/L",
    preparationRequired: "No special preparation required. Fasting is not necessary.",
    bookingCount: 45,
    completedCount: 38,
    pendingCount: 2,
    inProgressCount: 5,
    totalRevenue: 22500
  };
  
  const completionPercent = Math.round((testData.completedCount / testData.bookingCount) * 100);
  const averageRevenuePerBooking = Math.round(testData.totalRevenue / testData.bookingCount);
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{testData.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-primary" />
                <span>{testData.category}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs font-medium">₹{testData.price}</span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Test
              </Button>
              <Button size="sm">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Test Description</h3>
                <div className="p-3 bg-muted/30 rounded-md">
                  <p className="text-sm">{testData.description}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Normal Range</h3>
                <div className="p-3 bg-muted/30 rounded-md">
                  {testData.normalRange ? (
                    <pre className="text-sm font-sans whitespace-pre-line">{testData.normalRange}</pre>
                  ) : (
                    <p className="text-sm text-muted-foreground">No normal range data available.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Patient Preparation</h3>
                <div className="p-3 bg-muted/30 rounded-md">
                  {testData.preparationRequired ? (
                    <p className="text-sm">{testData.preparationRequired}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">No special preparation required.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Test Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Test ID</span>
                    <span className="font-medium">{testData.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Total Bookings</span>
                    <span className="font-medium">{testData.bookingCount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Total Revenue</span>
                    <span className="font-medium">₹{testData.totalRevenue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Avg. Revenue per Booking</span>
                    <span className="font-medium">₹{averageRevenuePerBooking.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Test Progress</h3>
                <div className="p-3 bg-muted/30 rounded-md space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">{completionPercent}%</span>
                  </div>
                  
                  <Progress value={completionPercent} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 rounded-full bg-status-completed" />
                        <span>Completed</span>
                      </div>
                      <span className="font-medium">{testData.completedCount}</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 rounded-full bg-status-inprogress" />
                        <span>In Progress</span>
                      </div>
                      <span className="font-medium">{testData.inProgressCount}</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 rounded-full bg-status-booked" />
                        <span>Pending</span>
                      </div>
                      <span className="font-medium">{testData.pendingCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-between">
          <Button variant="outline">
            View Test Reports
          </Button>
          <Button variant="outline">
            View Bookings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TestDetails;
