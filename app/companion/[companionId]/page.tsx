interface CompanionIdProps {
    params: Promise<{ id: string }>
}

const page = async ({params}: CompanionIdProps) => {
    const {id} = await params

    return (
        <div className="bg-gray-50 min-h-[calc(100dvh-80px)] w-dvw">
            <div className="custom-width overflow-hidden">
                <h1 className="mt-12">{id}</h1>
            </div>
            ;
        </div>
    );
};

export default page;