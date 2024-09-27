import { Loading } from "@components/Common/Loading";
import "@components/Encounter/Encounter.css";
import { EncounterInfo } from "@components/Encounter/EncounterInfo";
import { TableControllers } from "@components/Encounter/TableControllers";
import { TablesContainer } from "@components/Encounter/TablesContainer";
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
    const [isPartyView, setIsPartyView] = useState(false); // Toggle between "party view" and "all players view"
    const [hasFailed, setHasFailed] = useState(false);

    // Refreshing Page or navigating to page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.get(`/encounter/id/${encounter_id}`);
                const fetchedData = result.data;

                setEncounterData(fetchedData);
            } catch {
                setHasFailed(true);
            }
        };

        fetchData();
    }, [location.search, encounter_id]);

    // Handle the table change
    const handleTableChange = (tableType: EncounterTableType) => {
        setActiveTable(tableType);
    };

    // Toggle between the views
    const toggleView = () => {
        setIsPartyView((prevView) => !prevView);
    };

    return (
        <main id="EncounterPage">
            <div className="container-xl container-fluid-md my-3">
                {hasFailed ? (
                    <div className="text-center mt-5">
                        <p>Something went wrong. Please try again later. </p>
                    </div>
                ) : encounterData ? (
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
                            numParties={encounterData.num_parties}
                            activeTable={activeTable}
                            isPartyView={isPartyView}
                            onChange={handleTableChange}
                            toggleView={toggleView}
                        />
                        <TablesContainer
                            activeTable={activeTable}
                            encounterData={encounterData}
                            isPartyView={isPartyView}
                        />
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        </main>
    );
}

Component.displayName = "EncounterPage";
