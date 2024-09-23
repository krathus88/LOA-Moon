import { EncounterPlayerDataType } from "@type/EncounterType";
import { getPlayerType } from "@utils/functions";
import { RowDamage } from "./RowDamage";

type TableDamageProps = {
    playersData: EncounterPlayerDataType[];
};

export function TableDamage({ playersData }: TableDamageProps) {
    const hasDeathCount = playersData.some((player) => player.death_count > 1);

    return (
        <div className="table-damage-container rounded shadow">
            <table id="TableDamage">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    <col width="60"></col>
                    {hasDeathCount && <col width="60"></col>}
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="60"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3"> Players</th>
                        <th className="text-center">DT</th>
                        {hasDeathCount && <th className="text-center">DC</th>}
                        <th className="text-center">DMG</th>
                        <th className="text-center">DPS</th>
                        <th className="text-center">DMG%</th>
                        <th className="text-center">CRIT%</th>
                        <th className="text-center">F.A%</th>
                        <th className="text-center">B.A%</th>
                        <th className="text-center">Cntr</th>
                    </tr>
                </thead>
                <tbody>
                    {playersData.map((player, index) => (
                        <RowDamage
                            key={`${player.party_num}-${index}`}
                            hasDeathCount={hasDeathCount}
                            type={getPlayerType(player.class_id)} // Assuming all players have type "supp". Adjust if necessary.
                            playerData={player}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
