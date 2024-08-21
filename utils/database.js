import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB connected!");
        return;
    }



    try {


        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "PromptHub",
            // userNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;

        console.log("MongoDB connected!")
    } catch (error) {
        console.log(error)
    }
}