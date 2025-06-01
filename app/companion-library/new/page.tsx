import CompanionForm from "@/components/CompanionForm";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {handlenewCompanionPermission} from "@/lib/actions/subscription.action";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
    const {userId} = await auth();
    if (!userId) redirect("/sign-in");

    const canCreateCompanion = await handlenewCompanionPermission()

    return (
        <div className="bg-gray-50 min-h-[calc(100dvh-80px)] w-dvw">
            <div className="custom-width overflow-hidden">
                {canCreateCompanion ? <div className="w-full h-full ">
                    <CompanionForm/>
                </div> : <div>
                    <article className={"flex-center flex-col gap-3 min-h-[calc(100dvh-80px)] w-full md:w-1/3 mx-auto"}>
                        <Image src={"/images/limit.svg"} alt={"limit"} height={230} width={360}/>
                        <div className={"bg-yellow-300 rounded-lg py-1 px-4"}>Upgrade Your Plan</div>
                        <h1 className={"capitalize"}>You&apos;ve reached your limit</h1>
                        <p className={"text-center"}>You&apos;ve reached your companion limit. Upgrade to create more
                            companions and premium
                            features</p>
                        <Link href={"/subscription"}
                              className={"capitalize bg-black w-full flex justify-center text-white py-2 rounded-lg font-semibold"}>upgrade
                            my plan</Link>
                    </article>
                </div>}
            </div>
        </div>
    );
};

export default page;
