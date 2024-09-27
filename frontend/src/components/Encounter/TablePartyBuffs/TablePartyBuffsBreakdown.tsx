import { EncounterSynergyDataType, PlayerSkillDataType } from "@type/EncounterType";
import { RowHeaderPartyBuffsBreakdown } from "./RowHeaderPartyBuffsBreakdown";
import { RowPartyBuffsBreakdown } from "./RowPartyBuffsBreakdown";

type TablePartyBuffsBreakdownProps = {
    skillData: PlayerSkillDataType[];
    synergyData: EncounterSynergyDataType[];
    partyNum: number;
};

export function TablePartyBuffsBreakdown({
    skillData,
    synergyData,
    partyNum,
}: TablePartyBuffsBreakdownProps) {
    return (
        <div className="table-damage-breakdown-container rounded shadow">
            <table id="TableDamageBreakdown">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    {synergyData.map((_, index) => (
                        <col width="70" key={index}></col>
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3">Skill Name</th>
                        {synergyData.map((synergy, index) => (
                            <RowHeaderPartyBuffsBreakdown
                                key={index}
                                keyValue={`p${partyNum}-${index}`}
                                synergy={synergy}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {skillData.map((skill, index) => (
                        <RowPartyBuffsBreakdown key={index} skill={skill} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
