import { DIFFICULTY_COLOR_MAP } from "@utils/constants/encounters";

type ClassInfoProps = {
    position: number;
    instance_name: string;
    gate: string;
    difficulty: string;
    clear_time: string;
    fight_end_time: string;
};

export function ClassInfo({
    position,
    instance_name,
    gate,
    difficulty,
    clear_time,
    fight_end_time,
}: ClassInfoProps) {
    const difficultyColor =
        DIFFICULTY_COLOR_MAP.get(difficulty) || "rgb(222, 226, 230)"; // Default to white if not found

    return (
        <div className="info">
            <h5>
                <span className="rounded-3">{gate}</span>
                {instance_name}
                <small className="fw-light" style={{ color: difficultyColor }}>
                    &nbsp;[{difficulty}]
                </small>
            </h5>
            <div className="header-bar mt-auto mb-1">
                <div>
                    <div style={{ color: "#bbffbb" }}>
                        <svg
                            width="13"
                            height="13"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="clock"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256v12.8l10.7 7.1 96 64 20 13.3 26.6-39.9-20-13.3L280 243.2V120 96H232v24z"></path>
                        </svg>{" "}
                        <small className="fw-light">{clear_time}</small>
                    </div>
                    <div style={{ color: "#97dfff" }}>
                        <svg
                            width="13"
                            height="13"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="calendar"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512">
                            <path
                                fill="currentColor"
                                d="M96 0V64H0v96H448V64H352V0H288V64H160V0H96zM448 192H0V512H448V192z"></path>
                        </svg>{" "}
                        <small className="fw-light">{fight_end_time}</small>
                    </div>
                </div>
            </div>
            <div className="position">
                <p># {position}</p>
            </div>
        </div>
    );
}
