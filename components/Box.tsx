"use client";

import clsx from "clsx";
import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";
import {Trash2} from "lucide-react"
import {deleteCompaion} from "@/lib/actions/companion.action";
import {toast} from "sonner";

interface BoxProps {
    id: string
    subject: string;
    name: string;
    topic: string;
    duration: number;
    color: string;
}

const Box = ({duration, subject, name, topic, color, id}: BoxProps) => {
    const [bookmark, setBookmark] = useState("/icons/bookmark.svg");

    const handleBookMark = () => {
        if (bookmark === "/icons/bookmark.svg") {
            setBookmark("/icons/bookmark-filled.svg");
            // TODO::-> Handle bookmark add function
        } else {
            setBookmark("/icons/bookmark.svg");
            //TODO::-> Handle bookmark remove function
        }
    };

    const handleCompanionDelete = async () => {
        const deletedCompanion = await deleteCompaion({companionId: id})
        if (deletedCompanion.success) {
            toast("Company deleted successfully");
        } else {
            toast(deletedCompanion.message)
        }
    }

    return (
        <div
            className={clsx("min-h-72 rounded-3xl p-6 border-2 border-black")}
            style={{backgroundColor: color}}
        >
            <div className="flex justify-between">
                <div className="bg-black text-white flex items-center justify-center rounded-xl py-1 px-4 capitalize">
                    {subject}
                </div>
                <div className={"flex items-center gap-2"}>
                    <button
                        className="bg-black p-2 rounded-lg cursor-pointer"
                        onClick={handleBookMark}
                    >
                        <Image src={bookmark} alt="bookmark" width={14} height={14}/>
                    </button>
                    <button className={"cursor-pointer"} onClick={handleCompanionDelete}>
                        <Trash2/>
                    </button>
                </div>
            </div>
            <div className="space-y-4 mt-6">
                <h1>{name}</h1>
                <p className={"line-clamp-1"}>Topic: {topic}</p>
                <p>🕛 {duration} mins duration</p>
            </div>
            <Link href={`/companion/${id}`}>

                <button className="mt-6 w-full rounded-xl bg-orange-500 p-3 text-white cursor-pointer">
                    Launch Session
                </button>
            </Link>
        </div>
    );
};

export default Box;
