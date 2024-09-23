import { ClearTimeIcon } from "@components/Common/Icons/ClearTimeIcon";
import { Button } from "@mui/material";
import { EncounterTableType } from "@type/EncounterType";

type TableControllersProps = {
    clearTime: string;
    totalDmg: string;
    totalDps: string;
    onChange: (tableType: EncounterTableType) => void;
};

export function TableControllers({
    clearTime,
    totalDmg,
    totalDps,
    onChange,
}: TableControllersProps) {
    return (
        <div id="TableControllers">
            <div className="d-flex ">
                <div className="d-flex align-items-center">
                    <ClearTimeIcon />
                    &nbsp;{clearTime}
                </div>
                <div>
                    <span className="fw-light">Total DMG:</span> {totalDmg}
                </div>
                <div>
                    <span className="fw-light">Total DPS:</span> {totalDps}
                </div>
            </div>
            <div className="d-flex">
                <Button variant="contained" onClick={() => onChange("damage")}>
                    Damage
                </Button>
                <Button variant="contained" onClick={() => onChange("partyBuffs")}>
                    Party Buffs
                </Button>
                <Button variant="contained" onClick={() => onChange("selfBuffs")}>
                    Self Buffs
                </Button>
                <Button variant="contained" onClick={() => onChange("shields")}>
                    Shields
                </Button>
            </div>
        </div>
    );
}
