import { PlayerSkillDataType } from "@type/EncounterType";
import { RowDamageBreakdown } from "./RowDamageBreakdown";

type TableDamageBreakdownProps = {
    skillData: PlayerSkillDataType[];
};

export function TableDamageBreakdown({ skillData }: TableDamageBreakdownProps) {
    return (
        <div className="table-damage-container rounded shadow">
            <table id="TableDamage">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                    <col width="70"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3"> Skill Name</th>
                        <th className="text-center">DMG</th>
                        <th className="text-center">DPS</th>
                        <th className="text-center">DMG%</th>
                        <th className="text-center">CRIT%</th>
                        <th className="text-center">F.A%</th>
                        <th className="text-center">B.A%</th>
                        <th className="text-center">Casts</th>
                        <th className="text-center">CPM</th>
                    </tr>
                </thead>
                <tbody>
                    {skillData.map((skill, index) => (
                        <RowDamageBreakdown key={index} skill={skill} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
