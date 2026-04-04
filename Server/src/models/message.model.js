const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["User", "ShopOwner"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel",
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ["User", "ShopOwner"],
    },
    text: {
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopOwner",
    },
  },
  { timestamps: true }
);

const threadSchema = new mongoose.Schema(
  {
    participants: [
      {
        participantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "participants.participantModel",
        },
        participantModel: {
          type: String,
          required: true,
          enum: ["User", "ShopOwner"],
        },
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
