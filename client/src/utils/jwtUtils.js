// utils/jwtUtils.js
import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    if (!token) return true; // If there's no token, consider it expired
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Compare expiration time with current time
};
