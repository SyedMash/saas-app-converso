interface createCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}

interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string | string[];
    topic?: string | string[];
}

interface SearchParams {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Companion {
    id: string;
    created_at: string;
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
    author: string;
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}
