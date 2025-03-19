
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TestData {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  normalRange?: string;
  preparationRequired?: string;
}

interface EditTestProps {
  test?: TestData;
  onClose?: () => void;
}

export function EditTest({ test, onClose }: EditTestProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data if no test provided
  const initialData: TestData = test || {
    id: "T001",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    price: 500,
    description: "A blood test that evaluates the cells that circulate in blood.",
    normalRange: "WBC: 4.5-11.0 x10^9/L\nRBC: 4.5-5.9 x10^12/L\nHemoglobin: 14-18 g/dL\nHematocrit: 42-52%\nPlatelets: 150-450 x10^9/L",
    preparationRequired: "No special preparation required. Fasting is not necessary."
  };
  
  const [formData, setFormData] = useState<TestData>(initialData);
  const [saving, setSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? (parseInt(value) || 0) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Test updated",
        description: `Test ${formData.name} has been updated successfully.`,
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
            <CardTitle className="text-2xl">Edit Test</CardTitle>
            <CardDescription>Update test information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Test ID</Label>
                  <Input 
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Test Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input 
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description"
                    name="description"
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="normalRange">Normal Range</Label>
                  <textarea 
                    id="normalRange"
                    name="normalRange"
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.normalRange}
                    onChange={handleChange}
                    placeholder="Specify normal range values if applicable"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="preparationRequired">Preparation Required</Label>
                  <textarea 
                    id="preparationRequired"
                    name="preparationRequired"
                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.preparationRequired}
                    onChange={handleChange}
                    placeholder="Any patient preparation required for this test"
                  />
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

export default EditTest;
