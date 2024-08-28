export function getIcon(iconNumber: number) {
    return new URL(`../assets/classes/${iconNumber}.png`, import.meta.url).href;
}

export function getRaidWallpaper(raidName: string) {
    return new URL(`../assets/raids/${raidName}.webp`, import.meta.url).href;
}
