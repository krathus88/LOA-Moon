import { CardsDataType } from "@type/EncounterType";
import { RowArcanaCards } from "./RowArcanaCards";

type TableArcanaCardsProps = {
    cardData: CardsDataType[];
};

export function TableArcanaCards({ cardData }: TableArcanaCardsProps) {
    return (
        <div className="table-arcana-cards-container rounded shadow">
            <table id="TableArcanaCards">
                <colgroup>
                    <col style={{ minWidth: "175px" }}></col>
                    <col width="75"></col>
                    <col width="75"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th className="ps-3">Card Name</th>
                        <th className="text-center">Draws</th>
                        <th className="text-center">Draw %</th>
                    </tr>
                </thead>
                <tbody>
                    {cardData.map((card, index) => (
                        <RowArcanaCards key={index} card={card} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
