"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

import {subjects} from "@/constants";
import {Textarea} from "./ui/textarea";
import {createCompanion} from "@/lib/actions/companion.action";
import {redirect} from "next/navigation";
import {toast} from "sonner";
import {formSchema} from "@/schema";
import {validateInstructions} from "@/lib/actions/gemini.action";
import {useState} from "react";
import {cn} from "@/lib/utils";

const CompanionForm = () => {
    const [message, setMessage] = useState<GeminiReply>({success: false, message: ""});
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const validationOfInstruction = await validateInstructions(values.subject, values.topic)

        const parsedValidation: GeminiReply = JSON.parse(validationOfInstruction)

        setMessage({success: parsedValidation.success, message: parsedValidation.message})

        if (parsedValidation.success) {
            const newCompanion = await createCompanion(values);
            if (newCompanion) {
                toast("Companion created successfully.", {
                    description: `Companion name: ${newCompanion.name}`,
                });
                setLoading(false)
                redirect(`/companion/${newCompanion.id}`);
            } else {
                console.log("failed to create new companion");
                setLoading(false)
                redirect(`/`);
            }
        } else {
            setLoading(false);
            return
        }
    };

    return (
        <div className="h-full lg:flex flex-col lg:items-center lg:justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6 w-full lg:w-1/3"
                >
                    <h1 className="mt-12 self-start mb-6">Companion Builder</h1>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Companion name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter the companion name"
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="subject"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select a subject"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {subjects.map((subject) => (
                                                <SelectItem
                                                    key={subject}
                                                    value={subject}
                                                    className="capitalize"
                                                >
                                                    {subject}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="topic"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>What should the companion be good at?</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Ex. Differentiation, Integration"
                                        className="input"
                                    />
                                </FormControl>
                                {!message.success && <p className={"text-red-600"}>{message.message}</p>}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="voice"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Voice</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select a voice"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="style"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Style</FormLabel>
                                <FormControl>
                                    <Select
                                        {...field}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="input capitalize">
                                            <SelectValue placeholder="Select a style"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="casual">Casual</SelectItem>
                                            <SelectItem value="formal">Formal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="duration"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Estimated session duration in minutes</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        placeholder="15"
                                        className="input"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className={cn("cursor-pointer w-full", loading && "animate-pulse")}
                            disabled={loading}>
                        {loading ? "Validation instructions..." : "Build Your Companion"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CompanionForm;
