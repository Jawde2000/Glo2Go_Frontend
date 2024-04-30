import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import UserReviewScreen from './components/site/personal_rating_review/user_review_screen';
import BottomNavigationbar from './components/home/bottomnavigation';
import LoginScreen from './components/login/login';
import ForgotPasswordScreen from './components/reset_password/reset_password';
import TravelPlanDisplay from './components/timelines/travelplans/travelplansDisplay';
import NewTimelines from './components/timelines/new_timelines/NewTimelines';
import SignUp from './components/sign_up/SignUp';
import LoginUserScreen from './components/login/loginUser';
import UpdateSiteForm from './components/site/Site/UpdateSiteForm';
import CreateSiteForm from './components/site/Site/CreateSiteForm';
import ViewSites from './components/site/Site/ViewSites';
import ResetPassword from './components/reset_password/reset_link';
import AdminLoginScreen from './components/Admin/AdminLogin/AdminLoginScreen';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import TravelerList from './components/Admin/UserManagement/TravelerList';
import TravelerForm from './components/Admin/UserManagement/TravelerForm';
import TravelerDetails from './components/Admin/UserManagement/TravelerDetails';
import AttractionsList from './components/home/attractionList';
import Footer from './components/home/Footer';
import SiteDetails from './components/home/SiteDetails';
import UserProfile from './components/home/UserProfile';
import Dashboard from './components/Admin/dashboard/Dashboard';

function App() {
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <CookiesProvider>
      <Router>
        {isLogged ? <BottomNavigationbar /> : null}
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="review" element={<UserReviewScreen />} />
          <Route path="dash" element={<LoginScreen />} />
          <Route path="forgotpassword" element={<ForgotPasswordScreen />} />
          <Route path="travelplans" element={<TravelPlanDisplay />} />
          <Route path="newtimeline" element={<NewTimelines />} />
          <Route path="glo2go/signup" element={<SignUp />} />
          <Route path="glo2go/login" element={<LoginUserScreen />} />
          <Route path="glo2go/reset-password" element={<ResetPassword />} />
          <Route path="admin/glo2go/updatesite" element={<UpdateSiteForm />} />
          <Route path="admin/glo2go/createsite" element={<CreateSiteForm />} />
          <Route path="admin/glo2go/viewsite" element={<ViewSites />} />
          <Route path="admin/glo2go/login" element={<AdminLoginScreen />} />
          <Route path="admin/glo2go/dashboard/travellist" element={<TravelerList />} />
          <Route path="admin/glo2go/dashboard/travellist/travelerform" element={<TravelerForm />} />
          <Route path="admin/glo2go/dashboard/travellist/travelerdetails" element={<TravelerDetails />} />
          <Route path="admin/glo2go/dashboard" element={<Dashboard />} />
          <Route path='glo2go/AttractionsList' element={<AttractionsList />} />
          <Route path="glo2go/AttractionsList/:siteId" element={<SiteDetails />} />
          <Route path="glo2go/userprofile" element={<UserProfile />} />
          {/* Include any other routes here */}
        </Routes>
        <Footer />
      </Router>
    </CookiesProvider>
  );
}

export default App;
