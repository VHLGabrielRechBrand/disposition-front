import React, { useEffect, useState } from "react";
import { getAvailableModels, setOpenAIModel } from "../../service/ConfigurationService";

export default function Settings({}) {
    const [userId, setUserId] = useState("Gabriel");
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [loadingModels, setLoadingModels] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getAvailableModels()
            .then((models) => {
                setModels(models);
                setSelectedModel(models[0] || "");
            })
            .catch((err) => setMessage(`Error loading models: ${err.message}`))
            .finally(() => setLoadingModels(false));
    }, []);

    const handleSave = async () => {
        if (!selectedModel) {
            setMessage("Please select a model before saving.");
            return;
        }
        setSaving(true);
        setMessage(null);

        try {
            await setOpenAIModel(userId, selectedModel);
            setMessage("Model saved successfully!");
        } catch (err) {
            setMessage(`Error saving model: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loadingModels) {
        return <div>Loading models...</div>;
    }

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
            <h2>Settings</h2>

            <label htmlFor="model-select" style={{ display: "block", marginBottom: 8 }}>
                Select OpenAI Model:
            </label>
            <select
                id="model-select"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={saving}
                style={{ width: "100%", padding: 8, marginBottom: 12 }}
            >
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>

            <button onClick={handleSave} disabled={saving} style={{ padding: "8px 16px" }}>
                {saving ? "Saving..." : "Save"}
            </button>

            {message && <div style={{ marginTop: 12 }}>{message}</div>}
        </div>
    );
}
