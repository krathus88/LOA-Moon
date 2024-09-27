import { ClearTimeIcon } from "@components/Common/Icons/ClearTimeIcon";
import { Button } from "@mui/material";
import { EncounterTableType } from "@type/EncounterType";

type TableControllersProps = {
    clearTime: string;
    totalDmg: string;
    totalDps: string;
    numParties: number;
    activeTable: EncounterTableType;
    isPartyView: boolean;
    onChange: (tableType: EncounterTableType) => void;
    toggleView: () => void;
};

export function TableControllers({
    clearTime,
    totalDmg,
    totalDps,
    numParties,
    activeTable,
    isPartyView,
    onChange,
    toggleView,
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
                {numParties > 1 && activeTable === "damage" && (
                    <div className="view-toggle-container">
                        <Button variant="contained" onClick={toggleView}>
                            {isPartyView ? "Players View" : "Party View"}
                        </Button>
                    </div>
                )}
                <div className="contents-container">
                    <Button variant="contained" onClick={() => onChange("damage")}>
                        Damage
                    </Button>
                    <Button variant="contained" onClick={() => onChange("partyBuffs")}>
                        Party Buffs
                    </Button>
                </div>
            </div>
        </div>
    );
}
