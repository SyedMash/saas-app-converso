"use server"

import {google} from "@ai-sdk/google";
import {generateText} from "ai";

export const validateInstructions = async (subject: string, instructions: string) => {
    const {text} = await generateText({
        model: google("gemini-1.5-flash"),
        prompt: `You are assisting in validating whether a user's instructions are related to a given subject.

A user will provide:
- A subject
- A set of instructions

Your task:
- Determine whether the instructions are related to the subject in any meaningful way (even loosely).
- If they are related, respond with: {"success": true, "message": "both are related"}
- If they are not related, respond with: {"success": false, "message": "instructions are not related to the subject"} — or another suitable message in the same structure.

Important rules for your response:
- Only respond with a **single valid JSON object**.
- The JSON must use **double quotes** for all keys and string values.
- Do **not** include any explanation, special characters, comments, formatting, or extra text — just the raw JSON object.
- Example of a valid response: \`{"success": false, "message": "instructions are not related to the subject"}\`

Here is the input from the user:

Subject: ${subject}  
Instructions: ${instructions}

Now check the relation and respond with a valid JSON object only.

        `,
    })

    return text
}