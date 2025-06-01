"use server"

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

export const handlenewCompanionPermission = async () => {
    const {has, userId} = await auth()
    const supabase = createSupabaseClient()

    let limit = 0

    if (has({plan: 'pro'})) {
        return true
    } else if (has({feature: '3_active_companions'})) {
        limit = 3
    } else if (has({feature: '10_active_companions'})) {
        limit = 10
    }

    const {data, error} = await supabase.from("companions")
        .select("id", {count: "exact"})
        .eq("author", userId)

    if (error) throw new Error(error.message)

    const companionCount = data?.length
    if (companionCount >= limit) {
        return false
    } else {
        return true
    }
}