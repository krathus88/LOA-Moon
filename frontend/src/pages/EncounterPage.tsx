import { useState } from "react";
import "@components/Encounter/Encounter.css";
import { EncounterHeader } from "@components/Encounter/EncounterHeader";
import { EncounterTableDamage } from "@components/Encounter/EncounterTableDamage";
import { EncounterTablePartyBuffs } from "@components/Encounter/EncounterTablePartyBuffs";
import { EncounterTableSelfBuffs } from "@components/Encounter/EncounterTableSelfBuffs";
import { EncounterTableShields } from "@components/Encounter/EncounterTableShields";
import { TableControllers } from "@components/Encounter/TableControllers";

/* import { fetchData } from "@utils/functions";
import type { LoaderFunctionArgs } from "react-router-dom"; */

async function loader() {
    return "yes";
}

export function Component() {
    // State to track the active table view
    const [activeTable, setActiveTable] = useState("damage");

    // Function to handle the table change
    const handleTableChange = (tableType: string) => {
        setActiveTable(tableType); // Update the state with the selected table type
    };

    return (
        <main>
            <div className="container my-5">
                <div>
                    <EncounterHeader
                        encounterId={666}
                        encounterTitle={"[Normal] Akkan Akkan Akkan Akkan"}
                        timestamp={"10/12"}
                    />
                    <hr />
                    <TableControllers onChange={handleTableChange} />
                    {activeTable === "damage" && <EncounterTableDamage />}
                    {activeTable === "partyBuffs" && <EncounterTablePartyBuffs />}
                    {activeTable === "partyBuffs" && <EncounterTablePartyBuffs />}
                    {activeTable === "selfBuffs" && <EncounterTableSelfBuffs />}
                    {activeTable === "shields" && <EncounterTableShields />}
                </div>
            </div>
        </main>
    );
}

Component.displayName = "EncounterPage";

Component.loader = loader;
