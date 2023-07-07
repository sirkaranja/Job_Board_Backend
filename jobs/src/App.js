import React from "react";
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideNavigationBar from "./jobseekercomponents/NavBar";
import PostJobs from "./jobseekercomponents/PostJobs";
import ViewJobs from "./jobseekercomponents/ViewJobs";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <SideNavigationBar />
      <Routes>

        <Route path="/PostJobs" element={<PostJobs />} />
        <Route path="/ViewJobs" element={<ViewJobs />} />
        
      </Routes>
    </>
  );
}

export default App;
