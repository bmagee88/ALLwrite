import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/contentPages/LandingPage/LandingPage_old";
import FeedbackPage from "./pages/ctaPages/FeedbackPage";
import DonationPage from "./pages/ctaPages/DonationPage";
import ReadingPage from "./pages/contentPages/ReadingPage";
import RegisterPage from "./pages/creationPages/RegisterPage";
import SharePage from "./pages/ctaPages/SharePage";
import CoverDetailsPage from "./pages/contentPages/CoverDetailsPage";
import Testing from "./test/Testing";
import CreateCover from "./pages/creationPages/CreateCover";
import CreatePage from "./pages/creationPages/CreatePage";
import AccountPage from "./pages/profilePages/AccountPage";
import ProfilePage from "./pages/profilePages/ProfilePage";
import SettingsPage from "./pages/profilePages/SettingsPage";
import MyCoversPage from "./pages/profilePages/MyCoversPage";
import MyPagesPage from "./pages/profilePages/MyPagesPage";
import MyBookmarksPage from "./pages/profilePages/MyBookmarksPage";
import LogoutPage from "./pages/sessionPages/LogoutPage";
import Test2 from "./test/Test2";
import Test3 from "./test/Test3";
import LoginPage from "./pages/sessionPages/LoginPage/LoginPage";
import BrowsePage from "./pages/contentPages/BrowsePage/BrowsePage";
import { Provider } from "react-redux";
import { store } from "./common/store/store";
import DashboardPage from "./pages/templatePages/DashboardPage/DashboardPage";
import ContinueReadingPage from "./pages/profilePages/ContinueReadingPage/ContinueReadingPage";
function App() {
  return (
    <>
      <Provider store={store}>
        {/* <Header /> */}
        <Routes>
          <Route
            path=''
            element={<LandingPage />}
          />

          <Route
            path='register'
            element={<RegisterPage />}
          />
          <Route
            path='login'
            element={<LoginPage />}
          />
          <Route
            path='logout'
            element={<LogoutPage />}
          />

          <Route
            path='test2'
            element={<Test2 />}
          />
          <Route
            path='test3'
            element={<Test3 />}
          />
          <Route
            path='testing'
            element={<Testing />}
          />

          <Route
            path='dashboard'
            element={<DashboardPage />}>
            <Route
              path='browse'
              element={<BrowsePage />}
            />
            <Route
              path='donate'
              element={<DonationPage />}
            />
            <Route
              path='feedback'
              element={<FeedbackPage />}
            />
            <Route
              path='share'
              element={<SharePage />}
            />
            <Route
              path='reading/:cover_title/:first_page'
              element={<ReadingPage />}
            />
            <Route
              path='donate'
              element={<DonationPage />}
            />
            <Route
              path='feedback'
              element={<FeedbackPage />}
            />
            <Route
              path='share'
              element={<SharePage />}
            />
            <Route
              path='create-cover'
              element={<CreateCover />}
            />
            <Route
              path='create-page/:parent_id'
              element={<CreatePage />}
            />
            <Route
              path='cover-details/:cover_id'
              element={<CoverDetailsPage />}
            />
            <Route
              path='account'
              element={<AccountPage />}
            />
            <Route
              path='profile/:user_id'
              element={<ProfilePage />}
            />
            <Route
              path='settings'
              element={<SettingsPage />}
            />
            <Route
              path='continue-reading'
              element={<ContinueReadingPage />}
            />
            <Route
              path='my-covers'
              element={<MyCoversPage />}
            />
            <Route
              path='my-pages'
              element={<MyPagesPage />}
            />
            <Route
              path='my-bookmarks'
              element={<MyBookmarksPage />}
            />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
