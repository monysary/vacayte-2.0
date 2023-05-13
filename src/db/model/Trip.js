const { Schema, model, models } = require('mongoose');

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
                trim: true
            },
            saved: [{
                businessID: {
                    type: String,
                    trim: true
                },
            }]
        }],
    }
);

const Trip = models.vacayte2Trip || model('vacayte2Trip', tripSchema);

module.exports = Trip;