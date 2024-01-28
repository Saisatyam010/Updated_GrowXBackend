const mongoose = require("mongoose");
require("../../GrowXConfig/GrowX_db");
const Collection = require("../../GrowXConfig/Collection");
const { getPasswordHash } = require("../../GrowXUtils/GrowXUtils");

const UserPublisherSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Fullname is required field"] },
    userLogin: {
      type: String,
      required: [true, "UserLogin is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required field"] },
    country: { type: String },
    messenger: {
      type: String,
      required: [true, "Messenger is required field"],
    },
    messengerDetails: {
      type: String,
      required: [true, "Messengerdetails is required field"],
    },
    paymentMethod: {
      type: String,
      required: [true, "paymentMethod is required field"],
    },
  },
  { timestamps: true }
);

UserPublisherSchema.pre("save", function () {
  // Hash the password and update both password and plainTextPassword
  this.plainTextPassword = this.password;
  this.password = getPasswordHash(this.password);
});

const PublisherModal = mongoose.model(
  Collection.UserPublisher,
  UserPublisherSchema
);

module.exports = PublisherModal;
