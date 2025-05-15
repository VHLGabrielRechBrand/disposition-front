import { apiFetch } from './BaseService.js';

/**
 * Fetches the list of available OpenAI models from the backend
 * @returns {Promise<string[]>} - Array of model names
 */
export async function getAvailableModels() {
    const data = await apiFetch('/configuration/available-models');
    return data.models || [];
}

/**
 * Updates the OpenAI model for a user
 * @param {string} userId - User ID
 * @param {string} model - Model name (e.g. 'gpt-4', 'gpt-3.5-turbo')
 * @returns {Promise<any>}
 */
export function setOpenAIModel(userId, model) {
    return apiFetch('/configuration/set-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            model: model,
        }),
    });
}
