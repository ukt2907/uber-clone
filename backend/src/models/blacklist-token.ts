import mongoose, { Schema, Document } from 'mongoose';

export interface IBlacklistToken extends Document {
    token: string;
    createdAt: Date;
}

const BlacklistTokenSchema: Schema = new Schema<IBlacklistToken>({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // TTL of 24 hours (86400 seconds)
});

const BlacklistToken = mongoose.model<IBlacklistToken>('BlacklistToken', BlacklistTokenSchema);

export default BlacklistToken;