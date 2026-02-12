import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Companies from "./pages/Companies";
import Tasks from "./pages/Tasks";
import Layout from "./components/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LeadForm from "./pages/LeadForm";
import CompanyDetail from "./pages/CompanyDetail";
import CompanyForm from "./pages/CompanyForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/add" element={<LeadForm />} />
            <Route path="/leads/edit/:id" element={<LeadForm />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />

            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/edit/:id" element={<CompanyForm />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />

            <Route path="/tasks" element={<Tasks />} />
            
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
