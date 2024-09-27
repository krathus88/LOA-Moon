import { PlayerSkillDataType } from "@type/EncounterType";
import { RowDamageBreakdown } from "./RowDamageBreakdown";
import { ItemTooltip } from "@components/Common/ItemTooltip";

type TableDamageBreakdownProps = {
    skillData: PlayerSkillDataType[];
};

export function TableDamageBreakdown({ skillData }: TableDamageBreakdownProps) {
    return (
        <div className="table-damage-breakdown-container rounded shadow">
            <table id="TableDamageBreakdown">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    <col width="75"></col>
                    <col width="75"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="60"></col>
                    <col width="60"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3">Skill Name</th>
                        <th className="text-center th-b-dmg">DMG</th>
                        <th className="text-center th-b-dps">DPS</th>
                        <th className="text-center th-b-dmg-percent">DMG%</th>
                        <th className="text-center th-b-crit-percent">CRIT%</th>
                        <th className="text-center th-b-front-attack-percent">F.A%</th>
                        <th className="text-center th-b-back-attack-percent">B.A%</th>
                        <th className="text-center th-b-casts">Casts</th>
                        <th className="text-center th-b-cpm">CPM</th>
                    </tr>
                </thead>
                <tbody>
                    {skillData.map((skill, index) => (
                        <RowDamageBreakdown key={index} skill={skill} />
                    ))}
                </tbody>
            </table>
            <ItemTooltip anchorTo=".th-b-dmg">Total Damage</ItemTooltip>
            <ItemTooltip anchorTo=".th-b-dps">Damage p/Second</ItemTooltip>
            <ItemTooltip anchorTo=".th-b-dmg-percent">Total Damage %</ItemTooltip>
            <ItemTooltip anchorTo=".th-b-crit-percent">
                Crit %<br />
                (based on hits)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-b-front-attack-percent">
                Front Attack %<br />
                (based on hits)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-b-back-attack-percent">
                Back Attack %<br />
                (based on hits)
            </ItemTooltip>
            <ItemTooltip anchorTo=".th-b-casts">Total Casts</ItemTooltip>
            <ItemTooltip anchorTo=".th-b-cpm" place="top-start">
                Casts p/min
            </ItemTooltip>
        </div>
    );
}
