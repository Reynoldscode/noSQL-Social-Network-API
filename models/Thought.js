const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');

// Define the schema for a thought
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280, 
        },
        createdAt:{
            type: Date,
            default: Date.now, // Default value is the current timestamp
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionSchema], // Array of subdocuments referencing the Reaction schema
    },
    {
        toJSON: {
            getters: true, // Include getters when converting document to JSON
            virtuals: true,
        },
        id: false, // Do not include the "_id" field in the JSON representation
    }
);

// Define a virtual property to get the count of reactions
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Create a model based on the thought schema
const Thought = model('Thought', thoughtSchema)


module.exports = Thought