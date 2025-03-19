
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Calendar, FileText, Download, CheckSquare } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Report {
  id: string;
  testName: string;
  date: Date;
  bookingId: string;
  reportUrl: string;
}

interface PrintReportsProps {
  patient?: {
    id: string;
    name: string;
  };
  reports?: Report[];
  onClose?: () => void;
}

export function PrintReports({ patient, reports, onClose }: PrintReportsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data if no patient or reports provided
  const patientData = patient || {
    id: "PT001",
    name: "John Smith"
  };
  
  const sampleReports: Report[] = reports || [
    {
      id: "R001",
      testName: "Blood Test",
      date: new Date(2023, 7, 10),
      bookingId: "BK001",
      reportUrl: "#"
    },
    {
      id: "R002",
      testName: "Urinalysis",
      date: new Date(2023, 7, 10),
      bookingId: "BK001",
      reportUrl: "#"
    },
    {
      id: "R003",
      testName: "Cholesterol",
      date: new Date(2023, 6, 15),
      bookingId: "BK010",
      reportUrl: "#"
    },
    {
      id: "R004",
      testName: "X-Ray",
      date: new Date(2023, 5, 20),
      bookingId: "BK015",
      reportUrl: "#"
    },
    {
      id: "R005",
      testName: "Blood Sugar",
      date: new Date(2023, 5, 20),
      bookingId: "BK015",
      reportUrl: "#"
    }
  ];
  
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [printing, setPrinting] = useState(false);
  
  const toggleReport = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };
  
  const selectAll = () => {
    if (selectedReports.length === sampleReports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(sampleReports.map(report => report.id));
    }
  };
  
  const handlePrint = () => {
    if (selectedReports.length === 0) {
      toast({
        title: "No reports selected",
        description: "Please select at least one report to print.",
        variant: "destructive"
      });
      return;
    }
    
    setPrinting(true);
    
    // Simulate printing
    setTimeout(() => {
      setPrinting(false);
      toast({
        title: "Reports sent to printer",
        description: `${selectedReports.length} report(s) have been sent to the printer.`,
      });
    }, 1500);
  };
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  // Group reports by booking ID
  const groupedReports = sampleReports.reduce((acc, report) => {
    if (!acc[report.bookingId]) {
      acc[report.bookingId] = {
        date: report.date,
        reports: []
      };
    }
    acc[report.bookingId].reports.push(report);
    return acc;
  }, {} as Record<string, { date: Date; reports: Report[] }>);
  
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
              <CardTitle className="text-2xl">Print Reports</CardTitle>
              <CardDescription>
                Select and print reports for patient: <span className="font-medium">{patientData.name}</span> ({patientData.id})
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={selectAll}
              >
                <CheckSquare className="mr-2 h-4 w-4" />
                {selectedReports.length === sampleReports.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {Object.entries(groupedReports).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground">No reports available for this patient</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedReports).map(([bookingId, { date, reports }]) => (
                <div key={bookingId} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/30 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{bookingId}</span>
                      <span className="text-sm text-muted-foreground">
                        {date.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => console.log(`View booking details for ${bookingId}`)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Booking
                    </Button>
                  </div>
                  
                  <div className="divide-y">
                    {reports.map((report) => (
                      <div key={report.id} className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            id={report.id}
                            checked={selectedReports.includes(report.id)}
                            onCheckedChange={() => toggleReport(report.id)}
                          />
                          <div>
                            <label 
                              htmlFor={report.id} 
                              className="font-medium cursor-pointer"
                            >
                              {report.testName}
                            </label>
                            <div className="text-sm text-muted-foreground">
                              Report ID: {report.id}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => console.log(`View report ${report.id}`)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => console.log(`Download report ${report.id}`)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 flex justify-end gap-2">
          <Button
            onClick={handlePrint}
            disabled={selectedReports.length === 0 || printing}
          >
            {printing ? (
              <>Printing...</>
            ) : (
              <>
                <Printer className="mr-2 h-4 w-4" />
                Print Selected Reports ({selectedReports.length})
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default PrintReports;
