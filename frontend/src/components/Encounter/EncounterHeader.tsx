import { useNavigate } from "react-router-dom";

type HeaderProps = {
    encounterId: number;
    encounterTitle: string;
    timestamp: string;
};

export function EncounterHeader({ encounterTitle, timestamp }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div
            id="EncounterHeader"
            className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center encounter-info">
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate(-1)}>
                    &lt;- Back
                </button>
                <h4 className="">{encounterTitle}</h4>
            </div>
            <div className="ms-auto">{timestamp}</div>
        </div>
    );
}
