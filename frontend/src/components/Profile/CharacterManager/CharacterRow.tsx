import { CLASS_ID_TO_CLASS_NAME } from "@utils/constants/classes";
import { MAP_TO_IMAGE_CLASSES } from "@utils/constants/general";

type CharacterRowProps = {
    region: string;
    name: string;
    class_id: number;
    display_name: boolean;
    display_logs: boolean;
};

export function CharacterRow({
    region,
    name,
    class_id,
    display_name,
    display_logs,
}: CharacterRowProps) {
    return (
        <tr className="border-top">
            <td className="text-center">{region}</td>
            <td className="">{name}</td>
            <td className="">
                <img src={MAP_TO_IMAGE_CLASSES[class_id]} alt={`Class ${class_id}`} />{" "}
                {CLASS_ID_TO_CLASS_NAME.get(class_id)}
            </td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={display_name}
                    id="checkName"
                />
            </td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={display_logs}
                    id="checkLogs"
                />
            </td>
            <td className="text-center">
                <button className="btn btn-danger">X</button>
            </td>
        </tr>
    );
}
