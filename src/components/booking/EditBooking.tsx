
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface BookingData {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  testNames: string[];
  totalAmount: number;
  payableAmount: number;
  discount: number;
  status: 'booked' | 'in-progress' | 'completed';
}

interface EditBookingProps {
  booking?: BookingData;
  onClose?: () => void;
}

export function EditBooking({ booking, onClose }: EditBookingProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data if no booking provided
  const initialData: BookingData = booking || {
    id: "BK001",
    patientName: "John Smith",
    patientId: "PT001",
    date: new Date(2023, 7, 10).toISOString().split('T')[0],
    testNames: ["Blood Test", "Urinalysis"],
    totalAmount: 2500,
    payableAmount: 2000,
    discount: 500,
    status: "booked"
  };
  
  const [formData, setFormData] = useState<BookingData>(initialData);
  const [newTest, setNewTest] = useState("");
  const [saving, setSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "totalAmount" || name === "payableAmount" || name === "discount"
        ? parseInt(value) || 0
        : value
    }));
  };
  
  const addTest = () => {
    if (newTest.trim() && !formData.testNames.includes(newTest.trim())) {
      setFormData(prev => ({
        ...prev,
        testNames: [...prev.testNames, newTest.trim()]
      }));
      setNewTest("");
    }
  };
  
  const removeTest = (test: string) => {
    setFormData(prev => ({
      ...prev,
      testNames: prev.testNames.filter(t => t !== test)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Booking updated",
        description: `Booking ${formData.id} has been updated successfully.`,
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
    <div className="container mx-auto p-4 max-w-3xl">
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
            <CardTitle className="text-2xl">Edit Booking</CardTitle>
            <CardDescription>Update booking information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Booking ID</Label>
                  <Input 
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input 
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input 
                    id="patientId"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Booking Date</Label>
                  <Input 
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select 
                    id="status" 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="booked">Booked</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount (₹)</Label>
                  <Input 
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    min="0"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (₹)</Label>
                  <Input 
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    value={formData.discount}
                    onChange={(e) => {
                      const discountValue = parseInt(e.target.value) || 0;
                      setFormData(prev => ({
                        ...prev,
                        discount: discountValue,
                        payableAmount: prev.totalAmount - discountValue
                      }));
                    }}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="payableAmount">Payable Amount (₹)</Label>
                  <Input 
                    id="payableAmount"
                    name="payableAmount"
                    type="number"
                    min="0"
                    value={formData.payableAmount}
                    disabled
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <Label>Tests</Label>
              <div className="flex flex-wrap gap-2 min-h-10 p-2 border rounded-md">
                {formData.testNames.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No tests added</div>
                ) : (
                  formData.testNames.map((test, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {test}
                      <button
                        type="button"
                        className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTest(test)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a test"
                  value={newTest}
                  onChange={(e) => setNewTest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTest();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={addTest}
                >
                  <Plus className="h-4 w-4" />
                </Button>
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
              disabled={saving}
            >
              {saving ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default EditBooking;
