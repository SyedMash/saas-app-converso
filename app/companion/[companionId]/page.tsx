import {getCompanion} from "@/lib/actions/companion.action";
import Image from "next/image";
import LiveSession from "@/components/LiveSession";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

interface CompanionIdProps {
    params: Promise<{ companionId: string }>
}

const page = async ({params}: CompanionIdProps) => {
    const {companionId} = await params
    const companion: Companion = await getCompanion(companionId)
    const {name, voice, subject, topic, duration, id, style} = companion
    const user = await currentUser()

    if (!user) redirect("/sign-in")
    if (!companion) redirect("/companion-library")

    return (
        <div className="bg-gray-50 min-h-[calc(100dvh-80px)] w-dvw">
            <div className="custom-width overflow-hidden">
                <div className={"mt-12 w-full border border-black p-6 rounded-xl flex items-center gap-3 relative"}>
                    <div className={"bg-pink-100 p-2 rounded-lg hidden md:block"}>
                        <Image src={"/icons/science.svg"} alt={"subject-iamge"} height={48} width={48}
                               className={"aspect-square object-cover"}/>
                    </div>
                    <div className={"space-y-2"}>
                        <div className={"flex items-center gap-4"}>
                            <h1>{name}</h1>
                            <div
                                className="bg-black text-white flex items-center justify-center rounded-xl py-1 px-4 capitalize text-sm">
                                {subject}
                            </div>
                        </div>
                        <p className={"text-lg"}>Topic: {topic}</p>
                    </div>
                    <p className={"absolute top-5 right-5 font-semibold hidden md:block"}>{duration} mins</p>
                </div>
                <LiveSession name={name} subject={subject} userName={user.fullName!} userImageUrl={user.imageUrl!}
                             companionId={id} topic={topic} style={style} voice={voice} userId={user.id}/>
            </div>
        </div>
    );
};

export default page;
