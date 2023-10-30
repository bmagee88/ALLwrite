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
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import MyCoversPage from "./pages/MyCoversPage";
import MyPagesPage from "./pages/MyPagesPage";
import MyBookmarksPage from "./pages/MyBookmarksPage";
import LogoutPage from "./pages/LogoutPage";
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
          <Route path="logout" element={<LogoutPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="reading/:cover_title/:first_page" element={<ReadingPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="share" element={<SharePage />} />
          <Route path="create-cover" element={<CreateCover />} />
          <Route path="create-page/:parent_id" element={<CreatePage />} />
          <Route path="cover-details/:cover_id" element={<CoverDetailsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="profile/:user_id" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="my-covers" element={<MyCoversPage />} />
          <Route path="my-pages" element={<MyPagesPage />} />
          <Route path="my-bookmarks" element={<MyBookmarksPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
