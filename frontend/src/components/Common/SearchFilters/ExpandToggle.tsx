import { useAccordionButton } from "react-bootstrap";

type ExpandToggleProps = {
    children: React.ReactNode;
    eventKey: string;
};

export function ExpandToggle({ children, eventKey }: ExpandToggleProps) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
        <button type="button" className="btn expand-button" onClick={decoratedOnClick}>
            {children}
        </button>
    );
}
