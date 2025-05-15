const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Wrapper around fetch that prefixes the base URL and handles JSON responses
 * @param {string} path - endpoint path (e.g. '/scan-file')
 * @param {object} options - fetch options
 * @returns {Promise<any>}
 */
async function apiFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed ${response.status}: ${errorText}`);
    }
    // Attempt to parse JSON, otherwise return raw response
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
        return response.json();
    }
    return response;
}

/**
 * Scan a file via POST /scan-file
 */
export async function scanFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return apiFetch('/scan-file', { method: 'POST', body: formData });
}

/**
 * List all collections via GET /collections
 */
export const listCollections = () => apiFetch('/collections');

/**
 * List documents in a collection via GET /collection/{collection_name}
 */
export function listDocuments(collectionName) {
    const path = `/collection/${encodeURIComponent(collectionName)}`;
    return apiFetch(path);
}

/**
 * Get a document from a collection via GET /collection/{collection_name}/{document_id}
 * @param {string} collectionName - The name of the collection
 * @param {string} documentId - The ID of the document
 * @returns {Promise<object>} - The document data
 */
export function getDocumentById(collectionName, documentId) {
    const path = `/collection/${encodeURIComponent(collectionName)}/${encodeURIComponent(documentId)}`;
    return apiFetch(path);
}

/**
 * Delete a document via DELETE /collection/{collection_name}/{document_id}
 */
export function deleteDocument(collectionName, documentId) {
    const path = `/collection/${encodeURIComponent(collectionName)}/${encodeURIComponent(documentId)}`;
    return apiFetch(path, { method: 'DELETE' });
}

/**
 * Example: scan file then reload collections and docs
 */
export async function scanAndRefresh(file, collectionName) {
    const scanResult = await scanFile(file);
    const collections = await listCollections();
    const documents = await listDocuments(collectionName);
    return { scanResult, collections, documents };
}