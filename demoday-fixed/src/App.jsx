import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Jobmodal from "./Components/Jobmodal";
import Rolemodal from "./Components/Rolemodal";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Jobdetail from "./Pages/Jobdetail";
import MyListings from "./Pages/MyListings";
import Stats from "./Pages/Stats";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Notfound from "./Pages/Notfound";
import { useStore } from "./Store/useStore";

function App() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const role = useStore((state) => state.role);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("roleModalDismissed");
    if (!role && !dismissed) {
      setIsRoleModalOpen(true);
    }
  }, [role]);

  const closeRoleModal = () => {
    sessionStorage.setItem("roleModalDismissed", "1");
    setIsRoleModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar onPostJob={() => setIsJobModalOpen(true)} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onPostJob={() => setIsJobModalOpen(true)} />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<Jobdetail />} />
          <Route
            path="/my-jobs"
            element={<MyListings onPostJob={() => setIsJobModalOpen(true)} />}
          />
          <Route path="/stats" element={<Stats />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
      <Footer />

      <Jobmodal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
      <Rolemodal
        isOpen={isRoleModalOpen}
        onClose={closeRoleModal}
      />
    </div>
  );
}

export default App;
