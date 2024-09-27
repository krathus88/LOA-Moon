import { PlacesType, Tooltip } from "react-tooltip";

type ItemTooltipProps = {
    children: React.ReactNode;
    anchorTo: string;
    place?: PlacesType;
    className?: string;
};

export function ItemTooltip({
    children,
    anchorTo,
    place = "top",
    className,
}: ItemTooltipProps) {
    return (
        <Tooltip
            offset={5}
            className={`text-center fw-light ${className}`}
            anchorSelect={anchorTo}
            place={place}
            style={{ maxWidth: "325px", whiteSpace: "normal" }}>
            {children}
        </Tooltip>
    );
}
