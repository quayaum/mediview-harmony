
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Download, Calendar, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

interface TestAnalyticsProps {
  testId?: string;
  testName?: string;
  onClose?: () => void;
}

export function TestAnalytics({ testId, testName, onClose }: TestAnalyticsProps) {
  const navigate = useNavigate();
  
  // Sample data
  const id = testId || "T001";
  const name = testName || "Complete Blood Count (CBC)";
  
  // Sample data for monthly bookings
  const monthlyData = [
    { name: 'Jan', bookings: 12, revenue: 6000 },
    { name: 'Feb', bookings: 15, revenue: 7500 },
    { name: 'Mar', bookings: 18, revenue: 9000 },
    { name: 'Apr', bookings: 22, revenue: 11000 },
    { name: 'May', bookings: 20, revenue: 10000 },
    { name: 'Jun', bookings: 25, revenue: 12500 },
    { name: 'Jul', bookings: 30, revenue: 15000 },
    { name: 'Aug', bookings: 45, revenue: 22500 },
  ];
  
  // Sample status data
  const statusData = [
    { name: 'Completed', value: 38 },
    { name: 'In Progress', value: 5 },
    { name: 'Pending', value: 2 },
  ];
  
  // Sample daily data
  const dailyData = [
    { date: '08/05', bookings: 2 },
    { date: '08/06', bookings: 4 },
    { date: '08/07', bookings: 3 },
    { date: '08/08', bookings: 5 },
    { date: '08/09', bookings: 7 },
    { date: '08/10', bookings: 10 },
    { date: '08/11', bookings: 8 },
    { date: '08/12', bookings: 6 },
  ];
  
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Test Analytics
        </h1>
        <p className="text-muted-foreground">
          Analytics for test: <span className="font-medium">{name}</span> ({id})
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Bookings</CardTitle>
            <CardDescription>Number of bookings per month</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} bookings`, 'Bookings']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="bookings" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Revenue</CardTitle>
            <CardDescription>Revenue generated per month (₹)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Status Distribution</CardTitle>
            <CardDescription>Current test status distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statusData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Daily Bookings (Last Week)</CardTitle>
            <CardDescription>Bookings per day for the last week</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} bookings`, 'Bookings']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="bookings" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by Date
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View Test Details
          </Button>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Analytics
        </Button>
      </div>
    </div>
  );
}

export default TestAnalytics;
