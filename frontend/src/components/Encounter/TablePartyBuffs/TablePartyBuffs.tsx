import { EncounterPlayerDataType, EncounterSynergyDataType } from "@type/EncounterType";
import { getPlayerType } from "@utils/functions";
import { RowHeaderPartyBuffs } from "./RowHeaderPartyBuffs";
import { RowPartyBuffs } from "./RowPartyBuffs";

type TablePartyBuffsProps = {
    partyNum: number;
    synergyData: EncounterSynergyDataType[];
    playersData: EncounterPlayerDataType[];
};

export function TablePartyBuffs({
    partyNum,
    synergyData,
    playersData,
}: TablePartyBuffsProps) {
    return (
        <div className="table-party-buffs-container rounded shadow">
            <table id="TablePartyBuffs">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    {synergyData.map((_, index) => (
                        <col width="70" key={index}></col>
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3">Players</th>
                        {synergyData.map((synergy, index) => (
                            <RowHeaderPartyBuffs
                                key={index}
                                keyValue={`p${partyNum}-${index}`}
                                synergy={synergy}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {playersData.map((player, index) => (
                        <RowPartyBuffs
                            key={index}
                            keyValue={`p${player.party_num}-${index}`}
                            type={getPlayerType(player.class_id)}
                            playerData={player}
                            synergyData={synergyData}
                            partyNum={partyNum}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
