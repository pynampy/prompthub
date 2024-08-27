import { connectToDb } from "@utils/database";
import Prompt from '@models/prompt';


export const GET = async (request) => {
    try {
        await connectToDb();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500
        });
    }
}


export const POST = async (request) => {
    const data = await request.json();
    console.log(data.searchText)
    console.log("POST CALLED");
    try {
        await connectToDb();
        const prompts = await Prompt.find({
            $or: [
                { 'prompt': { "$regex": `${data.searchText}`, "$options": "i" } },
                { 'tag': { "$regex": `${data.searchText}`, "$options": "i" } }
            ],
        }).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", {
            status: 500
        });
    }
}