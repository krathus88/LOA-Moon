import "@components/FAQ/Faq.css";
import { Setup } from "@components/FAQ/Setup";
import { CharacterManagement } from "@components/FAQ/CharacterManagement";
import { Other } from "@components/FAQ/Other";

export function Component() {
    return (
        <main id="FAQ">
            <div className="d-flex flex-column gap-4 container my-4">
                <Setup />
                <CharacterManagement />
                <Other />
            </div>
        </main>
    );
}

Component.displayName = "FaqPage";
