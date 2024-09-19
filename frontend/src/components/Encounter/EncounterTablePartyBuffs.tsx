import { TableRowDamage } from "@components/Encounter/TableRowDamage";

export function EncounterTablePartyBuffs() {
    return (
        <table id="EncounterTable" className="table">
            <thead>
                <tr>
                    <th className="col-5"> Partyx</th>
                    <th className="col-1">XD</th>
                    <th className="col-1">DMG</th>
                    <th className="col-1">DPS</th>
                    <th className="col-1">D%</th>
                    <th className="col-1">CRIT</th>
                    <th className="col-1">F.A</th>
                    <th className="col-1">B.A</th>
                </tr>
            </thead>
            <tbody>
                <TableRowDamage
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
                <TableRowDamage
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
                <TableRowDamage
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
