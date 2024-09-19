export function ClassBackground() {
    return (
        <svg aria-hidden="true">
            <defs>
                <radialGradient id="hoverAeromancer" cy="100%">
                    <stop offset="0%" stop-color="rgba(255, 192, 203, 0.32)"></stop>
                    <stop offset="53.95%" stop-color="rgba(255, 192, 203, 0.12)"></stop>
                    <stop offset="100%" stop-color="rgba(10, 14, 23, 0)"></stop>
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hoverAeromancer)"></rect>
        </svg>
    );
}
