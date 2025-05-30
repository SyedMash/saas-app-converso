"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "../supabase";

export const createCompanion = async (data: createCompanion) => {
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();

    const {data: companionData, error} = await supabase
        .from("companions")
        .insert({...data, author})
        .select();

    if (error || !companionData) throw new Error(`${error.message}`);

    return companionData[0];
};

export const getAllCompanions = async ({
                                           limit = 10,
                                           page = 1,
                                           subject,
                                           topic,
                                       }: GetAllCompanions) => {
    const supabase = await createSupabaseClient();

    let query = supabase.from("companions").select();

    if (subject && topic) {
        query = query
            .ilike("subject", `%${subject}%`)
            .or(`topic.ilike.%${topic}%.name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%.name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, limit - 1);

    const {data: companions, error} = await query;

    if (error || !companions) throw new Error(error.message);

    return companions;
};


export const getCompanion = async (id: string) => {
    const supabase = await createSupabaseClient()
    const {data: companion, error} = await supabase.from("companions").select("*").eq("id", id)

    if (error || !companion) throw new Error(`No companion found, ${error?.message}`);

    return companion[0];
}

export const saveSession = async (userId: string, companionId: string) => {
    const supabase = await createSupabaseClient()
    const {error} = await supabase.from("session_history").insert({user_id: userId, companion_id: companionId}).select()

    if (error) throw new Error(`${error.message}`);

    return {success: true, message: "Session saved successfully."};
}