// src/AddNote.jsx
import React, { useState } from "react";
import { databases, ID } from "./appwriteConfig";
import { toast } from "react-toastify";

const AddNote = ({ onNoteAdded }) => {
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   if (!note.trim()) {
      toast.error("Note can't be empty!");
      return;
    }

    try {
      await databases.createDocument(
        "6872980900000a72bcbc",
        "687298f3003cfcf48336",
        ID.unique(),
        { content: note }
      );
      setNote("");
      onNoteAdded(); // 🔄 Refresh note list in App.jsx
      toast.success("Note added successfully!");
    } catch (err) {
      console.error("Error:", err.message);
       toast.error("Failed to add note.");
    }
  };

  return (
  <div className="bg-white p-3 rounded-2xl shadow-lg space-y-4 text-center">
  <form onSubmit={handleSubmit} className="max-w-md mx-auto"> {/* 👈 mx-auto added */}
    <h2 className="font-bold text-gray-800">Add a Note</h2>
    <input
      type="text"
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Write your note..."
      className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
    />
    <button
      type="submit"
      className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition-all duration-200"
    >
      Add Note
    </button>
  </form>
</div>

  );
};

export default AddNote;
