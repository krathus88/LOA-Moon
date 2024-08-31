import { useEffect, useState } from "react";
import "@components/Home/Home.css";
import { RaidSummaryContainer } from "@components/Home/RaidSummary/RaidSummaryContainer";
import { SearchFiltersContainer } from "@components/Home/SearchFilters/SearchFiltersContainer";
import { fetchData } from "@utils/functions";
import { Loading } from "@components/Common/Loading";
import { RaidSummaryType } from "@type/RaidSummaryType";

export function Component() {
    const [data, setData] = useState<RaidSummaryType[] | null>(null);
    const [isRetrievingData, setIsRetrievingData] = useState(true);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const result = await fetchData("GET", "home");
                setData(result);
                setIsRetrievingData(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataFromAPI();
    }, []);
    console.log(data);
    return (
        <main>
            <div className="my-4 mx-3 mx-md-4" id="RaidOverallContainer">
                <SearchFiltersContainer />
                <ul className="col" id="RaidSummaryContainer">
                    {isRetrievingData ? (
                        <Loading />
                    ) : !isRetrievingData && data ? (
                        <RaidSummaryContainer data={data} />
                    ) : (
                        <p>Oops! Something went wrong...</p>
                    )}
                </ul>
            </div>
        </main>
    );
}

Component.displayName = "HomePage";
