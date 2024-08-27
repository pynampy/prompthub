import { Schema, model, models } from 'mongoose';


const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is requred.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
});

PromptSchema.index({ creator: 1 });

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;