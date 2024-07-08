import { combineReducers, applyMiddleware, createStore, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookies from 'js-cookie';
import { userLoginReducer, tokenValidationReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { timelineCreateReducer, timelineDeleteReducer, timelineUpdateReducer, timelineListReducer, timelineDetailsReducer } from './reducers/timelineReducers';
import { siteListReducer, siteDeleteReducer, siteUpdateReducer, singleSiteReducer, randomSiteReducer } from './reducers/siteReducers';
import { eventCreateReducer, eventDeleteReducer, eventGetReducer, eventUpdateReducer } from './reducers/eventReducers';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    tokenValidation: tokenValidationReducer,
    timelineCreate: timelineCreateReducer, 
    timelineDelete: timelineDeleteReducer,
    timelineUpdate: timelineUpdateReducer,
    timelineList: timelineListReducer,
    timelineDetails: timelineDetailsReducer,
    siteList: siteListReducer, 
    siteDelete: siteDeleteReducer, 
    siteUpdate: siteUpdateReducer, 
    singleSite: singleSiteReducer,
    randomSite: randomSiteReducer,
    eventCreate: eventCreateReducer,
    eventDelete: eventDeleteReducer,
    eventGet: eventGetReducer, 
    eventUpdate: eventUpdateReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const userInfoFromCookies = Cookies.get('userinfo');

console.log(userInfoFromCookies);

const userAdminFromCookies = Cookies.get('admin');
const userTokenFromCookies = Cookies.get('token');
const userRefreshFromCookies = Cookies.get('refreshToken');

const initialState = {
    userLogin: {
        userInfo: userInfoFromCookies? userInfoFromCookies:null,
        admin: userAdminFromCookies? userAdminFromCookies:null,
        token: userTokenFromCookies? userTokenFromCookies:null,
        refreshToken: userRefreshFromCookies? userRefreshFromCookies:null,
    }
};

const middleware = [thunk];

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const persistor = persistStore(store);

export { store, persistor };
