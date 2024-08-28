import { Player } from "./Player";

export function RaidSummary() {
    return (
        <div className="raid-summary container my-3 py-2 border shadow rounded-3">
            <div className="info">
                <h4>Gate + Boss Name</h4>
                <small className="fw-light">Raid Name</small>
                <ul className="mt-auto">
                    <li style={{ color: "#ff9797" }}>
                        <svg
                            width="16"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fass"
                            data-icon="chart-line"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M64 64V32H0V64 448v32H32 480h32V416H480 64V64zM342.6 278.6l128-128-45.3-45.3L320 210.7l-57.4-57.4L240 130.7l-22.6 22.6-112 112 45.3 45.3L240 221.3l57.4 57.4L320 301.3l22.6-22.6z"></path>
                        </svg>{" "}
                        <span className="fw-light">Total Damage Dealt</span>
                    </li>
                    <li style={{ color: "#bbffbb" }}>
                        <svg
                            width="16"
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
                        <span className="fw-light">Clear Time</span>
                    </li>
                    <li style={{ color: "#97dfff" }}>
                        <svg
                            width="16"
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
                        <span className="fw-light">How long ago</span>
                    </li>
                </ul>
            </div>
            <div className="player-data mt-1">
                <div>
                    <h6 className="fw-light">Party 1</h6>
                    <ul>
                        <Player
                            iconId={101}
                            engraving="H"
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={48}
                            type="dps"
                        />
                        <Player
                            iconId={102}
                            engraving="RE"
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={30}
                            type="dps"
                        />
                        <Player
                            iconId={103}
                            engraving="S"
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={19}
                            type="dps"
                        />
                        <Player
                            iconId={104}
                            engraving="IDK"
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={3}
                            type="supp"
                        />
                    </ul>
                </div>
                <div>
                    <h6 className="fw-light">Party 2</h6>
                    <ul>
                        <Player
                            iconId={101}
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={48}
                            type="dps"
                        />
                        <Player
                            iconId={102}
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={30}
                            type="dps"
                        />
                        <Player
                            iconId={103}
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={19}
                            type="dps"
                        />
                        <Player
                            iconId={104}
                            name="Krathus"
                            dps="8.7M"
                            dps_percentage={3}
                            type="supp"
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}
