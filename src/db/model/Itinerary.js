const { Schema, model, models } = require('mongoose');

const itinerarySchema = new Schema(
    {
        itinerary: [{
            date: {
                type: Date,
                required: true
            },
            dailyActivities: [{
                businessID: {
                    type: String,
                    trim: true,
                },
                time: {
                    type: Date,
                },
            }]
        }]
    }
);

const Itinerary = models.vacayte2Itinerary || model('vacayte2Itinerary', itinerarySchema);

module.exports = Itinerary;