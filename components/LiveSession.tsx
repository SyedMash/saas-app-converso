import Image from "next/image";
import {Button} from "@/components/ui/button";

interface LiveSessionProps {
    name: string
}

const LiveSession = ({name}: LiveSessionProps) => {
    return (
        <div className={'mt-12 grid grid-cols-1 md:grid-cols-3 gap-4'}>
            <div className={'md:col-span-2 flex-center flex-col gap-4 h-[50vh] border-black border rounded-xl'}>
                <div className={"bg-pink-100 rounded-xl p-3"}>
                    <Image src={"/icons/science.svg"} alt={"science"} height={50} width={50}
                           className={"aspect-square object-cover"}/>
                </div>
                <h1>{name}</h1>
            </div>
            <div className={'md:col-span-1'}>
                <div className={"h-[25vh] border border-black rounded-xl flex-center flex-col gap-4"}>
                    <Image src={"/icons/science.svg"} alt={"science"} height={50} width={50}/>
                    <h2>{name}</h2>
                </div>
                <div className={"mt-3"}>
                    <div className={'flex-center flex-col border border-black w-full p-5 rounded-xl gap-4'}>
                        <Image src="/icons/mic-on.svg" alt="mic-on" height={24} width={24}/>
                        <p>Turn of the mic</p>
                    </div>
                    <Button className={"mt-4 w-full rounded-xl cursor-pointer"}>End Session</Button>
                </div>
            </div>
        </div>
    )
}
export default LiveSession
