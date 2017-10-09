import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
    id: String,
    username: String,
    password: String,
    role: String,
}));
