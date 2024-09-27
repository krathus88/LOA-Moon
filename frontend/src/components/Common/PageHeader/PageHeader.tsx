import "./PageHeader.css";
import { SourceType } from "@type/GeneralType";

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
                {source == "p-class" && setIsActiveSwitch && (
                    <div
                        className="wrapper"
                        onClick={() => setIsActiveSwitch(!isActiveSwitch)}>
                        <div className="box">
                            <div className="container">
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
