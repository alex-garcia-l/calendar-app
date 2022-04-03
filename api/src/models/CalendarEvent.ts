import { Schema, model } from 'mongoose';

const config = { timestamps: true, versionKey: false };

const CalendarEventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
      required: [true, 'start is required'],
    },
    end: {
      type: Date,
      required: [true, 'end is required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user_id is required'],
    },
  },
  config
);

CalendarEventSchema.methods.toJSON = function () {
  let { _id, ...data } = this.toObject();

  data = {
    uid: _id,
    ...data,
  };

  return data;
};

export default model('Calendar_Event', CalendarEventSchema);
