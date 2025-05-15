import { apiFetch } from './BaseService.js';

/**
 * Sends the Google ID token to the backend for authentication
 * @param {string} googleIdToken - Google OAuth token (JWT from Google Sign-In)
 * @returns {Promise<object>} - Authenticated user info
 */
export async function authenticateWithGoogle(googleIdToken) {
    return apiFetch('/auth/google', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${googleIdToken}`,
        },
    });
}