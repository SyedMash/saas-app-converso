"use client"

import {Input} from "./ui/input";
import {usePathname, useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchFilter = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get("topic") || ""

    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        const delayDebounce = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery
                })
                router.push(newUrl, {scroll: false})
            } else {
                if (pathname === "/companion-library") {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic']
                    })
                    router.push(newUrl, {scroll: false})
                }
            }

        }, 500)

        return () => {
            clearTimeout(delayDebounce)
        }

    }, [searchQuery, router, searchParams, pathname])

    return (
        <>
            <Input
                placeholder="Search your companion"
                className="placeholder:text-sm input"
                value={searchQuery}
                onChange={(e) => setSearchQuery((e.target.value))}
            />
        </>
    );
};

export default SearchFilter;