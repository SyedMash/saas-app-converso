import Box from "@/components/Box";
import SearchFilter from "@/components/SearchFilter";
import SubjectFilter from "@/components/SubjectFilter";
import {getAllCompanions} from "@/lib/actions/companion.action";
import {getSubjectColor} from "@/lib/utils";

const page = async ({searchParams}: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : "";
    const topic = filters.topic ? filters.topic : "";

    const companions = await getAllCompanions({subject, topic});

    return (
        <div className="bg-gray-50 min-h-dvh w-dvw">
            <div className="custom-width overflow-hidden">
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between py-2">
                    <h1>Companion Library</h1>
                    <div className="flex items-center gap-6 md:gap-6 mt-4 md:mt-0">
                        <SearchFilter/>
                        <SubjectFilter/>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {companions.map((companion: Companion) => (
                        <Box
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)!}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default page;