
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { 
  MoreHorizontal, 
  Clock, 
  Check, 
  AlertCircle,
  FileEdit,
  Printer,
  FileText,
  Trash2,
  CreditCard,
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

interface Booking {
  id: string;
  date: Date;
  patientName: string;
  testNames: string[];
  totalAmount: number;
  payableAmount: number;
  discount: number;
  payments: Payment[];
  status: 'booked' | 'in-progress' | 'completed';
}

interface Payment {
  id: string;
  amount: number;
  method: 'cash' | 'upi' | 'card' | 'other';
  date: Date;
}

const bookings: Booking[] = [
  {
    id: "BK001",
    date: new Date(2023, 7, 10),
    patientName: "John Smith",
    testNames: ["Blood Test", "Urinalysis"],
    totalAmount: 2500,
    payableAmount: 2000,
    discount: 500,
    payments: [
      { id: "P1", amount: 1000, method: "cash", date: new Date(2023, 7, 10) },
      { id: "P2", amount: 1000, method: "upi", date: new Date(2023, 7, 12) }
    ],
    status: "completed"
  },
  {
    id: "BK002",
    date: new Date(2023, 7, 10),
    patientName: "Jane Doe",
    testNames: ["X-Ray", "Blood Sugar"],
    totalAmount: 3000,
    payableAmount: 3000,
    discount: 0,
    payments: [
      { id: "P3", amount: 1500, method: "card", date: new Date(2023, 7, 10) }
    ],
    status: "in-progress"
  },
  {
    id: "BK003",
    date: new Date(2023, 7, 11),
    patientName: "Robert Johnson",
    testNames: ["Liver Function", "Thyroid Panel"],
    totalAmount: 4500,
    payableAmount: 4000,
    discount: 500,
    payments: [],
    status: "booked"
  },
  {
    id: "BK004",
    date: new Date(2023, 7, 11),
    patientName: "Sarah Williams",
    testNames: ["Complete Blood Count", "Vitamin D"],
    totalAmount: 1800,
    payableAmount: 1800,
    discount: 0,
    payments: [
      { id: "P4", amount: 1800, method: "cash", date: new Date(2023, 7, 11) }
    ],
    status: "completed"
  },
  {
    id: "BK005",
    date: new Date(2023, 7, 12),
    patientName: "Michael Brown",
    testNames: ["COVID-19 Antibody", "Cholesterol"],
    totalAmount: 3500,
    payableAmount: 3150,
    discount: 350,
    payments: [
      { id: "P5", amount: 1500, method: "upi", date: new Date(2023, 7, 12) }
    ],
    status: "in-progress"
  }
];

export function BookingWiseTable() {
  const renderPaymentStatus = (booking: Booking) => {
    const totalPaid = booking.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const paymentStatus = totalPaid === 0 ? 'unpaid' : totalPaid < booking.payableAmount ? 'partial' : 'paid';
    
    return (
      <div className={`status-chip bg-status-${paymentStatus}`}>
        {paymentStatus === 'unpaid' && <AlertCircle className="h-3.5 w-3.5" />}
        {paymentStatus === 'partial' && <Clock className="h-3.5 w-3.5" />}
        {paymentStatus === 'paid' && <Check className="h-3.5 w-3.5" />}
        <span className="capitalize">{paymentStatus}</span>
      </div>
    );
  };
  
  const renderBookingStatus = (status: Booking['status']) => {
    return (
      <div className={`status-chip bg-status-${status === 'in-progress' ? 'inprogress' : status}`}>
        {status === 'booked' && <Clock className="h-3.5 w-3.5" />}
        {status === 'in-progress' && <AlertCircle className="h-3.5 w-3.5" />}
        {status === 'completed' && <Check className="h-3.5 w-3.5" />}
        <span className="capitalize">{status === 'in-progress' ? 'In Progress' : status}</span>
      </div>
    );
  };
  
  const renderPaymentDetails = (booking: Booking) => {
    const { payments, payableAmount } = booking;
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remaining = payableAmount - totalPaid;
    
    const paymentsByMethod = payments.reduce((acc, payment) => {
      acc[payment.method] = (acc[payment.method] || 0) + payment.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">₹{totalPaid}</div>
          <div className="text-xs text-muted-foreground">of ₹{payableAmount}</div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(paymentsByMethod).map(([method, amount], index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div className="payment-chip bg-muted text-foreground">
                  <span className="capitalize">{method}</span>: ₹{amount}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paid ₹{amount} via {method}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          
          {remaining > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="payment-chip bg-red-100 text-red-600">
                  Due: ₹{remaining}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remaining amount: ₹{remaining}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  const columns = [
    {
      id: "id",
      header: "Booking ID",
      cell: (booking: Booking) => <div className="font-medium">{booking.id}</div>,
    },
    {
      id: "patientName",
      header: "Patient Name",
      cell: (booking: Booking) => booking.patientName,
    },
    {
      id: "testNames",
      header: "Tests",
      cell: (booking: Booking) => (
        <div className="flex flex-wrap gap-1">
          {booking.testNames.map((test, index) => (
            <Badge key={index} variant="outline" className="max-w-[150px] truncate">
              {test}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: "billing",
      header: "Billing Details",
      cell: (booking: Booking) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">₹{booking.payableAmount}</span>
            {booking.discount > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs text-green-600 line-through">
                    -₹{booking.discount}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discount: ₹{booking.discount}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="text-xs text-muted-foreground">Total: ₹{booking.totalAmount}</div>
        </div>
      ),
    },
    {
      id: "paymentDetails",
      header: "Payment Details",
      cell: renderPaymentDetails,
    },
    {
      id: "paymentStatus",
      header: "Payment Status",
      cell: renderPaymentStatus,
    },
    {
      id: "bookingStatus",
      header: "Booking Status",
      cell: (booking: Booking) => renderBookingStatus(booking.status),
    },
    {
      id: "actions",
      header: "",
      cell: (booking: Booking) => (
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
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Booking
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Booking
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
      data={bookings}
      groupKey="date"
      groupHeaderRenderer={(date) => (
        <div className="font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Booking Date:</span>
          {format(new Date(date), "MMMM d, yyyy")}
          <span className="text-xs text-muted-foreground ml-1">
            (Bookings made on this date)
          </span>
        </div>
      )}
      searchPlaceholder="Search bookings..."
      emptyStateMessage="No bookings available"
      noFilteredDataMessage="No bookings match your search"
    />
  );
}
