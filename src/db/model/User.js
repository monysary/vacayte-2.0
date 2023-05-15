const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
        },
        trips: [{
            type: Schema.Types.ObjectId,
            ref: 'vacayte2Trip'
        }],
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = models.vacayte2User || model('vacayte2User', userSchema);

module.exports = User;