import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "72ff3dc516264b2180de5620be5d40c2";
const redirectUri = "https://mymusifyapp.netlify.app";
//const redirectUri = "http://localhost:3000";
const scopes = [
  "user-library-read",
  "playlist-read-private",
  "user-top-read",
  "playlist-read-collaborative",
];

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
