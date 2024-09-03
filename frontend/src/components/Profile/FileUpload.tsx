import React, { useState, useRef } from "react";
import { api } from "@config/axios";
import { getCsrfToken } from "@utils/functions";

type FileUploadProps = {
    accessToken: string;
};

export function FileUpload({ accessToken }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const isUploadButtonClicked = useRef(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const isDbFile = selectedFile.name.endsWith(".db");
            if (isDbFile) {
                setFile(selectedFile);
                setFileName(selectedFile.name);
            } else {
                alert("Please upload a valid .db file");
                event.target.value = "";
                setFile(null);
                setFileName("");
            }
        }
    };

    const uploadToBackend = async () => {
        if (file) {
            isUploadButtonClicked.current = true;

            try {
                const csrfToken = await getCsrfToken();

                const formData = new FormData();
                formData.append("file", file);

                await api.post("/api/log/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRFToken": csrfToken,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                alert("File uploaded successfully!");
                setFile(null);
                setFileName("");
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload file.");
            } finally {
                isUploadButtonClicked.current = true;
            }
        } else {
            alert("No file selected.");
        }
    };

    return (
        <div className="file-upload mt-5">
            <div className="bg-secondary p-3 rounded-3 mb-4" style={{ width: "400px" }}>
                <h5>Instructions to Upload</h5>
                <ol className="mb-0">
                    <li>Generate Token</li>
                    <li>Select .db File (with your in game database)</li>
                    <li>Upload File to DB</li>
                </ol>
            </div>

            <input
                type="file"
                accept=".db"
                onChange={handleFileChange}
                id="fileInput"
                style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="btn btn-primary">
                Select .db File
            </label>
            {fileName && (
                <>
                    <p>Selected file: {fileName}</p>
                    {accessToken && (
                        <button
                            className="btn btn-success mt-3"
                            onClick={uploadToBackend}
                            disabled={isUploadButtonClicked.current}>
                            Upload to DB
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
