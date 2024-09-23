import { PlayerSkillDataType } from "@type/EncounterType";

type RowDamageBreakdownProps = {
    skill: PlayerSkillDataType;
};

export function RowDamageBreakdown({ skill }: RowDamageBreakdownProps) {
    return (
        <tr className="fw-light">
            <td></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
            <td className="text-center"></td>
        </tr>
    );
}
