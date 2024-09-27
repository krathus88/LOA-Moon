export function PartyBackground() {
    return (
        <svg aria-hidden="true">
            <defs>
                <radialGradient id="hoverBerserker" cy="100%">
                    <stop offset="0%" stopColor="rgba(109, 95, 86, 0.32)"></stop>
                    <stop offset="53.95%" stopColor="rgba(109, 95, 86, 0.12)"></stop>
                    <stop offset="100%" stopColor="rgba(10, 14, 23, 0)"></stop>
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hoverBerserker)"></rect>
        </svg>
    );
}
