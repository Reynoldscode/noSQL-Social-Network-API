
const { Schema, Types } = require('mongoose');

// Define the schema for a reaction
const reactionSchema = new Schema(
  {
    // Reaction ID field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // Reaction body field
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    // Username field
    username: {
      type: String,
      required: true,
    },
    // Creation date field
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleDateString()
    },
  },
  {
    // Configure toJSON options
    toJSON: {
      getters: true,
    },
    // Exclude "_id" field
    id: false,
  }
);


module.exports = reactionSchema