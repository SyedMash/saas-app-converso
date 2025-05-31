import List from "@/components/List";
import {recentLessons} from "@/constants";
import Image from "next/image";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getCompanionsByUserId} from "@/lib/actions/companion.action";
import {getUserSessions} from "@/lib/actions/session.action";

interface DetailsBoxProps {
    icon: string;
    quantity: string;
    title: string;
}

const DetailsBox = ({icon, quantity, title}: DetailsBoxProps) => {
    return (
        <div className="border-2 border-black py-3 px-6 rounded-xl">
            <figure className="flex gap-2 items-center">
                <Image src={icon} alt="check" width={28} height={28}/>
                <h1>{quantity}</h1>
            </figure>
            <p className="mt-2 capitalize text-wrap">{title}</p>
        </div>
    );
};

const page = async () => {
    const user = await currentUser()
    if (!user) redirect("/sign-in")

    const userCompanions = await getCompanionsByUserId(user.id)
    if (!userCompanions) redirect("/companion-library/new")

    const userSessions = await getUserSessions(user.id)

    return (
        <div className="bg-gray-50 min-h-dvh w-dvw">
            <div className="custom-width overflow-hidden">
                <div className="mt-12 flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
                    <figure className="flex items-center gap-4">
                        <Image
                            src={user.imageUrl}
                            alt="person"
                            height={48}
                            width={48}
                            className="object-cover rounded-xl"
                        />
                        <div>
                            <h1>{user.fullName}</h1>
                            <p>{user.emailAddresses[0].emailAddress}</p>
                        </div>
                    </figure>
                    <div className="flex items-center gap-6">
                        <DetailsBox
                            icon="/icons/check.svg"
                            title="lessons completed"
                            quantity={String(userSessions.length)}
                        />
                        <DetailsBox
                            icon="/icons/cap.svg"
                            title="companions created"
                            quantity={String(userCompanions.length)}
                        />
                    </div>
                </div>
                <div className="rounded-xl border-2 p-6 mt-6">
                    <h1>Completed lessons</h1>
                    <div className="hidden md:flex items-center justify-between mt-6">
                        <p className="">Lessons</p>
                        <div className="flex items-center gap-24">
                            <p className="hidden md:block">Subject</p>
                            <p className="hidden md:block">Duration</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        {recentLessons.map((lesson) => (
                            <List key={lesson.id} {...lesson} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
