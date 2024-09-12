export function CharacterRow() {
    return (
        <tr className="border-top">
            <td className="text-center">EUC</td>
            <td className="">TestSubject</td>
            <td className="">Shadowhunter</td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkName"
                />
            </td>
            <td className="text-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkLogs"
                />
            </td>
            <td className="text-center">
                <button className="btn btn-danger">X</button>
            </td>
        </tr>
    );
}
