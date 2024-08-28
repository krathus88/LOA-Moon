export function getIcon(iconNumber: number) {
    return new URL(`../assets/classes/${iconNumber}.png`, import.meta.url).href;
}
