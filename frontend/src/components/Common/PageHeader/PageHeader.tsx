import "./PageHeader.css";
import { SourceType } from "@type/GeneralType";

const SvgOne = () => (
    <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const SvgTwo = () => (
    <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" x="2" y="2" rx="2" />
    </svg>
);

type PageHeaderType = {
    source?: SourceType;
    title: string;
    imgSrc: string;
    isActiveSwitch?: boolean;
    setIsActiveSwitch?: (isActiveSwitch: boolean) => void;
};

export function PageHeader({
    source,
    title,
    imgSrc,
    isActiveSwitch,
    setIsActiveSwitch,
}: PageHeaderType) {
    return (
        <div className="container-fluid" id="PageHeader">
            <div className="mx-auto rounded">
                <div>
                    <img src={imgSrc} />
                    <h3>{title}</h3>
                </div>
                <div>
                    {source == "p-class" && setIsActiveSwitch && (
                        <div
                            className="toggle-switch"
                            onClick={() => setIsActiveSwitch(!isActiveSwitch)}>
                            <div
                                className={`toggle-option ${
                                    !isActiveSwitch ? "active" : ""
                                }`}>
                                <SvgOne />
                            </div>
                            <div
                                className={`toggle-option ${
                                    isActiveSwitch ? "active" : ""
                                }`}>
                                <SvgTwo />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
