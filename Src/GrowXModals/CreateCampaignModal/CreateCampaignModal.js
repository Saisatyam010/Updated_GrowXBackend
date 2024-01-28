const mongoose = require("mongoose");
require("../../GrowXConfig/GrowX_db");
const Collection = require("../../GrowXConfig/Collection");
const { AdvertiserLogin } = require("../../GrowXController/AuthController/AuthController");

const CampaignSchema = new mongoose.Schema({
  campaignName: { type: String },
  connectionType: {
    type: [String],
    required: true
  },
  pricingType: { type: String },
  adUnitCategory: { type: String },
  trafficType: {
    type: [String],
    required: true
  }, //
  landingUrl: { type: String },
  deviceFormat: {
    type: [String],
    required: true
  }, //
  countries: {
    type: [String],
    required: true
  }, 
  tBudget: { type: Number },
  dBudget: { type: Number },
  afterVerification: { type: String },
  campaignStatus: { type: String, default: "pending" },
  createcampaign_images: {
    type: [String],
    required: true
  },

  targetingType: { type: String },

  impressions: { type: Number },
  period: { type: Number },
  periodType: { type: String },
  totalLimits: { type: Number },
  dailyLimits: { type: Number },
  hourlyLimits: { type: Number },
  totalBudgetLimits: { type: Number },
  dailyBudgetLimits: { type: Number },
  hourlyBudgetLimits: { type: Number },


  addPlacements: { type: String },
  placementValue: { type: String },
  ipRangeTargeting: { type: String },
  placements: { type: Number },
  countryCodes: { type: Number },
  price: { type: Number },

}, { timestamps: true });

const CreateCampaignSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdvertiserModal' },
  campaigns: [CampaignSchema],
}, { timestamps: true });

const CreateCampaignModal = mongoose.model(Collection.CreateCampaign, CreateCampaignSchema);

module.exports = CreateCampaignModal;