import React, { useEffect, useState } from "react";
import { getAvailableModels, setOpenAIModel } from "../../service/ConfigurationService";
import { useAuth } from "../../hooks/useAuth.jsx";
import CustomSelect from "../ui/CustomSelect";
import { toast } from 'sonner';
import "./Settings.css";

export default function Settings() {
    const { user } = useAuth();
    const userId = user?.sub || "";
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [loadingModels, setLoadingModels] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getAvailableModels()
            .then((models) => {
                setModels(models);
                setSelectedModel(models[0] || "");
            })
            .catch((err) => toast.error(`Error loading models: ${err.message}`))
            .finally(() => setLoadingModels(false));
    }, []);

    const handleSave = async () => {
        if (!selectedModel) {
            toast.warning("Please select a model before saving.");
            return;
        }
        if (!userId) {
            toast.error("User not authenticated.");
            return;
        }
        setSaving(true);

        try {
            await setOpenAIModel(userId, selectedModel);
            toast.success("Model saved successfully!");
        } catch (err) {
            toast.error(`Error saving model: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loadingModels) {
        return <div className="settings-container">Loading models...</div>;
    }

    const modelOptions = models.map((model) => ({
        value: model,
        label: model,
    }));

    const selectedOption = modelOptions.find((opt) => opt.value === selectedModel) || null;

    return (
        <div className="settings-page">
            <div className="settings-container">
                <CustomSelect
                    id="model-select"
                    label="OpenAI Model"
                    options={modelOptions}
                    value={selectedOption}
                    onChange={(option) => setSelectedModel(option.value)}
                    placeholder="Select a model"
                    isSearchable
                    isDisabled={saving}
                />

                <button onClick={handleSave} disabled={saving} className="settings-button">
                    {saving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}