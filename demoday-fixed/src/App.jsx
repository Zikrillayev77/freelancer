import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Jobmodal from "./Components/Jobmodal";
import Rolemodal from "./Components/Rolemodal";
import BackToTop from "./Components/BackToTop";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Jobdetail from "./Pages/Jobdetail";
import MyListings from "./Pages/MyListings";
import Stats from "./Pages/Stats";
import SavedJobs from "./Pages/SavedJobs";
import Profile from "./Pages/Profile";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Notfound from "./Pages/Notfound";
import { useStore } from "./Store/useStore";

function App() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const role = useStore((state) => state.role);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("roleModalDismissed");
      if (!role && !dismissed) {
        setIsRoleModalOpen(true);
      }
    } catch {
      // Storage xatoliklariga qarshi
    }
  }, [role]);

  const closeRoleModal = () => {
    try {
      sessionStorage.setItem("roleModalDismissed", "1");
    } catch {
      // Storage xatoliklariga qarshi
    }
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
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
      <Footer />

      {/* ✅ Yuqoriga qaytish tugmasi */}
      <BackToTop />

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
