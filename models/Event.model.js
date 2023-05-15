const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            // lowercase: true,
            minlength: 2,
            maxlength: 50,
            // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        },

        eventImg: {
            type: String
        },

        description: {
            type: String,
            trim: true,
            default: 'There is not description for this event.'
            // set: value => value.charAt(0).toUpperCase() + value.substring(1)
        },

        place: {
            type: {
                address: String,
                zipcode: String,
                city: String,
                country: String,
            },
        },

        date: {
            type: {
                startDate: Date,
                endDate: Date,
            }
        },

        musicStyle: {
            type: String,
            enum: ['electronic', 'pop', 'rock', 'flamenco']
        },

        // location: {
        //     type: {
        //         type: String
        //     },
        //     coordinates: [Number]
        // },

        planner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        artists: [{
            type: Schema.Types.ObjectId,
            ref: 'Artist'
        }],

        assistants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },

    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema);

module.exports = Event;