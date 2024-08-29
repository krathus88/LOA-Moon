type InfoProps = {
    isHeightLarge: boolean;
    isWidthLarge: boolean;
};

export function Info({ isHeightLarge, isWidthLarge }: InfoProps) {
    return (
        <div className="info">
            <h5>[G1] Brelshaza, the Queen of Simps</h5>
            <small className="fw-light mb-1">Hard</small>
            <div className="mt-auto mb-1">
                {(isHeightLarge || !isWidthLarge) && (
                    <div>
                        <ul>
                            <li>
                                <svg
                                    version="1.1"
                                    id="_x32_"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
                                    fill="#fff"
                                    viewBox="0 0 512 512">
                                    <style type="text/css"></style>
                                    <g>
                                        <path
                                            className="st0"
                                            d="M256,0L256,0C88.266,0,2.063,134.656,2.063,274.906c0,52.594,11.484,95.813,37.281,121.141
		c34.094,33.484,74.25,30.078,78.281,33.641c0,0,0,35.391,0,58.922v9.203c0,7.844,6.344,14.188,14.188,14.188h34.047
		c7.828,0,14.172-6.344,14.172-14.188v-43.219c3.313-1.906,6.344,0.313,9.063-1.094c0,0.125-0.031,0.219-0.031,0.328v43.984
		c0,7.844,6.344,14.188,14.188,14.188h34.047c7.844,0,14.203-6.344,14.203-14.188v-43.984c0-1.422-0.281-2.766-0.688-4.078H256
		h5.188c-0.406,1.313-0.688,2.656-0.688,4.078v43.984c0,7.844,6.359,14.188,14.203,14.188h34.047
		c7.844,0,14.188-6.344,14.188-14.188v-43.984c0-0.109-0.031-0.203-0.031-0.328c2.703,1.406,5.75-0.813,9.063,1.094v43.219
		c0,7.844,6.344,14.188,14.156,14.188h34.063c7.844,0,14.188-6.344,14.188-14.188v-9.203c0-23.531,0-58.922,0-58.922
		c4.031-3.563,44.172-0.156,78.281-33.641c25.797-25.328,37.281-68.547,37.281-121.141C509.938,134.656,423.734,0,256,0z
		 M147.672,339.281c-34.109,0-61.734-27.641-61.734-61.734v-13.984c0-34.094,27.625-61.719,61.734-61.719
		c34.078,0,61.734,27.625,61.734,61.719v13.984C209.406,311.641,181.75,339.281,147.672,339.281z M256,397h-48.922L256,334.313
		L304.922,397H256z M426.063,277.547c0,34.094-27.641,61.734-61.734,61.734s-61.734-27.641-61.734-61.734v-13.984
		c0-34.094,27.641-61.719,61.734-61.719s61.734,27.625,61.734,61.719V277.547z"
                                        />
                                    </g>
                                </svg>{" "}
                                <small className="fw-light">Death Count</small>
                            </li>
                            <li>
                                <svg
                                    width="13"
                                    height="13"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M0 0h512v512H0z"
                                        fill="#000"
                                        fillOpacity="1"></path>
                                    <g className="" transform="translate(0,0)">
                                        <path
                                            d="M156.7 25.83L89 39.38c-.1 58.57-1.74 119.32-43.49 167.22C104.4 246.5 189 260.7 247 248.8v-99L108.3 88.22l7.4-16.44L256 134.2l140.3-62.42 7.4 16.44L265 149.8v99c58 11.9 142.6-2.3 201.5-42.2-41.8-47.9-43.4-108.65-43.5-167.22l-67.7-13.55c-12.9 13.88-20.6 28.15-32.9 40.53C308.9 79.78 289.5 89 256 89c-33.5 0-52.9-9.22-66.4-22.64-12.3-12.38-20-26.65-32.9-40.53zM53.88 232.9C75.96 281 96.07 336.6 102.7 392.8l65 22.8c4.2-52.7 28.2-104 63.7-146.1-55.1 6.3-122.7-5.8-177.52-36.6zm404.22 0c-54.8 30.8-122.4 42.9-177.5 36.6 35.5 42.1 59.5 93.4 63.7 146.1l65.2-22.9c6.6-56.8 26.6-111.8 48.6-159.8zM256 269c-40.5 43.1-67.7 97.9-70.7 152.7l61.7 21.6V336h18v107.3l61.7-21.6c-3.1-54.8-30.2-109.6-70.7-152.7zm151.7 143.4L297 451.1v18.8l110.2-44.1c.1-4.5.3-8.9.5-13.4zm-303.3.1c.3 4.5.4 8.9.5 13.4l110.1 44v-18.7l-110.6-38.7zM279 457.4l-23 8.1-23-8v19.6l23 9.2 23-9.2v-19.7z"
                                            fill="#fff"
                                            fillOpacity="1"></path>
                                    </g>
                                </svg>{" "}
                                <small className="fw-light">Avg ilvl</small>
                            </li>
                            <li style={{ color: "#ff9797" }}>
                                <svg
                                    width="13"
                                    height="13"
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
                                <small className="fw-light">Total Boss HP</small>
                            </li>
                        </ul>
                    </div>
                )}
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
                        <small className="fw-light">Clear Time</small>
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
                        <small className="fw-light">How long ago</small>
                    </div>
                </div>
            </div>
        </div>
    );
}
