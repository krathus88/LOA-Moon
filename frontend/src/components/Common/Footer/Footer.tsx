import "./Footer.css";

export function Footer() {
    return (
        <footer className="container mt-auto">
            <div className="d-flex flex-wrap justify-content-between align-items-center py-2 px-3 my-3 border-top">
                <p className="col-md-4 mb-0 text-body-secondary">
                    {new Date().getFullYear()} LOA Moon
                </p>
            </div>
        </footer>
    );
}
