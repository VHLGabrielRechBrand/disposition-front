import './FileSearch.css';
import React, { useEffect, useState } from 'react';
import CustomSelect from '../ui/CustomSelect.jsx';
import CompactFileGrid from './CompactFileGrid.jsx';
import useCollections from '../../hooks/useCollections.js';
import useDocuments from '../../hooks/useDocuments.js';
import { deleteDocument, tagDocument } from '../../service/FileService.js';
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

    useEffect(() => {
        setDocuments(docs);
    }, [docs]);

    useEffect(() => {
        setSelectedFile(null);
    }, [selectedCollection]);

    const handleTag = (file) => {
        const tag = prompt(`Enter a tag for "${file.name}"`);
        if (tag && tag.trim()) {
            tagDocument(selectedCollection, file.id, tag.trim())
                .then(() => {
                    toast.success(`Tag "${tag}" added to "${file.name}"`);
                })
                .catch((err) => {
                    toast.error(`Failed to tag "${file.name}"`);
                });
        }
    };

    const handleClick = (file) => {
        setSelectedFile(file);
    };

    const handleRemove = () => {
        if (!confirmingDelete) return;

        const updatedDocuments = documents.filter(doc => doc.id !== confirmingDelete.id);
        setDocuments(updatedDocuments);

        deleteDocument(selectedCollection, confirmingDelete.id)
            .then(() => {
                toast.success(`File "${confirmingDelete.name}" removed`);
            })
            .catch(err => {
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
                <div className="collection-select-wrapper">
                    <CustomSelect
                        options={collectionOptions}
                        value={selectedOption}
                        onChange={(option) => setSelectedCollection(option.value)}
                        placeholder="Select a collection"
                        isSearchable
                    />
                </div>

                <CompactFileGrid
                    documents={documents}
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