"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {subjectsFilter} from "@/constants";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const SubjectFilter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (searchQuery && searchQuery !== "all") {
            const newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'subject',
                value: searchQuery
            })
            router.push(newUrl, {scroll: false})
        } else {
            setSearchQuery("")
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ['subject']
            })
            router.push(newUrl, {scroll: false})
        }
    }, [searchQuery, router, searchParams, pathname])

    return (
        <>
            <Select defaultValue={searchQuery} onValueChange={setSearchQuery}>
                <SelectTrigger className="input">
                    <SelectValue placeholder="Select a subject"/>
                </SelectTrigger>
                <SelectContent>
                    {subjectsFilter.map((subject) => (
                        <SelectItem key={subject} value={subject} className="capitalize">
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};

export default SubjectFilter;
