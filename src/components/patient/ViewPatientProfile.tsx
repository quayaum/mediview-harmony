
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail, MapPin, Calendar, ArrowLeft } from "lucide-react";

interface PatientProfileProps {
  patient?: {
    id: string;
    name: string;
    gender: 'male' | 'female' | 'other';
    age: number;
    contactNumber: string;
    email: string;
    address: string;
    lastVisitDate: Date;
  };
  onClose?: () => void;
}

export function ViewPatientProfile({ patient, onClose }: PatientProfileProps) {
  const navigate = useNavigate();
  const [loading] = useState(false);

  // Sample data if no patient provided
  const patientData = patient || {
    id: "PT001",
    name: "John Smith",
    gender: "male" as const,
    age: 45,
    contactNumber: "+91 98765 43210",
    email: "john.smith@example.com",
    address: "123 Main St, Bangalore",
    lastVisitDate: new Date(2023, 7, 10)
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

      <Card>
        <CardHeader className="bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Patient Profile</CardTitle>
              <CardDescription>View detailed information about the patient</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button size="sm">
                New Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Patient ID</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{patientData.id}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="p-2 bg-muted/30 rounded-md">
                  {patientData.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <div className="p-2 bg-muted/30 rounded-md capitalize">
                    {patientData.gender}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <div className="p-2 bg-muted/30 rounded-md">
                    {patientData.age} years
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData.contactNumber}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patientData.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <div className="flex items-start gap-2 p-2 bg-muted/30 rounded-md">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{patientData.address}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Last Visit Date</Label>
                <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {patientData.lastVisitDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-end gap-2">
          <Button variant="outline">
            Test History
          </Button>
          <Button variant="outline">
            Print Reports
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ViewPatientProfile;
