// src/App.jsx
import React, { useEffect, useState } from "react";
import AddNote from "./AddNotes";
import NoteList from "./NoteList";
import { databases } from "./appwriteConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DATABASE_ID = "6872980900000a72bcbc";
const COLLECTION_ID = "687298f3003cfcf48336";

const App = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setNotes(response.documents);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <AddNote onNoteAdded={fetchNotes} />
      <NoteList notes={notes} onDeleteOrUpdate={fetchNotes} />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
