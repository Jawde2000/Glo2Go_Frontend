import { combineReducers, applyMiddleware, createStore, } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cookies from 'js-cookie';
import { userLoginReducer, tokenValidationReducer, userRegisterReducer } from './reducers/userReducers';
import { timelineCreateReducer, timelineDeleteReducer, timelineUpdateReducer, timelineListReducer } from './reducers/timelineReducers';
import { siteListReducer, siteDeleteReducer, siteUpdateReducer, singleSiteReducer, randomSiteReducer } from './reducers/siteReducers';
import { eventCreateReducer, eventDeleteReducer, eventGetReducer, eventUpdateReducer } from './reducers/eventReducers';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    tokenValidation: tokenValidationReducer,
    timelineCreate: timelineCreateReducer, 
    timelineDelete: timelineDeleteReducer,
    timelineUpdate: timelineUpdateReducer,
    timelineList: timelineListReducer,
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

const userInfoFromCookies = Cookies.get('userinfo') ?
    JSON.parse(Cookies.get('userinfo')) : null;

const userAdminFromCookies = Cookies.get('admin');
const userTokenFromCookies = Cookies.get('token');
const userRefreshFromCookies = Cookies.get('refreshToken');

const initialState = {
    userLogin: {
        userInfo: userInfoFromCookies,
        admin: userAdminFromCookies,
        token: userTokenFromCookies,
        refreshToken: userRefreshFromCookies,
    }
};

const middleware = [thunk];

const store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

const persistor = persistStore(store);

export { store, persistor };
