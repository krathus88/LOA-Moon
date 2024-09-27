export function LatestBackground() {
    return (
        <svg aria-hidden="true">
            <defs>
                <radialGradient id="hoverAegir" cy="100%">
                    <stop offset="0%" stopColor="rgba(132, 37, 35, 0.32)"></stop>
                    <stop offset="53.95%" stopColor="rgba(132, 37, 35, 0.12)"></stop>
                    <stop offset="100%" stopColor="rgba(10, 14, 23, 0)"></stop>
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hoverAegir)"></rect>
        </svg>
    );
}
