import './App.css';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import UserReviewScreen from './components/site/personal_rating_review/user_review_screen';
import UserNavigationbar from './components/home/UserNavigation.jsx';
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
// import UserProfile from './components/home/UserProfile';
import Dashboard from './components/Admin/dashboard/Dashboard';
import SideBar from './components/Admin/dashboard/Sidebar';
import Topbar from './components/Admin/dashboard/Topbar.jsx';
import ViewSite from './components/site/Site/ViewSite.jsx';
import { ColorModeContext, useMode } from '../src/theme.jsx';
import { styled, useTheme } from '@mui/material/styles';
import {useSelector} from 'react-redux';
import HotelList from './components/Hotel/HotelBooking.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import UpdateTimeline from './components/timelines/travelplans/updateTravelPlans.jsx';
import Timetable from './components/timelines/travelplans/Timetable.jsx';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

function App() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo, token, refreshToken, admin} = userLogin;

  useEffect(() => {
    console.log(userInfo);
    console.log(token);
    console.log(refreshToken);
    // Additional logic to handle user state changes
  }, [userInfo, token, admin, refreshToken, userLogin]); // Dependency array includes userInfo and admin

  return (
    <CookiesProvider>
      <Router>
      {admin !== "true"?<UserNavigationbar />:null}
      {userInfo && admin === "true"? <Topbar /> : null}
      {userInfo && admin === "true"? <SideBar open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} /> : null}
        <Routes>
          <Route path="/" element={<Navigate replace to="/glo2go/home" />} />
          {/* <Route path='/glo2go/profile' element={<ProfileForm />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="review" element={<UserReviewScreen />} />
          <Route path="glo2go/home" element={<LoginScreen />} />
          <Route path="glo2go/hotel" element={<HotelList />} />
          <Route path="forgotpassword" element={<ForgotPasswordScreen />} />
          <Route path="glo2glo/travelplans" element={<TravelPlanDisplay />} />
          <Route path="glo2go/travelplans/newtimeline" element={<NewTimelines />} />
          <Route path="glo2go/signup" element={<SignUp />} />
          <Route path="glo2go/login" element={<LoginUserScreen />} />
          <Route path="glo2go/reset-password" element={<ResetPassword />} />
          <Route path="admin/glo2go/updatesite" element={<UpdateSiteForm />} />
          <Route path="admin/glo2go/createsite" element={<CreateSiteForm />} />
          <Route path="admin/glo2go/site" element={<ViewSites />} />
          <Route path="admin/glo2go/site/:siteId" element={<ViewSite />} />
          <Route path="admin/glo2go/login" element={<AdminLoginScreen />} />
          <Route path="admin/glo2go/dashboard/travellist" element={<TravelerList />} />
          <Route path="admin/glo2go/dashboard/travellist/travelerform" element={<TravelerForm />} />
          <Route path="admin/glo2go/dashboard/travellist/travelerdetails" element={<TravelerDetails />} />
          <Route path="admin/glo2go/dashboard" element={<Dashboard />} />
          <Route path='glo2go/AttractionsList' element={<AttractionsList />} />
          <Route path="glo2go/AttractionsList/:siteId" element={<SiteDetails />} />
          <Route path="glo2go/userprofile" element={<UserProfile />} />
          <Route path="glo2go/travelplans/timetable/:timetableID/:startDate/:endDate/:country/:region/:timelineTitle" element={<Timetable />} />
          <Route path="glo2go/travelplans/edit/:tableId" element={<UpdateTimeline/>} />
          {/* Include any other routes here */}
        </Routes>
        <Footer />
      </Router>
    </CookiesProvider>
  );
}

export default App;
