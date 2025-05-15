const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Wrapper around fetch that prefixes the base URL and handles JSON responses
 * @param {string} path - endpoint path (e.g. '/scan-file')
 * @param {object} options - fetch options
 * @returns {Promise<any>}
 */
export async function apiFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
        return response.json();
    }

    return response;
}
