import { Link } from "react-router-dom";

type ContentsProps = {
    children: React.ReactNode;
    label: string;
    url: string;
    imgUrl: string;
};

export function Contents({ children, label, url, imgUrl }: ContentsProps) {
    return (
        <Link to={url} className="card no-link shadow">
            <div>
                <img src={imgUrl} />
                {children}
            </div>
            <h3>{label}</h3>
        </Link>
    );
}
