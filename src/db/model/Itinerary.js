const { Schema, model, models } = require('mongoose');

const itinerarySchema = new Schema (
    {
        itinerary:[{
            date: {
                type: Date,
                required: true
            },
            dailyActivities: [{
                type: String,
                trim: true,
                unique: true
            }]
        }]
    }
);

const Itinerary = models.vacayte2Itinerary || model('vacayte2Itinerary', itinerarySchema);

module.exports = Itinerary;