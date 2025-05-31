"use server"

import {createSupabaseClient} from "@/lib/supabase";

export const saveSession = async (userId: string, companionId: string) => {
    const supabase = await createSupabaseClient()
    const {error} = await supabase.from("session_history").insert({user_id: userId, companion_id: companionId}).select()

    if (error) throw new Error(`${error.message}`);

    return {success: true, message: "Session saved successfully."};
}

export const getUserSessions = async (userid: string) => {
    const supabase = await createSupabaseClient()
    const {data, error} = await supabase.from("session_history").select().eq("user_id", userid)

    if (error || !data) throw new Error(`User sessions not found, ${error?.message}`);

    return data
}