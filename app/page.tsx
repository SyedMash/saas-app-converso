import Box from "@/components/Box";
import List from "@/components/List";
import {recentLessons, recentSessions} from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="bg-gray-50 min-h-dvh w-dvw">
            <div className="custom-width overflow-hidden">
                <h1 className="mt-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                    {recentSessions.map((session, idx: number) => (
                        <Box key={idx} {...session} />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-6">
                    <div className="md:col-span-2 rounded-xl border-2 p-6">
                        <h1>Recently completed lessons</h1>
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
                    <div
                        className="md:col-span-1 rounded-xl p-6 bg-neutral-800 flex flex-col items-center justify-center overflow-hidden max-h-fit">
                        <p className="bg-yellow-500 w-fit text-center rounded-xl py-1 px-5">
                            Start learning your way
                        </p>
                        <h1 className="text-white text-center capitalize mt-4">
                            build a personalize <br/> learning companion
                        </h1>
                        <p className="text-white mt-4 text-center">
                            Pick a name, subject, voice & personality and start learning
                            through voice conversations that feels natural and fun
                        </p>
                        <Image
                            src={"/images/cta.svg"}
                            alt="cta"
                            height={1000}
                            width={1000}
                            className="object-cover"
                        />
                        <Link href={"/companion-library/new"}>
                            <button className="mt-6 w-full rounded-xl bg-orange-500 p-3 text-white cursor-pointer">
                                Create new companion
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
