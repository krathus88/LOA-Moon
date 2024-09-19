export const SITE_NAME = "LOA Moon";

const MAP_TO_IMAGE: Readonly<{
    classes: Readonly<Record<number, string>>;
    raids: Readonly<Record<string, string>>;
    faq: Readonly<Record<string, string>>;
    other: Readonly<Record<string, string>>;
}> = {
    classes: {
        // Warriors
        101: "https://i.postimg.cc/bwz8S43G/101.png",
        102: "https://i.postimg.cc/d0fKX3vd/102.png",
        103: "https://i.postimg.cc/mrks8CxB/103.png",
        104: "https://i.postimg.cc/4xBG6wSW/104.png",
        105: "https://i.postimg.cc/9Mqjj2Fk/105.png",
        111: "https://i.postimg.cc/mkYftS9N/111.png",
        112: "https://i.postimg.cc/4ykRf0Yx/112.png",
        // Mages
        201: "https://i.postimg.cc/DfLKj7NJ/201.png",
        202: "https://i.postimg.cc/sDzCbtFn/202.png",
        203: "https://i.postimg.cc/vHvwy3bG/203.png",
        204: "https://i.postimg.cc/wjT8jLjL/204.png",
        205: "https://i.postimg.cc/XYHMGqrh/205.png",
        // Fighters
        301: "https://i.postimg.cc/gJh1TKgF/301.png",
        302: "https://i.postimg.cc/tJH8QVc1/302.png",
        303: "https://i.postimg.cc/8Cj2hGWC/303.png",
        304: "https://i.postimg.cc/7Ldp9RMn/304.png",
        305: "https://i.postimg.cc/4ybqJxCW/305.png",
        311: "https://i.postimg.cc/dQ8zR47G/311.png",
        312: "https://i.postimg.cc/m2BKmCMJ/312.png",
        313: "https://i.postimg.cc/7Y9ddhn6/313.png",
        // Assassins
        401: "https://i.postimg.cc/MpGNSw9Y/401.png",
        402: "https://i.postimg.cc/8zn3kY3g/402.png",
        403: "https://i.postimg.cc/4370Y5k7/403.png",
        404: "https://i.postimg.cc/R0kDKH4P/404.png",
        405: "https://i.postimg.cc/qR2ZLv7p/405.png",
        // Gunners
        501: "https://i.postimg.cc/7hDtQrC0/501.png",
        502: "https://i.postimg.cc/7hVsFt7c/502.png",
        503: "https://i.postimg.cc/66Lm4qS0/503.png",
        504: "https://i.postimg.cc/yY1rmBCz/504.png",
        505: "https://i.postimg.cc/yYLpn573/505.png",
        511: "https://i.postimg.cc/t47Sc5gS/511.png",
        512: "https://i.postimg.cc/T3S7vDLR/512.png",
        // Specialists
        601: "https://i.postimg.cc/mrHdLgC7/601.png",
        602: "https://i.postimg.cc/zBYxVYF6/602.png",
        603: "https://i.postimg.cc/vB73n2PB/603.png",
        604: "https://i.postimg.cc/8c1wmd3b/604.png",
    },
    raids: {
        // Legion Raids
        Valtan: "https://i.postimg.cc/PJrzwXp3/Valtan.webp",
        Vykas: "https://i.postimg.cc/Hxt9ncx8/Vykas.webp",
        "Kakul-Saydon": "https://i.postimg.cc/NjyDDjNZ/Kakul-Saydon.webp",
        Brelshaza: "https://i.postimg.cc/xTpgLzPK/Brelshaza.webp",
        Akkan: "https://i.postimg.cc/TY3Cy9nd/Akkan.webp",
        Thaemine: "https://i.postimg.cc/764NqMxy/Thaemine.webp",
        Echidna: "https://i.postimg.cc/yd5YFnWM/Echidna.webp",
        Behemoth: "https://i.postimg.cc/xdmDVQXs/Behemoth.webp",
        // Abyssal Dungeons
        Kayangel: "https://i.postimg.cc/cJwmq5Gm/Kayangel.webp",
        "Ivory Tower": "https://i.postimg.cc/fR6KrQpy/Ivory-Tower.webp",
        // Guardian Raids
        Achates: "https://i.postimg.cc/Y9N5jxfY/Achates.webp",
        Caliligos: "https://i.postimg.cc/YCZKP0CG/Caliligos.webp",
        Hanumatan: "https://i.postimg.cc/G210cfYb/Hanumatan.webp",
    },
    faq: {
        login: "https://i.postimg.cc/T1ZLL7mq/FAQ-Login.webp",
        profile: "https://i.postimg.cc/43BYbNV3/FAQ-Profile.webp",
        access_token: "https://i.postimg.cc/mDjKgJvJ/FAQ-Access-Token.webp",
        settings: "https://i.postimg.cc/FHPZ1mzj/FAQ-Settings.webp",
        sync: "https://i.postimg.cc/vTL7ywCx/FAQ-Sync.webp",
        encounter_logs: "https://i.postimg.cc/8z0T4Jss/FAQ-Encounter-Logs.webp",
        sync_encounter: "https://i.postimg.cc/xdNn4fb5/FAQ-Sync-Encounter.webp",
        character_manager: "https://i.postimg.cc/5ynhtTCj/FAQ-Character-Manager.webp",
    },
    other: {
        "default-avatar": "https://i.postimg.cc/WzWmmB02/default-avatar.webp",
        logo: "https://i.postimg.cc/Pf2Mkw9B/logo.png",
        wallpaper: "https://i.postimg.cc/nzQPDjfB/BG-Wallpaper.jpg",
        latest: "https://i.postimg.cc/NjWVfjmV/BG-Aegir.webp",
        latest2: "https://i.postimg.cc/C1XyddJf/BG-Echidna.webp",
        "class-rankings": "https://i.postimg.cc/wTFgvLjr/BG-Aeromancer.webp",
        "party-rankings": "https://i.postimg.cc/d0w2BMY3/BG-Berserker.webp",
    },
};

export const MAP_TO_IMAGE_CLASSES = MAP_TO_IMAGE.classes;

export const MAP_TO_IMAGE_RAIDS = MAP_TO_IMAGE.raids;

export const MAP_TO_IMAGE_FAQ = MAP_TO_IMAGE.faq;

export const MAP_TO_IMAGE_OTHER = MAP_TO_IMAGE.other;
