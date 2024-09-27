import { EncounterPlayerDataType } from "@type/EncounterType";
import { getPlayerType } from "@utils/functions";
import { RowDamage } from "./RowDamage";
import { ItemTooltip } from "@components/Common/ItemTooltip";

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
                    <col width="75"></col>
                    <col width="75"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="60"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3">Players</th>
                        <th className="text-center th-dead-time">DT</th>
                        {hasDeathCount && (
                            <th className="text-center th-deaths-count">DC</th>
                        )}
                        <th className="text-center th-dmg">DMG</th>
                        <th className="text-center th-dps">DPS</th>
                        <th className="text-center th-dmg-percent">DMG%</th>
                        <th className="text-center th-crit-percent">CRIT%</th>
                        <th className="text-center th-front-attack-percent">F.A%</th>
                        <th className="text-center th-back-attack-percent">B.A%</th>
                        <th className="text-center th-counter">Cntr</th>
                    </tr>
                </thead>
                <tbody>
                    {playersData.map((player, index) => (
                        <RowDamage
                            key={`${player.party_num}-${index}`}
                            keyValue={`p${player.party_num}-${index}`}
                            hasDeathCount={hasDeathCount}
                            type={getPlayerType(player.class_id)}
                            playerData={player}
                        />
                    ))}
                </tbody>
            </table>
            <ItemTooltip anchorTo=".th-dead-time">Dead Time</ItemTooltip>
            <ItemTooltip anchorTo=".th-deaths-count">Deaths Count</ItemTooltip>
            <ItemTooltip anchorTo=".th-dmg">Total Damage</ItemTooltip>
            <ItemTooltip anchorTo=".th-dps">Damage p/Second</ItemTooltip>
            <ItemTooltip anchorTo=".th-dmg-percent">Total Damage %</ItemTooltip>
            <ItemTooltip anchorTo=".th-crit-percent">
                Crit %<br />
                (based on damage dealt)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-front-attack-percent">
                Front Attack %<br />
                (based on damage dealt)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-back-attack-percent">
                Back Attack %<br />
                (based on damage dealt)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-counter">Counters</ItemTooltip>
        </div>
    );
}
