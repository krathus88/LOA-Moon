import { UserCharacters } from "@type/CharactersType";
import { CLASS_ID_TO_CLASS_NAME } from "@utils/constants/classes";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";
import { Button } from "@mui/material";

type CharacterRowProps = {
    character: UserCharacters & {
        display_name_in_all_previous_logs: boolean;
        markedForDeletion: boolean;
    };
    onUpdateCharacter: (
        updatedCharacter: Partial<CharacterRowProps["character"]>
    ) => void;
};

export function CharacterRow({ character, onUpdateCharacter }: CharacterRowProps) {
    const {
        region,
        name,
        class_id,
        display_name,
        display_name_in_all_previous_logs,
        markedForDeletion,
    } = character;

    return (
        <tr className={`border-top ${markedForDeletion ? "to-delete" : ""}`}>
            <td className="text-center">{region}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">
                <img src={MAP_TO_IMAGE_CLASSES[class_id]} alt={`Class ${class_id}`} />{" "}
                {CLASS_ID_TO_CLASS_NAME.get(class_id)}
            </td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={display_name}
                    onChange={(e) =>
                        onUpdateCharacter({ display_name: e.target.checked })
                    }
                />
            </td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={display_name_in_all_previous_logs}
                    onChange={(e) =>
                        onUpdateCharacter({
                            display_name_in_all_previous_logs: e.target.checked,
                        })
                    }
                />
            </td>
            <td className="text-center">
                <Button
                    variant="contained"
                    color={markedForDeletion ? "warning" : "error"}
                    onClick={() =>
                        onUpdateCharacter({ markedForDeletion: !markedForDeletion })
                    }>
                    {markedForDeletion ? "Undo" : "Delete"}
                </Button>
            </td>
        </tr>
    );
}
