import logo from './logo.svg';
import './App.css';
import { CookiesProvider } from 'react-cookie';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from './components/home/home';
import AttractionDetail from './components/site/attraction/attraction';
import UserReviewScreen from './components/site/personal_rating_review/user_review_screen';
import BottomNavigationbar from './components/home/bottomnavigation';
import LoginScreen from './components/login/login';
import ForgotPasswordScreen from './components/reset_password/reset_password';
import TravelPlanDisplay from './components/timelines/travelplans/travelplansDisplay';
import NewTimelines from './components/timelines/new_timelines/NewTimelines';
import SignUp from './components/sign_up/SignUp';
import LoginUserScreen from './components/login/loginUser';

function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/attraction/:attractionId" element={<AttractionDetail />}/>
          </Routes>
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
      </BrowserRouter>
      <BottomNavigationbar />
    </CookiesProvider>
  );
}

export default App;
