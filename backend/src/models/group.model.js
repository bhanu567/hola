import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      require: true,
    },
    image: String,
  },
  { timestamps: true }
);

const groupChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: "A sample Group",
    },
    groupMessages: {
      type: [messageSchema],
    },
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GroupMessage = mongoose.model("GroupMessage", groupChatSchema);
export default GroupMessage;
