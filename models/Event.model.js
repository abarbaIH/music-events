const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            minlength: 2,
            maxlength: 50,
        },

        eventImg: {
            type: String,
            default: 'https://res.cloudinary.com/duewvq0qa/image/upload/v1684316440/ddgkodz01eq2ymkevhy3.png'
        },

        description: {
            type: String,
            trim: true,
            default: 'There is not description for this event.'
        },

        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },

        date: {
            start: Date,
            end: Date,
        },

        planner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        artists: [{
            type: String,
            // name: String,
            // artistImg: String,
            default: []
        }],

        assistants: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: []

        }],
    },

    {
        timestamps: true
    }
)

const Event = model("Event", eventSchema);

module.exports = Event;