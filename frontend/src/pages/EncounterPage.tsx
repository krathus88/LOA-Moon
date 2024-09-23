import { Loading } from "@components/Common/Loading";
import "@components/Encounter/Encounter.css";
import { EncounterInfo } from "@components/Encounter/EncounterInfo";
import { TableControllers } from "@components/Encounter/TableControllers";
import { TableDamage } from "@components/Encounter/TableDamage/TableDamage";
import { TablePartyBuffs } from "@components/Encounter/TablePartyBuffs/TablePartyBuffs";
import { TableSelfBuffs } from "@components/Encounter/TableSelfBuffs/TableSelfBuffs";
import { TableShields } from "@components/Encounter/TableShields/TableShields";
import { api } from "@config/axios";
import { EncounterTableType, EncounterType } from "@type/EncounterType";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export function Component() {
    const { encounter_id } = useParams();
    const location = useLocation();

    // State to track the active table view
    const [activeTable, setActiveTable] = useState<EncounterTableType>("damage");
    const [encounterData, setEncounterData] = useState<EncounterType | undefined>(
        undefined
    );

    // Refreshing Page or navigating to page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get(`/encounter/id/${encounter_id}`);
                const fetchedData = result.data;

                setEncounterData(fetchedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [location.search, encounter_id]);

    // Handle the table change
    const handleTableChange = (tableType: EncounterTableType) => {
        setActiveTable(tableType);
    };

    return (
        <main id="EncounterPage">
            <div className="container-xl container-fluid-md my-4">
                {encounterData ? (
                    <div>
                        <EncounterInfo
                            difficulty={encounterData.difficulty}
                            instance_name={encounterData.instance_name}
                            gate={encounterData.gate}
                            fight_end={encounterData.fight_end}
                        />
                        <TableControllers
                            clearTime={encounterData.clear_time}
                            totalDmg={encounterData.total_damage}
                            totalDps={encounterData.total_dps}
                            onChange={handleTableChange}
                        />
                        <div className="table-wrapper">
                            {activeTable === "damage" && (
                                <TableDamage playersData={encounterData.player_data} />
                            )}
                            {activeTable === "partyBuffs" && (
                                <>
                                    <TablePartyBuffs />
                                    <TablePartyBuffs />
                                </>
                            )}
                            {activeTable === "selfBuffs" && <TableSelfBuffs />}
                            {activeTable === "shields" && <TableShields />}
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </main>
    );
}

Component.displayName = "EncounterPage";
