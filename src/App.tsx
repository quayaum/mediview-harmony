
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";

// Patient pages
import ViewPatientProfile from "./components/patient/ViewPatientProfile";
import EditPatient from "./components/patient/EditPatient";
import PatientTestHistory from "./components/patient/TestHistory";
import PrintReports from "./components/patient/PrintReports";

// Booking pages
import EditBooking from "./components/booking/EditBooking";
import AddPayment from "./components/booking/AddPayment";
import ViewBookingDetails from "./components/booking/ViewBookingDetails";

// Test pages
import EditTest from "./components/test/EditTest";
import TestDetails from "./components/test/TestDetails";
import TestAnalytics from "./components/test/TestAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Patient routes */}
          <Route path="/patients/:id" element={<ViewPatientProfile />} />
          <Route path="/patients/:id/edit" element={<EditPatient />} />
          <Route path="/patients/:id/test-history" element={<PatientTestHistory />} />
          <Route path="/patients/:id/print-reports" element={<PrintReports />} />
          
          {/* Booking routes */}
          <Route path="/bookings/:id" element={<ViewBookingDetails />} />
          <Route path="/bookings/:id/edit" element={<EditBooking />} />
          <Route path="/bookings/:id/add-payment" element={<AddPayment />} />
          
          {/* Test routes */}
          <Route path="/tests/:id" element={<TestDetails />} />
          <Route path="/tests/:id/edit" element={<EditTest />} />
          <Route path="/tests/:id/analytics" element={<TestAnalytics />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
