import { CharacterRow } from "./CharacterRow";

export function CharacterManager() {
    return (
        <div className="mb-5" id="CharacterManager">
            <h5>Character Manager</h5>
            <div className="rounded shadow">
                <table>
                    <colgroup>
                        <col width="85"></col>
                        <col width="150"></col>
                        <col width="125"></col>
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
                        <CharacterRow />
                        <CharacterRow />
                        <CharacterRow />
                        <CharacterRow />
                        <CharacterRow />
                        <CharacterRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
