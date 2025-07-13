// src/NoteList.jsx
import React, { useState } from "react";
import { databases } from "./appwriteConfig";
import { toast } from "react-toastify";

const DATABASE_ID = "6872980900000a72bcbc";
const COLLECTION_ID = "687298f3003cfcf48336";

const NoteList = ({ notes, onDeleteOrUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  // 🔴 Modal state
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, deleteId);
      toast.warning("Note deleted!");
      onDeleteOrUpdate();
      closeModal();
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  const handleUpdate = async (id) => {
    if (!editContent.trim()) {
      toast.error("Note content can't be empty!");
      return;
    }
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
        content: editContent,
      });
      setEditingId(null);
      setEditContent("");
      toast.success("Note updated!");
      onDeleteOrUpdate();
    } catch (error) {
      toast.error("Failed to update note.");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h2 className="text-xl font-bold text-gray-800">All Notes</h2>

        {notes.length === 0 ? (
          <p className="text-gray-500">No notes found.</p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.$id}
                className="bg-gray-100 p-4 rounded-xl shadow-sm hover:bg-gray-200 transition"
              >
                {editingId === note.$id ? (
                  <div className="space-y-2">
                    <input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(note.$id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditContent("");
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800">{note.content}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(note.$id);
                          setEditContent(note.content);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openModal(note.$id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50"  style={{ background: "#00000038" }}>
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full space-y-4 text-center">
            <h2 className="text-lg font-bold text-gray-800">Are you sure?</h2>
            <p className="text-gray-600">This action cannot be undone.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteList;
