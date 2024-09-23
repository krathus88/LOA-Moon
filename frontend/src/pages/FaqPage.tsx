import "@components/FAQ/Faq.css";
import { Setup } from "@components/FAQ/Setup";
import { CharacterManagement } from "@components/FAQ/CharacterManagement";
import { Other } from "@components/FAQ/Other";
import { PageHeader } from "@components/Common/PageHeader/PageHeader";
import { MAP_TO_IMAGE_PAGES } from "@utils/constants/general";

export function Component() {
    return (
        <main id="FAQ">
            <PageHeader title="FAQ" imgSrc={MAP_TO_IMAGE_PAGES["faq"]} />
            <div className="d-flex flex-column gap-4 container my-3">
                <Setup />
                <CharacterManagement />
                <Other />
            </div>
        </main>
    );
}

Component.displayName = "FaqPage";
