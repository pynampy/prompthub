import { connectToDb } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req, res) => {
    try {
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (e) {
        console.log(error);
        return new Response("Failed to create a new prompt", { status: 201 })

    }
}


export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })

    } catch (e) {
        console.log(error);
        return new Response("Failed to create a new prompt", { status: 201 })

    }
}