const mongoose = require("mongoose");
require("../../GrowXConfig/GrowX_db");
const Collection = require("../../GrowXConfig/Collection");
const { getPasswordHash } = require("../../GrowXUtils/GrowXUtils");
const AdminModal = require("../GrowXAdminModals/GrowXAdminModals");

const UserAdvertiserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Fullname is required field"] },
    userName: { type: String, required: [true, "Username is required field"] },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
    },
    AdvertiserProfilePic: { type: String, default: ""},
    password: { type: String, required: [true, "Password is required field"] },
    company: { type: String, required: [true, "Company is required field"] },
    country: { type: String, required: [true, "Country is required field"] },
    messenger: {
      type: String,
      required: [true, "Messenger is required field"],
    },
    messengerDetails: {
      type: String,
      resquired: [true, "Messengerdetails is required field"],
    },
    managerId: { type: mongoose.SchemaTypes.ObjectId, ref: AdminModal },
  },
  { timestamps: true }
);
UserAdvertiserSchema.pre("save", function () {
  // Hash the password and update both password and plainTextPassword
  this.plainTextPassword = this.password;
  this.password = getPasswordHash(this.password);
});

const AdvertiserModal = mongoose.model(
  Collection.UserAdvertiser,
  UserAdvertiserSchema
);

module.exports = AdvertiserModal;
