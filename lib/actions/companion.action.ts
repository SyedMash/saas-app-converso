"use server";

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "../supabase";
import {revalidatePath} from "next/cache";

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


export const getCompanionsByUserId = async (userId: string) => {
    const supabase = await createSupabaseClient()

    const {data, error} = await supabase.from("companions").select("*").eq("author", userId)

    if (error || !data) throw new Error(`No companion found, ${error?.message}`);

    return data
}

export const deleteCompaion = async ({companionId}: { companionId: string }) => {
    const {userId} = await auth()
    const supabase = await createSupabaseClient()

    const {data, error} = await supabase.from("companions").select("author").eq("id", companionId)
    if (error || !data) throw new Error(`No companion found, ${error?.message}`);

    const {author} = data[0]

    if (userId !== author) {
        return {success: false, message: "You are not the owner"}
    }

    const {error: deleteError} = await supabase.from("companions").delete().eq("id", companionId)
    if (deleteError) throw new Error(`${deleteError.message}`);

    revalidatePath("/", "layout")
    return {success: true, message: "Companion deleted successfully."};
}