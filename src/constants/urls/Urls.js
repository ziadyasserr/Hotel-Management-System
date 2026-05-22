import axios from "axios";

// BASE URLS
export const IMAGE_URL = "https://upskilling-egypt.com:3000";
export const BASE_URL = "https://upskilling-egypt.com:3000/api/v0"

// AXIOS INSTANCE
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// USERS URLS
export const USERS_URLS = {
    LOGIN: "/admin/users/login",
    REGISTER: "/admin/users",
    VERIFY: "/admin/users/verify",
    RESET_REQUEST: "/admin/users",
    CHANGE_PASSWORD: "/admin/users/change-password",
    RESET: "/admin/users/reset-password",
    // GET_USERS: "/admin/users/",
    // DELETE_USER: (id) => `/admin/users/${id}`,
};
// ADMIN URLS
export const ADMIN_URLS = {
    GET_CHARTS: "/admin/dashboard",
    ////////////////////////////////////////////////////////////
    GET_USERS: "/admin/users",
    ////////////////////////////////////////////////////////////
    GET_ROOMS: "/admin/rooms",
    ADD_ROOM: "/admin/rooms",
    DELETE_ROOM: (id) => `/admin/rooms/${id}`,
    UPDATE_ROOM: (id) => `/admin/rooms/${id}`,
    ////////////////////////////////////////////////////////////
    GET_FACILITIES: "/admin/room-facilities",
    DELETE_FACILITY: (id) => `/admin/room-facilities/${id}`,
    ADD_FACILITY: "/admin/room-facilities",
    UPDATE_FACILITY: (id) => `/admin/room-facilities/${id}`,
    ///////////////////////////////////////////////////////////////
    ADD_ADS: "/admin/ads",
    GET_ADS: "/admin/ads",
    DELETE_ADS: (id) => `/admin/ads/${id}`,
    ////////////////////////////////////////////////////////////////
    GET_BOOKINGS: "/admin/booking",
};


// USER URLS
export const USER_URLS = {
    GET_ADS: "/portal/ads",
    GET_AVAILABLE_ROOMS: "/portal/rooms/available",
    GET_ROOMS: "/portal/rooms",
    GET_ROOM_DETAILS: (id) => `/portal/rooms/${id}`,
    ////////////////////////////////////////////////////////////////////////////
    GET_FAVORITES_ROOM: "/portal/favorite-rooms",
    ADD_FAVORITE_ROOM: "/portal/favorite-rooms",
    REMOVE_FAVORITE_ROOM: (id) => `/portal/favorite-rooms/${id}`,
    ////////////////////////////////////////////////////////////////////////////
    CREATE_COMMENT:"/portal/room-comments",
    CREATE_REVIEW:"/portal/room-reviews",


};




