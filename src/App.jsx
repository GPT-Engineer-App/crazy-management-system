import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/default"; // available: default, navbar, sidebar
import SidebarLayout from "./layouts/sidebar";
import Index from "./pages/Index.jsx";
import WastageLog from "./components/WastageLog";
import WastageReport from "./components/WastageReport";
import AdminPanel from "./pages/AdminPanel";
import EmployeeInterface from "./pages/EmployeeInterface";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Wastage Log",
    to: "/wastage-log",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Wastage Report",
    to: "/wastage-report",
    icon: <Home className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<SidebarLayout />}>
              <Route index element={<Index />} />
              <Route path="wastage-log" element={<WastageLog />} />
              <Route path="wastage-report" element={<WastageReport />} />
              <Route path="admin-panel" element={<AdminPanel />} />
              <Route path="employee-interface" element={<EmployeeInterface />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;