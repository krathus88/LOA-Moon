import { api } from "@config/axios";
import { Button, CircularProgress } from "@mui/material";
import { User, UserCharacters } from "@type/CharactersType";
import { getCsrfToken } from "@utils/functions";
import { useEffect, useState } from "react";
import { CharacterRow } from "./CharacterRow";

type CharacterManagerProps = {
    characters: UserCharacters[];
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export function CharacterManager({ characters, setUser }: CharacterManagerProps) {
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [modifiedCharacters, setModifiedCharacters] = useState(
        characters.map((char) => ({ ...char, markedForDeletion: false }))
    );

    // Sync modifiedCharacters state with characters prop
    useEffect(() => {
        setModifiedCharacters(
            characters.map((char) => ({ ...char, markedForDeletion: false }))
        );
    }, [characters]);

    // Handler to update character changes
    const handleUpdateCharacter = (
        index: number,
        updatedCharacter: Partial<UserCharacters> & { markedForDeletion?: boolean }
    ) => {
        setModifiedCharacters((prevCharacters) => {
            const updatedCharacters = [...prevCharacters];
            updatedCharacters[index] = {
                ...updatedCharacters[index],
                ...updatedCharacter,
            };
            return updatedCharacters;
        });
    };

    // Handler for saving data to the backend
    const handleSave = async () => {
        setLoading(true);
        setSaveStatus("idle");
        setButtonDisabled(true);

        // Filter and map out only the relevant fields for the backend
        const payload = modifiedCharacters.map(({ markedForDeletion, ...char }) => ({
            ...char,
            markedForDeletion,
        }));

        try {
            const csrfToken = await getCsrfToken();

            const response = await api.put(
                "/user/characters/",
                {
                    characters: payload,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );

            const { characters: updatedCharacters } = response.data;
            setUser((prevUser) =>
                prevUser ? { ...prevUser, characters: updatedCharacters } : null
            );
            setSaveStatus("success");
        } catch {
            setSaveStatus("error");
            console.error("Error occurred while saving data.");
        } finally {
            setLoading(false);

            setTimeout(() => {
                setSaveStatus("idle");
                setButtonDisabled(false);
            }, 3000);
        }
    };

    return (
        <div className="mb-5" id="CharacterManager">
            <h5>Character Manager</h5>
            <div className="rounded shadow">
                <table>
                    <colgroup>
                        <col width="85"></col>
                        <col width="150"></col>
                        <col width="155"></col>
                        <col width="105"></col>
                        <col width="105"></col>
                        <col width="85"></col>
                    </colgroup>
                    <thead className="text-center">
                        <tr>
                            <th className="border-end">Region</th>
                            <th className="border-end">Name</th>
                            <th className="border-end">Class</th>
                            <th className="border-end">Display Name</th>
                            <th className="border-end">Display Logs</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modifiedCharacters.map((character, index) => (
                            <CharacterRow
                                key={index}
                                character={character}
                                onUpdateCharacter={(updatedCharacter) =>
                                    handleUpdateCharacter(index, updatedCharacter)
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {characters.length > 0 && (
                <Button
                    onClick={handleSave}
                    className="ms-1 mt-2 text-center"
                    variant="contained"
                    color={saveStatus === "error" ? "error" : "success"}
                    disabled={buttonDisabled}
                    sx={{
                        "&:disabled": {
                            backgroundColor:
                                saveStatus === "error" ? "#d32f2f" : "#004d00",
                            color: "rgba(255, 255, 255, 0.6)",
                        },
                    }}>
                    {loading ? (
                        <CircularProgress color="inherit" size="1.25rem" />
                    ) : saveStatus === "success" ? (
                        "Success!"
                    ) : saveStatus === "error" ? (
                        "Error"
                    ) : (
                        "Save"
                    )}
                </Button>
            )}
        </div>
    );
}
