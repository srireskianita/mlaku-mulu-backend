import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITrip extends Document {
  tourist: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  destination: string | object;
}

const tripSchema = new Schema<ITrip>({
  tourist: { type: Schema.Types.ObjectId, ref: 'Tourist', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  destination: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.models.Trip || mongoose.model<ITrip>('Trip', tripSchema);
