type TableControllersProps = {
    onChange: (tableType: string) => void;
};

export function TableControllers({ onChange }: TableControllersProps) {
    return (
        <div id="ControllersContainer">
            <div className="d-flex align-items-center">
                <div className="ms-2">Time:{}</div>
                <div className="ms-2">Total DMG:{}</div>
                <div className="ms-2">Total DPS:{}</div>
            </div>
            <div className="d-flex ms-auto gap-2">
                <div
                    className="btn btn-secondary button-controller"
                    onClick={() => onChange("damage")}>
                    Damage
                </div>
                <div
                    className="btn btn-secondary button-controller"
                    onClick={() => onChange("partyBuffs")}>
                    Party Buffs
                </div>
                <div
                    className="btn btn-secondary button-controller"
                    onClick={() => onChange("selfBuffs")}>
                    Self Buffs
                </div>
                <div
                    className="btn btn-secondary button-controller"
                    onClick={() => onChange("shields")}>
                    Shields
                </div>
            </div>
        </div>
    );
}
