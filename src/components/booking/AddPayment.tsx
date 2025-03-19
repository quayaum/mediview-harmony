
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Calendar, CreditCard, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BookingDetails {
  id: string;
  patientName: string;
  patientId: string;
  date: Date;
  totalAmount: number;
  payableAmount: number;
  paidAmount: number;
  remainingAmount: number;
}

interface AddPaymentProps {
  booking?: BookingDetails;
  onClose?: () => void;
}

export function AddPayment({ booking, onClose }: AddPaymentProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data if no booking provided
  const bookingData = booking || {
    id: "BK001",
    patientName: "John Smith",
    patientId: "PT001",
    date: new Date(2023, 7, 10),
    totalAmount: 2500,
    payableAmount: 2000,
    paidAmount: 1000,
    remainingAmount: 1000
  };
  
  const [amount, setAmount] = useState(bookingData.remainingAmount.toString());
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card' | 'other'>('cash');
  const [reference, setReference] = useState("");
  const [processing, setProcessing] = useState(false);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and validate that it's not greater than remaining amount
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value) || 0;
    
    if (numValue <= bookingData.remainingAmount) {
      setAmount(value);
    } else {
      setAmount(bookingData.remainingAmount.toString());
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a payment amount greater than zero.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Payment added",
        description: `Payment of ₹${amount} has been added to booking ${bookingData.id}.`,
      });
      
      if (onClose) {
        onClose();
      } else {
        navigate(-1);
      }
    }, 1000);
  };
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-xl">Add Payment</CardTitle>
            <CardDescription>Add a new payment to this booking</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-md font-medium">Booking Details</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-medium">{bookingData.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {bookingData.date.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Patient Name</span>
                    <span className="font-medium">{bookingData.patientName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Patient ID</span>
                    <span className="font-medium">{bookingData.patientId}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-md font-medium">Payment Information</h3>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium">₹{bookingData.totalAmount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Payable Amount</span>
                    <span className="font-medium">₹{bookingData.payableAmount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">₹{bookingData.paidAmount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Remaining Amount</span>
                    <span className="font-medium text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      ₹{bookingData.remainingAmount}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      Payment Amount (₹)
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                      placeholder="Enter payment amount"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum amount: ₹{bookingData.remainingAmount}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">
                      Payment Method
                      <span className="text-red-500">*</span>
                    </Label>
                    <select 
                      id="paymentMethod" 
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference Number</Label>
                    <Input 
                      id="reference"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      placeholder="Transaction ID, Receipt Number, etc."
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional for cash payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleBack}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={processing || parseInt(amount) <= 0}
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AddPayment;
