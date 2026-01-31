// import axios from "axios";


// const baseURL = import.meta.env.VITE_BACKEND_BASE_API

// const axiosInstance= axios.create({
//     baseURL: baseURL,
//     headers:{
//         'Content-Type' : 'application/json'
//     }
// })

// //  request Intersector
// axiosInstance.interceptors.request.use(
//     function(config){
//         const accessToken=localStorage.getItem('accessToken')
//         if(accessToken){
//             config.headers['Authorization'] = `Bearer ${accessToken}`
//         }
//         return config ;
//     },
//     function(error){
//         return Promise.reject(error);
//     }
// )


// axiosInstance.interceptors.response.use(
//     function(response){
//         return response;
//     },
//     async function(error){
//         const orignalRequest = error.config;
//         if (error.response.status === 401 && !orignalRequest.retry){
//             orignalRequest.retry = True;
//             const refreshToken= localStorage.getItem('refreshToken')
//             try{
//                const response= await axiosInstance.post('/token/refresh/',{ refresh: refreshToken })
//                localStorage.setItem('accessToken' , response.data.access)
//                orignalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
//                return axiosInstance(orignalRequest)
//             }catch(error){
//                localStorage.removeItem('acesssToken')
//                localStorage.removeItem('acesssToken')
              
//             }
//         }
//         return Promise.reject(error);
//     }
// )


import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        // ❗ Do NOT attach token to refresh endpoint
        if (accessToken && !config.url.includes("/token/refresh/")) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                // 🔥 USE PLAIN AXIOS HERE
                const res = await axios.post(
                    `${baseURL}/token/refresh/`,
                    { refresh: refreshToken }
                );

                localStorage.setItem("accessToken", res.data.access);

                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

                return axiosInstance(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

// export default axiosInstance;


