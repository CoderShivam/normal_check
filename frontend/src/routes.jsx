import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Error404 from "./components/Pages/Error404";
import Arena from "./components/Pages/Arena";
import QuestionsPage from "./components/Pages/Platforms/Questions";
import ResumeBuilder from "./components/Pages/ResumeBuilder";
import PlatformList from "./components/Pages/Platforms/PlatformList";
import CodeforcesAPI from "./components/Pages/Platforms/Codeforces";
import ContestsWithLinks from "./components/Pages/Platforms/Contests";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Signup";
import CompaniesPage from "./components/Pages/CompaniesPage";
import CompanyDetails from "./components/Pages/CompanyDetails";
import ResourcesPage from "./components/Pages/Resources";

import ProtectedRoute from "./components/PrivateRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/arena" element={<ProtectedRoute element={<Arena />} />} />
    <Route path="*" element={<Error404 />} />
    <Route path="/questions" element={<QuestionsPage/>}/>
    <Route path="/resumebuilder" element={<ResumeBuilder/>}/>
    <Route path="/platformlist" element={<PlatformList/>}/>
    <Route path="/platform/QuestionsPage" element={<QuestionsPage />} />
    <Route path="/platform/CodeforcesAPI" element={<CodeforcesAPI />} />
    <Route path="/platform/ContestsWithLinks" element={<ContestsWithLinks />} />
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/companiespage" element={<CompaniesPage />}/>
<Route path="/companies/:id" element={<CompanyDetails />}/>
<Route path="/resources" element={<ResourcesPage/>}/>

  </Routes>
);

export default AppRoutes;