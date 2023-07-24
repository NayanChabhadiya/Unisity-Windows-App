import { Route, Routes } from "react-router-dom";
import FAQ from "./faq";
import Team from "./team";
import Form from "./form";
import Calendar from "./calendar";
import Contacts from "./contacts";
import Invoices from "./invoices";
import Dashboard from "./dashboard";
import Students from "./students";
import SubFaculties from "./subFaculties";
import Semesters from "./semesters";
import Projects from "./projects";
import Events from "./events";
import Notes from "./notes";
import Orgs from "./organizations";
import Encharges from "./encharges";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import OrgDashboard from "./dashboard/OrgDashboard";
import FacultyDashboard from "./dashboard/FacultyDashboard";
import StudentDashboard from "./dashboard/StudentDashboard";

const RouterPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/faq" element={<FAQ />} />
      <Route path="/team" element={<Team />} />
      <Route path="/students" element={<Students />} />
      <Route path="/semesters" element={<Semesters />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/faculties" element={<SubFaculties />} />
      <Route path="/organizations" element={<Orgs />} />
      <Route path="/form" element={<Form />} />
      <Route path="/encharges" element={<Encharges />} />
      <Route
        path="/"
        element={
          user.role === "Admin" ? (
            <Dashboard />
          ) : user.role === "Organization" ? (
            <OrgDashboard />
          ) : user.role === "Faculty" ? (
            <FacultyDashboard />
          ) : (
            user.role === "Student" && <StudentDashboard />
          )
        }
      />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/events" element={<Events />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
};

export default RouterPage;
