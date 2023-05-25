const { Schema, model, models, Types } = require('mongoose');

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
                    trim: true,
                    unique: true
                },
            }]
        }],
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'vacayte2User'
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Trip = models.vacayte2Trip || model('vacayte2Trip', tripSchema);

module.exports = Trip;