import { BrowserRouter, Route, Routes } from "react-router-dom";
import CacheExperiment from "../pages/CacheExperiment";
import StaleTimeExperiment from "../pages/StaleTimeExperiment";
import MutationExperiment from "../pages/MutationExperiment";
import DashBoard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/cache" element={<CacheExperiment />} />
        <Route path="/stale-time" element={<StaleTimeExperiment />} />
        <Route path="/mutation" element={<MutationExperiment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
