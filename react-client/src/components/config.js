export const authEndpoint = "https://accounts.spotify.com/authorize";

// Mood lifters client ID, redirect URI and desired scopes
export const clientId = 'f6455a8beb074cb9a85949fd8bb537d9';
export const redirectUri = process.env.FRONTEND_URI  || "http://localhost:3000/callback";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "playlist-modify-public",
    "user-follow-read",
    "streaming",
];
