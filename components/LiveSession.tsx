"use client"

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {vapi} from "@/lib/vapi.sdk";
import {cn, configureAssistant} from "@/lib/utils";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from "@/constants/soundwaves.json"
import {saveSession} from "@/lib/actions/session.action";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface LiveSessionProps {
    name: string
    subject: string
    userName: string
    userImageUrl: string
    companionId: string
    topic: string
    style: string
    voice: string
    userId: string
}

enum CALLSTATUS {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const LiveSession = ({
                         name,
                         subject,
                         userName,
                         userImageUrl,
                         topic,
                         style,
                         voice,
                         userId,
                         companionId
                     }: LiveSessionProps) => {
    const [callStatus, setCallStatus] = useState<CALLSTATUS>(CALLSTATUS.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isUserMuted, setIsUserMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);


    const lottieRef = useRef<LottieRefCurrentProps>(null);

    const router = useRouter()

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CALLSTATUS.ACTIVE)
        const onCallEnd = () => setCallStatus(CALLSTATUS.FINISHED)

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript
                }
                setMessages((prev) => [newMessage, ...prev])
            }

        }

        const onError = (error: Error) => console.log(error)

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        vapi.on("call-start", onCallStart)
        vapi.on("call-end", onCallEnd)
        vapi.on("message", onMessage)
        vapi.on("error", onError)
        vapi.on("speech-start", onSpeechStart)
        vapi.on("speech-end", onSpeechEnd)

        return () => {
            vapi.off("call-start", onCallStart)
            vapi.off("call-end", onCallEnd)
            vapi.off("message", onMessage)
            vapi.off("error", onError)
            vapi.off("speech-start", onSpeechStart)
            vapi.off("speech-end", onSpeechEnd)
        }
    }, [])

    const toggleMic = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsUserMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CALLSTATUS.CONNECTING)

        const assistantOverrides = {
            variableValues: {
                subject, topic, style
            },
            clientMessages: ['transcript'],
            serverMessages: []
        }

        //@ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = async () => {
        setCallStatus(CALLSTATUS.FINISHED)
        vapi.stop()
        const saveCurrentSession = await saveSession(userId, companionId)
        if (saveCurrentSession.success) {
            toast(saveCurrentSession.message)
            router.push("/")
        }
    }

    return (
        <section className={'mt-[30px] grid grid-cols-1 md:grid-cols-3 gap-4'}>
            <div className={'md:col-span-2 flex-center flex-col gap-4 h-[50vh] border-black border rounded-xl'}>
                <div className={"bg-pink-100 rounded-xl p-3"}>
                    {callStatus === CALLSTATUS.ACTIVE ?
                        <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false}/> :
                        <Image src={`/icons/${subject}.svg`} alt={"science"} height={50} width={50}
                               className={"aspect-square object-cover"}/>}

                </div>
                <h1>{name}</h1>
            </div>
            <div className={'md:col-span-1'}>
                <div className={"h-[25vh] border border-black rounded-xl flex-center flex-col gap-4"}>
                    <Image src={userImageUrl} alt={"user-image"} height={50} width={50}
                           className={"rounded-xl aspect-square object-cover"}/>
                    <h2>{userName}</h2>
                </div>
                <div className={"mt-3"}>
                    <button
                        className={'flex-center flex-col border border-black w-full p-5 rounded-xl gap-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'}
                        onClick={toggleMic}
                        disabled={callStatus !== CALLSTATUS.ACTIVE}
                    >
                        <Image src={isUserMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt="mic-on" height={24}
                               width={24}/>
                        <p>{isUserMuted ? "Turn on mic" : "Turn off mic"}</p>
                    </button>
                    <Button
                        className={cn("mt-4 w-full rounded-xl cursor-pointer transition-colors duration-300", callStatus === CALLSTATUS.ACTIVE ? "bg-red-500"
                            : callStatus === CALLSTATUS.CONNECTING ? "bg-yellow-500 animate-pulse"
                                : "bg-green-500")}
                        onClick={callStatus === CALLSTATUS.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CALLSTATUS.ACTIVE ? "End Session" : callStatus === CALLSTATUS.CONNECTING ? "Connecting" : "Start Session"}
                    </Button>
                </div>
            </div>
            <section>
                <div className={"h-48 overflow-hidden"}>
                    {messages.map((message, index) => {
                        if (message.role === "assistant") {
                            return (<p key={index}>{name
                                .split(' ')[0]
                                .replace('/[.,]/g', '')}: {message.content}
                            </p>)
                        } else {
                            return (<p key={index}>{userName}: {message.content}</p>)
                        }
                    })}
                </div>
            </section>
        </section>
    )
}
export default LiveSession
