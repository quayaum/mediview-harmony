
import { DataTable } from "@/components/ui/data-table";
import { 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin,
  User,
  FileText,
  History,
  Printer,
  FileEdit,
  Trash2,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

// Define the patient type
interface Patient {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  contactNumber: string;
  email: string;
  address: string;
  lastVisitDate: Date; // Added for grouping patients by last visit date
  testHistory: TestRecord[];
}

interface TestRecord {
  id: string;
  date: Date;
  testNames: string[];
  bookingId: string;
  status: 'completed' | 'in-progress' | 'booked';
}

// Sample data with last visit dates added for grouping
const patients: Patient[] = [
  {
    id: "PT001",
    name: "John Smith",
    gender: "male",
    age: 45,
    contactNumber: "+91 98765 43210",
    email: "john.smith@example.com",
    address: "123 Main St, Bangalore",
    lastVisitDate: new Date(2023, 7, 10), // August 10, 2023
    testHistory: [
      {
        id: "TH001",
        date: new Date(2023, 7, 10),
        testNames: ["Blood Test", "Urinalysis"],
        bookingId: "BK001",
        status: "completed"
      },
      {
        id: "TH002",
        date: new Date(2023, 6, 15),
        testNames: ["Cholesterol"],
        bookingId: "BK010",
        status: "completed"
      }
    ]
  },
  {
    id: "PT002",
    name: "Jane Doe",
    gender: "female",
    age: 32,
    contactNumber: "+91 87654 32109",
    email: "jane.doe@example.com",
    address: "456 Park Ave, Mumbai",
    lastVisitDate: new Date(2023, 7, 10), // August 10, 2023
    testHistory: [
      {
        id: "TH003",
        date: new Date(2023, 7, 10),
        testNames: ["X-Ray", "Blood Sugar"],
        bookingId: "BK002",
        status: "in-progress"
      }
    ]
  },
  {
    id: "PT003",
    name: "Robert Johnson",
    gender: "male",
    age: 56,
    contactNumber: "+91 76543 21098",
    email: "robert.johnson@example.com",
    address: "789 Elm St, Delhi",
    lastVisitDate: new Date(2023, 7, 11), // August 11, 2023
    testHistory: [
      {
        id: "TH004",
        date: new Date(2023, 7, 11),
        testNames: ["Liver Function", "Thyroid Panel"],
        bookingId: "BK003",
        status: "booked"
      }
    ]
  },
  {
    id: "PT004",
    name: "Sarah Williams",
    gender: "female",
    age: 28,
    contactNumber: "+91 65432 10987",
    email: "sarah.williams@example.com",
    address: "101 Oak Rd, Chennai",
    lastVisitDate: new Date(2023, 7, 11), // August 11, 2023
    testHistory: [
      {
        id: "TH005",
        date: new Date(2023, 7, 11),
        testNames: ["Complete Blood Count", "Vitamin D"],
        bookingId: "BK004",
        status: "completed"
      },
      {
        id: "TH006",
        date: new Date(2023, 5, 20),
        testNames: ["Thyroid Panel"],
        bookingId: "BK011",
        status: "completed"
      }
    ]
  },
  {
    id: "PT005",
    name: "Michael Brown",
    gender: "male",
    age: 39,
    contactNumber: "+91 54321 09876",
    email: "michael.brown@example.com",
    address: "202 Pine Ln, Hyderabad",
    lastVisitDate: new Date(2023, 7, 12), // August 12, 2023
    testHistory: [
      {
        id: "TH007",
        date: new Date(2023, 7, 12),
        testNames: ["COVID-19 Antibody", "Cholesterol"],
        bookingId: "BK005",
        status: "in-progress"
      }
    ]
  }
];

export function PatientWiseTable() {
  // Function to render contact information
  const renderContactInfo = (patient: Patient) => {
    return (
      <div className="flex flex-col gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="truncate max-w-[120px]">{patient.contactNumber}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{patient.contactNumber}</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="truncate max-w-[120px]">{patient.email}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{patient.email}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  };
  
  // Function to render address
  const renderAddress = (patient: Patient) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="truncate max-w-[150px]">{patient.address}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{patient.address}</p>
        </TooltipContent>
      </Tooltip>
    );
  };
  
  // Function to render test history
  const renderTestHistory = (patient: Patient) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium">
          {patient.testHistory.length} {patient.testHistory.length === 1 ? 'Test' : 'Tests'}
        </div>
        
        <div className="flex flex-col gap-1">
          {patient.testHistory.slice(0, 2).map((record, index) => (
            <div key={index} className="flex items-center gap-1 text-xs">
              <div className={`w-2 h-2 rounded-full bg-status-${record.status === 'in-progress' ? 'inprogress' : record.status}`} />
              <div className="flex items-center gap-1">
                <span className="font-medium">{record.bookingId}</span>
                <span className="text-muted-foreground truncate max-w-[100px]">
                  {record.testNames.join(', ')}
                </span>
              </div>
            </div>
          ))}
          
          {patient.testHistory.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{patient.testHistory.length - 2} more tests...
            </div>
          )}
        </div>
      </div>
    );
  };

  const columns = [
    {
      id: "id",
      header: "Patient ID",
      cell: (patient: Patient) => <div className="font-medium">{patient.id}</div>,
    },
    {
      id: "name",
      header: "Patient Details",
      cell: (patient: Patient) => (
        <div className="flex flex-col">
          <div className="font-medium">{patient.name}</div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{patient.gender === 'male' ? 'M' : patient.gender === 'female' ? 'F' : 'O'}</span>
            <span>{patient.age} years</span>
          </div>
        </div>
      ),
    },
    {
      id: "contactInfo",
      header: "Contact Information",
      cell: renderContactInfo,
    },
    {
      id: "address",
      header: "Address",
      cell: renderAddress,
    },
    {
      id: "testHistory",
      header: "Test History",
      cell: renderTestHistory,
    },
    {
      id: "latestBooking",
      header: "Latest Booking",
      cell: (patient: Patient) => {
        // Sort by date descending to get the latest booking
        const sortedTests = [...patient.testHistory].sort((a, b) => 
          b.date.getTime() - a.date.getTime()
        );
        
        if (sortedTests.length === 0) return <span>No bookings</span>;
        
        const latest = sortedTests[0];
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{latest.bookingId}</span>
              <div className={`status-chip bg-status-${latest.status === 'in-progress' ? 'inprogress' : latest.status}`}>
                <span className="capitalize">
                  {latest.status === 'in-progress' ? 'In Progress' : latest.status}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {latest.date.toLocaleDateString()}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: (patient: Patient) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem asChild>
                <Link to={`/patients/${patient.id}`}>
                  <User className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/patients/${patient.id}/edit`}>
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Patient
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/patients/${patient.id}/test-history`}>
                  <History className="mr-2 h-4 w-4" />
                  Test History
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                New Booking
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/patients/${patient.id}/print-reports`}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Reports
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Patient
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
      data={patients}
      groupKey="lastVisitDate"
      groupHeaderRenderer={(date) => (
        <div className="font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Last Visit:</span>
          {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          <span className="text-xs text-muted-foreground ml-1">
            (Patients who last visited on this date)
          </span>
        </div>
      )}
      searchPlaceholder="Search patients..."
      emptyStateMessage="No patients available"
      noFilteredDataMessage="No patients match your search"
    />
  );
}
