import { apiFetch } from './BaseService.js';

/**
 * Scan a file via POST /scan-file with optional prompt to guide OCR/IA
 * @param {File} file - File to scan
 * @param {string} [prompt] - Optional prompt to guide extraction
 */
export async function scanFile(file, prompt = '') {
    const formData = new FormData();
    formData.append('file', file);
    if (prompt) {
        formData.append('prompt', prompt);
    }
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
 * Adds a tag to a document in the specified collection
 * @param {string} collection
 * @param {string} documentId
 * @param {string[]} tags
 * @returns {Promise<object>}
 */
export function tagDocument(collection, documentId, tags) {
    const path = `/collection/${encodeURIComponent(collection)}/${encodeURIComponent(documentId)}/tags`;

    const payload = Array.isArray(tags) ? tags : [tags];

    return apiFetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: payload }),
    });
}


/**
 * Example: scan file then reload collections and docs
 */
export async function scanAndRefresh(file, collectionName, prompt = '') {
    const scanResult = await scanFile(file, prompt);
    const collections = await listCollections();
    const documents = await listDocuments(collectionName);
    return { scanResult, collections, documents };
}