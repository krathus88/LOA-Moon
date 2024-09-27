import { InfoIcon } from "@components/Common/Icons/InfoIcon";
import { TableDamage } from "@components/Encounter/TableDamage/TableDamage";
import { TablePartyBuffs } from "@components/Encounter/TablePartyBuffs/TablePartyBuffs";
import { EncounterTableType, EncounterType } from "@type/EncounterType";
import { groupPlayersByParty } from "@utils/functions";
import { useMemo } from "react";

type TableWrapperProps = {
    activeTable: EncounterTableType;
    encounterData: EncounterType;
    isPartyView: boolean;
};

export function TablesContainer({
    activeTable,
    encounterData,
    isPartyView,
}: TableWrapperProps) {
    // Calculate groupedPlayers only when the view is toggled or when activeTable changes
    const groupedPlayers = useMemo(() => {
        if (isPartyView || activeTable === "partyBuffs") {
            return groupPlayersByParty(encounterData.player_data); // Group players by party
        }
        return {}; // Return an empty object if the conditions are not met
    }, [isPartyView, activeTable, encounterData.player_data]);

    return (
        <div className="tables-container">
            {activeTable === "damage" &&
                (isPartyView ? (
                    Object.entries(groupedPlayers).map(([partyNum, players]) => (
                        <div className="table-wrapper" key={partyNum}>
                            <TableDamage playersData={players} />
                        </div>
                    ))
                ) : (
                    <div className="table-wrapper">
                        <TableDamage playersData={encounterData.player_data} />
                    </div>
                ))}
            {activeTable === "partyBuffs" && (
                <>
                    <div className="ms-2 fw-light">
                        <InfoIcon />
                        <small>
                            &nbsp;Feature is still in beta stages. If you notice any
                            errors, please report it on our{" "}
                            <a href="https://discord.gg/dVNBVNJUh5" target="_blank">
                                Discord
                            </a>
                            .
                        </small>
                    </div>
                    {Object.entries(groupedPlayers).map(([partyNum, players]) => (
                        <div className="table-wrapper" key={partyNum}>
                            <TablePartyBuffs
                                partyNum={parseInt(partyNum)}
                                synergyData={
                                    encounterData.synergy_data[parseInt(partyNum)]
                                }
                                playersData={players}
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
