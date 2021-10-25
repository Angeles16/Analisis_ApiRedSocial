import { model, Schema, Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface Ipublication extends Document{
    text: string;
    file: string;
    createdAt: number;
    private: boolean;
    user: Schema.Types.ObjectId
}

const publicationSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true,
    },
    private: {
        type: Boolean,
        required: false
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

publicationSchema.plugin(mongoosePaginate);

export default model<Ipublication> ('Publication', publicationSchema)