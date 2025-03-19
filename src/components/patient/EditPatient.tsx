
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PatientData {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  contactNumber: string;
  email: string;
  address: string;
}

interface EditPatientProps {
  patient?: PatientData;
  onClose?: () => void;
}

export function EditPatient({ patient, onClose }: EditPatientProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data if no patient provided
  const initialData = patient || {
    id: "PT001",
    name: "John Smith",
    gender: "male" as const,
    age: 45,
    contactNumber: "+91 98765 43210",
    email: "john.smith@example.com",
    address: "123 Main St, Bangalore"
  };
  
  const [formData, setFormData] = useState<PatientData>(initialData);
  const [saving, setSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Patient updated",
        description: `Patient ${formData.name} has been updated successfully.`,
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
            <CardTitle className="text-2xl">Edit Patient</CardTitle>
            <CardDescription>Update patient information</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Patient ID</Label>
                  <Input 
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select 
                      id="gender" 
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age"
                      name="age"
                      type="number"
                      min="0"
                      max="150"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input 
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
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

export default EditPatient;
