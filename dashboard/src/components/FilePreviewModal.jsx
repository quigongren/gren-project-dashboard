// src/components/FilePreviewModal.jsx
import React from "react";

export default function FilePreviewModal({ filePath, onClose }) {
  if (!filePath) return null;

  const fileName = filePath.split("/").pop();
  const fileType = fileName.split(".").pop().toLowerCase();
  const previewText = `This is a preview placeholder for ${fileName} (${fileType})`;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 max-w-lg w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">File Preview</h2>
        <div className="text-gray-700 text-sm whitespace-pre-wrap">
          {previewText}
        </div>
      </div>
    </div>
  );
}
