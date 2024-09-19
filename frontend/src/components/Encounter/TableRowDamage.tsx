import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";

type TableRowProps = {
    iconId: number;
    Type: string;
    DpsPercentage: number;
    PlayerClass: string;
    PlayerName: string;
    Dead: string;
    Damage: string;
    DPS: string;
    DamageShare: number;
    CritRate: number;
    FrontAttack: number;
    BackAttack: number;
};

export function TableRowDamage({
    iconId,
    Type,
    DpsPercentage,
    PlayerClass,
    PlayerName,
    Dead,
    Damage,
    DPS,
    DamageShare,
    CritRate,
    FrontAttack,
    BackAttack,
}: TableRowProps) {
    let color = "#5b2128";
    if (Type === "supp") {
        color = "#184332";
    }
    return (
        <tr
            style={{
                borderColor: color,
                backgroundImage: `linear-gradient(to right, ${color} ${DpsPercentage}%,  transparent ${
                    DpsPercentage + 5
                }%`,
            }}>
            <td>
                <img src={MAP_TO_IMAGE_CLASSES[iconId]} alt={`Icon ${iconId}`} />
                {PlayerClass} - {PlayerName}
            </td>
            <td>{Dead}</td>
            <td>{Damage}</td>
            <td>{DPS}</td>
            <td>{DamageShare}%</td>
            <td>{CritRate}%</td>
            <td>{FrontAttack}%</td>
            <td>{BackAttack}%</td>
        </tr>
    );
}
