import {getCompanion} from "@/lib/actions/companion.action";
import Image from "next/image";
import React from "react";
import LiveSession from "@/components/LiveSession";

interface CompanionIdProps {
    params: Promise<{ companionId: string }>
}

const page = async ({params}: CompanionIdProps) => {
    const {companionId} = await params
    const companion: Companion = await getCompanion((companionId))
    const {name, subject, id, created_at, style, topic, voice, duration, author} = companion

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
                <LiveSession name={name}/>
            </div>
        </div>
    );
};

export default page;
