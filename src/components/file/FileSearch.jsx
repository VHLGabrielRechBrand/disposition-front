import './FileSearch.css';
import React, { useEffect, useState } from 'react';
import CustomSelect from '../ui/CustomSelect.jsx';
import CompactFileGrid from './CompactFileGrid.jsx';
import useCollections from '../../hooks/useCollections.js';
import useDocuments from '../../hooks/useDocuments.js';
import { deleteDocument, tagDocument, listAllTags } from '../../service/FileService.js';
import { formatCollectionName } from '../../utils/utils.js';
import FileDetails from "./FileDetails.jsx";
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'sonner';

export default function FileSearch() {
    const { collections, selectedCollection, setSelectedCollection } = useCollections();
    const docs = useDocuments(selectedCollection);
    const [documents, setDocuments] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [confirmingDelete, setConfirmingDelete] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);

    useEffect(() => {
        setDocuments(docs);
    }, [docs]);

    useEffect(() => {
        setSelectedFile(null);
        setSelectedTags([]);
    }, [selectedCollection]);

    useEffect(() => {
        listAllTags()
            .then(data => {
                if (data?.tags) {
                    setTagOptions(data.tags.map(tag => ({ value: tag, label: tag })));
                }
            })
            .catch(() => {
                toast.error("Failed to load tags");
            });
    }, [selectedCollection]);

    const filteredDocuments = selectedTags.length
        ? documents.filter(doc =>
            selectedTags.every(tag =>
                (doc.tags || []).includes(tag.value)
            )
        )
        : documents;

    const handleTag = (file) => {
        const tag = prompt(`Enter a tag for "${file.name}"`);
        if (tag && tag.trim()) {
            tagDocument(selectedCollection, file.id, tag.trim())
                .then(() => {
                    toast.success(`Tag "${tag}" added to "${file.name}"`);
                })
                .catch(() => {
                    toast.error(`Failed to tag "${file.name}"`);
                });
        }
    };

    const handleClick = (file) => setSelectedFile(file);

    const handleRemove = () => {
        if (!confirmingDelete) return;

        const updatedDocuments = documents.filter(doc => doc.id !== confirmingDelete.id);
        setDocuments(updatedDocuments);

        deleteDocument(selectedCollection, confirmingDelete.id)
            .then(() => {
                toast.success(`File "${confirmingDelete.name}" removed`);
            })
            .catch(() => {
                toast.error(`Failed to remove "${confirmingDelete.name}"`);
                setDocuments(prev => [...prev, confirmingDelete]);
            });

        setConfirmingDelete(null);
    };

    const collectionOptions = collections.map(name => ({
        value: name,
        label: formatCollectionName(name),
    }));

    const selectedOption = collectionOptions.find(opt => opt.value === selectedCollection);

    return (
        <div className="file-search">
            <div className="file-search-sidebar">
                <CustomSelect
                    options={collectionOptions}
                    value={selectedOption}
                    onChange={(option) => setSelectedCollection(option.value)}
                    placeholder="Select a collection"
                    isSearchable
                />

                <CustomSelect
                    className="mt-2"
                    isMulti
                    options={tagOptions}
                    value={selectedTags}
                    onChange={setSelectedTags}
                    placeholder="Filter by tags..."
                />

                <CompactFileGrid
                    className="mt-2"
                    documents={filteredDocuments}
                    onAccess={handleClick}
                    onRemove={(file) => setConfirmingDelete(file)}
                    onTag={handleTag}
                />
            </div>

            {selectedFile && (
                <div className="file-search-details">
                    <FileDetails collection={selectedCollection} id={selectedFile.id} />
                </div>
            )}

            <Dialog.Root open={!!confirmingDelete} onOpenChange={(open) => !open && setConfirmingDelete(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog-overlay" />
                    <Dialog.Content className="dialog-content">
                        <Dialog.Title className="dialog-title">Confirm deletion</Dialog.Title>
                        <Dialog.Description className="dialog-description">
                            Are you sure you want to delete <strong>{confirmingDelete?.name}</strong>?
                        </Dialog.Description>
                        <div className="dialog-buttons">
                            <button onClick={handleRemove}>Yes, delete</button>
                            <Dialog.Close asChild>
                                <button>Cancel</button>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}