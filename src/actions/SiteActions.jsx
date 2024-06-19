import {
    VIEW_SITE_LIST_REQUEST,
    VIEW_SITE_LIST_SUCCESS,
    VIEW_SITE_LIST_FAILURE,
    GET_RANDOM_SITE_REQUEST,
    GET_RANDOM_SITE_SUCCESS,
    GET_RANDOM_SITE_FAILURE
} from '../constants/siteConstants';

// Fetch the list of sites
export const listSites = () => async (dispatch) => {
    try {
        dispatch({ type: VIEW_SITE_LIST_REQUEST });

        const response = await fetch('https://localhost:7262/api/Site/ViewSites');
        const data = await response.json();

        dispatch({
            type: VIEW_SITE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: VIEW_SITE_LIST_FAILURE,
            payload: error.message,
        });
    }
};

// Fetch a random site
export const getRandomSite = () => async (dispatch) => {
    try {
        dispatch({ type: GET_RANDOM_SITE_REQUEST });

        const response = await fetch('https://localhost:7262/api/Site/ViewSites');
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);

        dispatch({
            type: GET_RANDOM_SITE_SUCCESS,
            payload: data[randomIndex],
        });
    } catch (error) {
        dispatch({
            type: GET_RANDOM_SITE_FAILURE,
            payload: error.message,
        });
    }
};

// Fetch random site reviews
export const getRandomSiteReviews = () => async (dispatch) => {
    try {
        dispatch({ type: 'RANDOM_REVIEW_REQUEST' });

        const response = await fetch('https://localhost:7262/api/Review/random/site');
        const data = await response.json();
        const formattedReviews = data.map(review => ({
            username: review.travelerEmail.split('@')[0],
            rating: review.reviewRating,
            comment: review.reviewTraveler,
            site: review.reviewSite
        }));

        dispatch({
            type: 'RANDOM_REVIEW_SUCCESS',
            payload: formattedReviews,
        });
    } catch (error) {
        dispatch({
            type: 'RANDOM_REVIEW_FAILURE',
            payload: error.message,
        });
    }
};
