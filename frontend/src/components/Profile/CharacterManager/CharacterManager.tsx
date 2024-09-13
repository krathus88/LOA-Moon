import { UserCharacters } from "@type/CharactersType";
import { CharacterRow } from "./CharacterRow";

type CharacterManagerProps = {
    characters: UserCharacters[];
};

export function CharacterManager({ characters }: CharacterManagerProps) {
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
                        {characters.map((character, index) => (
                            <CharacterRow
                                key={index} // or use a unique identifier like character.name if it's unique
                                region={character.region}
                                name={character.name}
                                class_id={character.class_id}
                                display_name={character.display_name}
                                display_logs={character.display_logs}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="ms-1 mt-2 btn btn-success">Save</button>
        </div>
    );
}
