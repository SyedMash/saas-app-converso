import {PricingTable} from "@clerk/nextjs";

const Page = () => {
    return (
        <section className={"h-[calc(100dvh-80px)] px-4 2xl:px-0 container mx-auto"}>
            <PricingTable/>
        </section>
    )
}
export default Page