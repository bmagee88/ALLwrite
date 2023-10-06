import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BrowsePage from "./pages/BrowsePage";
import FeedbackPage from "./pages/FeedbackPage"
import DonationPage from "./pages/DonationPage"
import ReadingPage from "./pages/ReadingPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import SharePage from "./pages/SharePage"
import CoverDetailsPage from "./pages/CoverDetailsPage"
import Testing from "./pages/Testing";
import Header from "./components/nonexamples/Header";
import CreateCover from "./pages/CreateCover";
import CreatePage from "./pages/CreatePage";
function App() {
  return (
    <div>
      
      <Router>
        <Header/>
        <Routes>
          <Route path="" exact element={<LandingPage />} />
          <Route path="testing" element={<Testing />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="reading/:cover_title/:first_page" element={<ReadingPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="share" element={<SharePage />} />
          <Route path="create-cover" element={<CreateCover />} />
          <Route path="cover-details/:cover_id" element={<CoverDetailsPage />} />
          <Route path="create-page/:parent_id" element={<CreatePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
