const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            minlength: [3, "First name must be at least 3 characters long."],
            unique: true, // throws 'duplicate key error' code 11000 if name already exists in the db
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            minlength: [3, "Last name must be at least 3 characters long."],
        },
        email: {
            type: String,
            validate: {
                validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.text(val),
                message: "Please enter a valid email.",
            },
            required: [true, "Email is required."],
        },
        password: {
            type: Array,
            required: [true, "Password is required."],
            min: [8, "Password must be 8 characters or longer."],
        },
    },
    { timestamps: true }
);

// virtual attribute to store password confirmation temporarily
UserSchema.virtual("confirmPassword")
    .get(() => this.confirmPassword)
    .set((value) => (this.confirmPassword = value));

// validation that runs before others to check if passwords match
UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Passwords do not match.");
    }
    next();
});

// encrypting password for storage with bcrypt
UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
