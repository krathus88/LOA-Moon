import { RowDamage } from "../TableDamage/RowDamage";

export function TableSelfBuffs() {
    return (
        <table id="TableSelfBuffs" className="table">
            <thead>
                <tr>
                    <th className="col-5 ps-3"> Players</th>
                    <th className="col-1 text-center">Dead</th>
                    <th className="col-1 text-center">DMG</th>
                    <th className="col-1 text-center">DPS</th>
                    <th className="col-1 text-center">D%</th>
                    <th className="col-1 text-center">CRIT</th>
                    <th className="col-1 text-center">F.A</th>
                    <th className="col-1 text-center">B.A</th>
                </tr>
            </thead>
            <tbody>
                <RowDamage
                    iconId={101}
                    Type={"dps"}
                    DpsPercentage={25}
                    PlayerClass={"Rogue"}
                    PlayerName={"Zeezee"}
                    Dead={""}
                    Damage={"234k"}
                    DPS={"12k"}
                    DamageShare={12}
                    CritRate={26.3}
                    FrontAttack={30.1}
                    BackAttack={45.9}
                />
                <RowDamage
                    iconId={101}
                    Type={"dps"}
                    DpsPercentage={40}
                    PlayerClass={"Rogue"}
                    PlayerName={"Zeezee"}
                    Dead={""}
                    Damage={"234k"}
                    DPS={"12k"}
                    DamageShare={12}
                    CritRate={26.3}
                    FrontAttack={30.1}
                    BackAttack={45.9}
                />
                <RowDamage
                    iconId={101}
                    Type={"supp"}
                    DpsPercentage={60}
                    PlayerClass={"Rogue"}
                    PlayerName={"Zeezee"}
                    Dead={""}
                    Damage={"234k"}
                    DPS={"12k"}
                    DamageShare={12}
                    CritRate={26.3}
                    FrontAttack={30.1}
                    BackAttack={45.9}
                />
            </tbody>
        </table>
    );
}
