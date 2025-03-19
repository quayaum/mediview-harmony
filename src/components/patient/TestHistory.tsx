
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Check, Clock, AlertCircle, FileText, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestRecord {
  id: string;
  date: Date;
  testNames: string[];
  bookingId: string;
  status: 'completed' | 'in-progress' | 'booked';
  reportUrl?: string;
}

interface PatientTestHistoryProps {
  patient?: {
    id: string;
    name: string;
  };
  testHistory?: TestRecord[];
  onClose?: () => void;
}

export function PatientTestHistory({ patient, testHistory, onClose }: PatientTestHistoryProps) {
  const navigate = useNavigate();
  
  // Sample data if no patient or test history provided
  const patientData = patient || {
    id: "PT001",
    name: "John Smith"
  };
  
  const sampleTestHistory: TestRecord[] = testHistory || [
    {
      id: "TH001",
      date: new Date(2023, 7, 10),
      testNames: ["Blood Test", "Urinalysis"],
      bookingId: "BK001",
      status: "completed",
      reportUrl: "#"
    },
    {
      id: "TH002",
      date: new Date(2023, 6, 15),
      testNames: ["Cholesterol"],
      bookingId: "BK010",
      status: "completed",
      reportUrl: "#"
    },
    {
      id: "TH003",
      date: new Date(2023, 5, 20),
      testNames: ["X-Ray", "Blood Sugar"],
      bookingId: "BK015",
      status: "completed",
      reportUrl: "#"
    },
    {
      id: "TH004",
      date: new Date(2023, 8, 5),
      testNames: ["Liver Function", "Thyroid Panel"],
      bookingId: "BK020",
      status: "in-progress"
    },
    {
      id: "TH005",
      date: new Date(2023, 8, 10),
      testNames: ["COVID-19 Antibody"],
      bookingId: "BK025",
      status: "booked"
    }
  ];
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  // Group tests by year and month
  const groupedTests = sampleTestHistory.reduce((acc, test) => {
    const yearMonth = `${test.date.getFullYear()}-${test.date.getMonth()}`;
    if (!acc[yearMonth]) {
      acc[yearMonth] = [];
    }
    acc[yearMonth].push(test);
    return acc;
  }, {} as Record<string, TestRecord[]>);
  
  // Sort groups by date (newest first)
  const sortedGroups = Object.entries(groupedTests)
    .sort(([a], [b]) => {
      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);
      return yearB - yearA || monthB - monthA;
    });
  
  return (
    <div className="container mx-auto p-4 max-w-4xl">
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
              <CardTitle className="text-2xl">Test History</CardTitle>
              <CardDescription>
                View test history for patient: <span className="font-medium">{patientData.name}</span> ({patientData.id})
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print All Reports
              </Button>
              <Button size="sm">
                New Booking
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {sortedGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">No test history available for this patient</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedGroups.map(([yearMonth, tests]) => {
                const [year, month] = yearMonth.split('-').map(Number);
                const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
                
                return (
                  <div key={yearMonth} className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {monthName} {year}
                    </h3>
                    
                    <div className="border rounded-lg divide-y">
                      {tests.map((test, index) => (
                        <div key={index} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{test.bookingId}</span>
                              <div className={`status-chip bg-status-${test.status === 'in-progress' ? 'inprogress' : test.status}`}>
                                {test.status === 'booked' && <Clock className="h-3.5 w-3.5" />}
                                {test.status === 'in-progress' && <AlertCircle className="h-3.5 w-3.5" />}
                                {test.status === 'completed' && <Check className="h-3.5 w-3.5" />}
                                <span className="capitalize">{test.status === 'in-progress' ? 'In Progress' : test.status}</span>
                              </div>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              {test.date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            
                            <div className="flex flex-wrap gap-1 pt-1">
                              {test.testNames.map((name, i) => (
                                <Badge key={i} variant="outline">
                                  {name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => console.log(`View booking details for ${test.bookingId}`)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                            
                            {test.status === 'completed' && (
                              <Button 
                                size="sm"
                                onClick={() => console.log(`Print report for ${test.id}`)}
                              >
                                <Printer className="mr-2 h-4 w-4" />
                                Report
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default PatientTestHistory;
