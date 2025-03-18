
import { DataTable } from "@/components/ui/data-table";
import { 
  MoreHorizontal, 
  TestTube,
  FileEdit,
  BarChart2,
  FileText,
  Trash2,
  Check,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Define the test type
interface Test {
  id: string;
  name: string;
  category: string;
  date: Date;
  price: number;
  bookingCount: number;
  completedCount: number;
  pendingCount: number;
  inProgressCount: number;
  totalRevenue: number;
}

// Sample data
const tests: Test[] = [
  {
    id: "T001",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    date: new Date(2023, 7, 10),
    price: 500,
    bookingCount: 45,
    completedCount: 38,
    pendingCount: 2,
    inProgressCount: 5,
    totalRevenue: 22500
  },
  {
    id: "T002",
    name: "Blood Sugar",
    category: "Biochemistry",
    date: new Date(2023, 7, 10),
    price: 300,
    bookingCount: 72,
    completedCount: 65,
    pendingCount: 3,
    inProgressCount: 4,
    totalRevenue: 21600
  },
  {
    id: "T003",
    name: "Thyroid Panel",
    category: "Endocrinology",
    date: new Date(2023, 7, 11),
    price: 1200,
    bookingCount: 25,
    completedCount: 18,
    pendingCount: 5,
    inProgressCount: 2,
    totalRevenue: 30000
  },
  {
    id: "T004",
    name: "Vitamin D",
    category: "Biochemistry",
    date: new Date(2023, 7, 11),
    price: 900,
    bookingCount: 30,
    completedCount: 22,
    pendingCount: 4,
    inProgressCount: 4,
    totalRevenue: 27000
  },
  {
    id: "T005",
    name: "Liver Function Test",
    category: "Hepatology",
    date: new Date(2023, 7, 12),
    price: 800,
    bookingCount: 35,
    completedCount: 28,
    pendingCount: 3,
    inProgressCount: 4,
    totalRevenue: 28000
  },
  {
    id: "T006",
    name: "COVID-19 Antibody",
    category: "Immunology",
    date: new Date(2023, 7, 12),
    price: 1500,
    bookingCount: 15,
    completedCount: 10,
    pendingCount: 2,
    inProgressCount: 3,
    totalRevenue: 22500
  }
];

export function TestWiseTable() {
  // Function to render test details
  const renderTestDetails = (test: Test) => {
    return (
      <div className="flex flex-col">
        <div className="font-medium">{test.name}</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TestTube className="h-3 w-3" />
          <span>{test.category}</span>
        </div>
      </div>
    );
  };
  
  // Function to render test progress
  const renderTestProgress = (test: Test) => {
    const completionPercent = Math.round((test.completedCount / test.bookingCount) * 100);
    
    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs">
          <span>Completion</span>
          <span className="font-medium">{completionPercent}%</span>
        </div>
        
        <Progress value={completionPercent} className="h-2" />
        
        <div className="flex items-center justify-between text-xs mt-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-status-completed" />
                <span>{test.completedCount}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{test.completedCount} completed tests</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-status-inprogress" />
                <span>{test.inProgressCount}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{test.inProgressCount} in-progress tests</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-status-booked" />
                <span>{test.pendingCount}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{test.pendingCount} pending tests</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  };
  
  // Function to render booking statistics
  const renderBookingStats = (test: Test) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{test.bookingCount}</span>
          <span className="text-xs text-muted-foreground">total bookings</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="status-chip bg-muted text-foreground">
            <span>₹{test.price}</span>
          </div>
          <span className="text-xs text-muted-foreground">per test</span>
        </div>
      </div>
    );
  };
  
  // Function to render revenue details
  const renderRevenue = (test: Test) => {
    return (
      <div className="flex flex-col">
        <div className="font-medium">₹{test.totalRevenue.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">
          Avg: ₹{Math.round(test.totalRevenue / test.bookingCount).toLocaleString()} per booking
        </div>
      </div>
    );
  };

  const columns = [
    {
      id: "id",
      header: "Test ID",
      cell: (test: Test) => <div className="font-medium">{test.id}</div>,
    },
    {
      id: "name",
      header: "Test Details",
      cell: renderTestDetails,
    },
    {
      id: "progress",
      header: "Progress",
      cell: renderTestProgress,
    },
    {
      id: "bookingStats",
      header: "Booking Stats",
      cell: renderBookingStats,
    },
    {
      id: "revenue",
      header: "Revenue",
      cell: renderRevenue,
    },
    {
      id: "actions",
      header: "",
      cell: (test: Test) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Test Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Test
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="mr-2 h-4 w-4" />
                View Analytics
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Test
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      className: "w-[50px]"
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tests}
      groupKey="date"
      groupHeaderRenderer={(date) => (
        <div className="font-medium">
          {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
      searchPlaceholder="Search tests..."
      emptyStateMessage="No tests available"
      noFilteredDataMessage="No tests match your search"
    />
  );
}
