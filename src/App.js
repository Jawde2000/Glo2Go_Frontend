import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
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

function App() {

  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [isLogged]); // The empty dependency array ensures this runs once on mount
  

  return (
    <CookiesProvider>
      <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
          </Routes>
          {/* <Routes>
            <Route path="/attraction/:attractionId" element={<AttractionDetail />}/>
          </Routes> */}
          <Routes>
            <Route path="/review" element={<UserReviewScreen />} />
          </Routes>
          <Routes>
            <Route path="/dash" element={<LoginScreen />}/>
          </Routes>
          <Routes>
            <Route path="/forgotpassword" element={<ForgotPasswordScreen />}/>
          </Routes>
          <Routes>
            <Route path="/travelplans" element={<TravelPlanDisplay />}/>
          </Routes>
          <Routes>
            <Route path="/newtimeline" element={<NewTimelines />} />
          </Routes>
          <Routes>
            <Route path='/glo2go/signup' element={<SignUp />} />
          </Routes>
          <Routes>
            <Route path='/glo2go/login' element={<LoginUserScreen />} />
          </Routes>
          <Routes>
            <Route path='/glo2go/reset-password' element={<ResetPassword />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/updatesite' element={<UpdateSiteForm />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/createsite' element={<CreateSiteForm />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/viewsite' element={<ViewSites />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/login' element={<AdminLoginScreen />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/dashboard/travellist' element={<TravelerList />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/dashboard/travellist/travelerform' element={<TravelerForm />} />
          </Routes>
          <Routes>
            <Route path='/admin/glo2go/dashboard/travellist/travelerdetails' element={<TravelerDetails />} />
          </Routes>
          {isLogged? <BottomNavigationbar />: null}
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
