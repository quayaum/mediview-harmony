
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Check, AlertCircle, Calendar, CreditCard, Printer, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Payment {
  id: string;
  amount: number;
  method: 'cash' | 'upi' | 'card' | 'other';
  date: Date;
  reference?: string;
}

interface BookingDetails {
  id: string;
  date: Date;
  patientName: string;
  patientId: string;
  testNames: string[];
  totalAmount: number;
  payableAmount: number;
  discount: number;
  payments: Payment[];
  status: 'booked' | 'in-progress' | 'completed';
}

interface ViewBookingDetailsProps {
  booking?: BookingDetails;
  onClose?: () => void;
}

export function ViewBookingDetails({ booking, onClose }: ViewBookingDetailsProps) {
  const navigate = useNavigate();
  
  // Sample data if no booking provided
  const bookingData: BookingDetails = booking || {
    id: "BK001",
    date: new Date(2023, 7, 10),
    patientName: "John Smith",
    patientId: "PT001",
    testNames: ["Blood Test", "Urinalysis"],
    totalAmount: 2500,
    payableAmount: 2000,
    discount: 500,
    payments: [
      { id: "P1", amount: 1000, method: "cash", date: new Date(2023, 7, 10) },
      { id: "P2", amount: 1000, method: "upi", date: new Date(2023, 7, 12), reference: "UPI123456" }
    ],
    status: "completed"
  };
  
  const totalPaid = bookingData.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remainingAmount = bookingData.payableAmount - totalPaid;
  const paymentStatus = totalPaid === 0 ? 'unpaid' : totalPaid < bookingData.payableAmount ? 'partial' : 'paid';
  
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
              <CardTitle className="text-2xl">Booking Details</CardTitle>
              <CardDescription>
                View detailed information for booking <span className="font-medium">{bookingData.id}</span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {remainingAmount > 0 && (
                <Button variant="outline" size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment
                </Button>
              )}
              <Button size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print Invoice
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Booking Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-medium">{bookingData.id}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {bookingData.date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Status</span>
                    <div className={`status-chip bg-status-${bookingData.status === 'in-progress' ? 'inprogress' : bookingData.status}`}>
                      {bookingData.status === 'booked' && <Clock className="h-3.5 w-3.5" />}
                      {bookingData.status === 'in-progress' && <AlertCircle className="h-3.5 w-3.5" />}
                      {bookingData.status === 'completed' && <Check className="h-3.5 w-3.5" />}
                      <span className="capitalize">{bookingData.status === 'in-progress' ? 'In Progress' : bookingData.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Patient Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Patient Name</span>
                    <span className="font-medium">{bookingData.patientName}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Patient ID</span>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">{bookingData.patientId}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Patient Profile
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Tests</h3>
                <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-md min-h-[60px]">
                  {bookingData.testNames.map((test, index) => (
                    <Badge key={index} variant="outline">
                      {test}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-md font-medium mb-3">Billing Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">₹{bookingData.totalAmount}</span>
                  </div>
                  
                  {bookingData.discount > 0 && (
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="font-medium text-green-600">-₹{bookingData.discount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Payable Amount</span>
                    <span className="font-medium">₹{bookingData.payableAmount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">₹{totalPaid}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className={`font-medium ${remainingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{remainingAmount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
                    <span className="text-muted-foreground">Payment Status</span>
                    <div className={`status-chip bg-status-${paymentStatus}`}>
                      {paymentStatus === 'unpaid' && <AlertCircle className="h-3.5 w-3.5" />}
                      {paymentStatus === 'partial' && <Clock className="h-3.5 w-3.5" />}
                      {paymentStatus === 'paid' && <Check className="h-3.5 w-3.5" />}
                      <span className="capitalize">{paymentStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-3">Payment History</h3>
                {bookingData.payments.length === 0 ? (
                  <div className="p-3 bg-muted/30 rounded-md">
                    <p className="text-muted-foreground text-sm">No payments have been made yet.</p>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <div className="grid grid-cols-4 bg-muted/50 text-xs font-medium p-2">
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Method</div>
                      <div>Reference</div>
                    </div>
                    <div className="divide-y">
                      {bookingData.payments.map((payment, index) => (
                        <div key={index} className="grid grid-cols-4 p-2 text-sm">
                          <div>{payment.date.toLocaleDateString()}</div>
                          <div className="font-medium">₹{payment.amount}</div>
                          <div className="capitalize">{payment.method}</div>
                          <div>{payment.reference || '-'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-between">
          <Button variant="outline">
            Edit Booking
          </Button>
          {bookingData.status === 'completed' && (
            <Button>
              <Printer className="mr-2 h-4 w-4" />
              Print Reports
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewBookingDetails;
