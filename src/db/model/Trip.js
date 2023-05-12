const { Schema, model } = require('mongoose');

const tripSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        activities: [{
            name: {
                type: String,
                required: true,
            },
            saved: [{
                businessID: { type: String },
            }]
        }],
    }
);

const Trip = model('vacayte2Trip', tripSchema);

module.exports = Trip;