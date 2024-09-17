export type UserCharacters = {
    region: string;
    name: string;
    class_id: number;
    display_name: boolean;
};

export type User = {
    name: string;
    avatar: string;
    characters: UserCharacters[];
};
