import jwtDecode from 'jwt-decode';

const isTokenExpired = (token) => {
    if (!token) return true;

    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
        return true;
    }
    return false;
};

export default isTokenExpired;
