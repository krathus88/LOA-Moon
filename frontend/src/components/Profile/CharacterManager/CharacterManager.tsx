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
        characters.map((char) => ({
            ...char,
            display_name_in_all_previous_logs: false,
            markedForDeletion: false,
        }))
    );

    // Sync modifiedCharacters state with characters prop
    useEffect(() => {
        const savedCharacterData = localStorage.getItem("character_data");
        const characterDataState = savedCharacterData
            ? JSON.parse(savedCharacterData)
            : {};

        setModifiedCharacters(
            characters.map((char) => ({
                ...char,
                display_name_in_all_previous_logs:
                    characterDataState[char.name]?.display_name_in_all_previous_logs ||
                    false,
                markedForDeletion: false,
            }))
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

            // Save only the display_name_in_all_previous_logs field in local storage
            if ("display_name_in_all_previous_logs" in updatedCharacter) {
                const currentCharacterData = localStorage.getItem("character_data");
                const characterDataState = currentCharacterData
                    ? JSON.parse(currentCharacterData)
                    : {};
                characterDataState[updatedCharacters[index].name] = {
                    display_name_in_all_previous_logs:
                        updatedCharacter.display_name_in_all_previous_logs,
                };
                localStorage.setItem(
                    "character_data",
                    JSON.stringify(characterDataState)
                );
            }

            return updatedCharacters;
        });
    };

    // Handler for saving data to the backend
    const handleSave = async () => {
        setLoading(true);
        setSaveStatus("idle");
        setButtonDisabled(true);

        // Filter and map out only the relevant fields for the backend
        const payload = modifiedCharacters.map(
            ({ display_name_in_all_previous_logs, markedForDeletion, ...char }) => ({
                ...char,
                display_name_in_all_previous_logs,
                markedForDeletion,
            })
        );

        // Remove characters marked for deletion from local storage
        const currentCharacterData = localStorage.getItem("character_data");
        const characterDataState = currentCharacterData
            ? JSON.parse(currentCharacterData)
            : {};

        // Remove marked for deletion characters from local storage
        modifiedCharacters.forEach((char) => {
            if (char.markedForDeletion) {
                delete characterDataState[char.name];
            }
        });

        // If no characters remain, clear the local storage entry
        if (Object.keys(characterDataState).length === 0) {
            localStorage.removeItem("character_data");
        } else {
            localStorage.setItem("character_data", JSON.stringify(characterDataState));
        }

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
                        <col width="125"></col>
                        <col width="155"></col>
                        <col width="85"></col>
                    </colgroup>
                    <thead className="text-center">
                        <tr>
                            <th className="border-end">Region</th>
                            <th className="border-end">Name</th>
                            <th className="border-end">Class</th>
                            <th className="border-end">Display Name on Log Upload</th>
                            <th className="border-end">
                                Display Name in ALL previous Logs
                            </th>
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
