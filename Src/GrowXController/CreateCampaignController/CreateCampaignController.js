//    Create Campaign Controller

const AdvertiserModal = require("../../GrowXModals/AllAuthModal/AdvertiserModal");

const CreateCampaignModal = require("../../GrowXModals/CreateCampaignModal/CreateCampaignModal");

//    Create Campaign Controller
// Controller for User Campaigns

exports.CreateCampaign = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const data_come = {
      campaignName: data.campaignName,
      connectionType: data.connectionType,
      pricingType: data.pricingType,
      adUnitCategory: data.adUnitCategory,
      trafficType: data.trafficType,
      landingUrl: data.landingUrl,
      deviceFormat: data.deviceFormat,
      createcampaign_images: req.files?.map((ele) => ele.filename),
      countries: data.countries,
      tBudget: data.totalBudget,
      dBudget: data.dailyBudget,
      afterVerification: data.afterVerification,
      campaignStatus: data.campaignStatus,
      targetingType: data.targetingType,
      impressions: data.impressions,
      period: data.period,
      periodType: data.periodType,
      totalLimits: data.totalLimits,
      dailyLimits: data.dailyLimits,
      hourlyLimits: data.hourlyLimits,
      totalBudgetLimits: data.totalBudgetLimits,
      dailyBudgetLimits: data.totalBudgetLimits,
      hourlyBudgetLimits: data.totalBudgetLimits,
      addPlacements: data.addPlacements,
      placementValue: data.placementValue,
      ipRangeTargeting: data.ipRangeTargeting,
      placements: data.placements,
      countryCodes: data.countryCodes,
      price: data.price,
    };

    // console.log(JSON.stringify(res, null, 2));

    //    Check if the user already has a campaign
    const userCampaign = await CreateCampaignModal.findOne({ user: userId });

    if (userCampaign) {
      // If the user already has a campaign, push the new campaign to the array
      userCampaign.campaigns.push(data_come);
      await userCampaign.save();

      res.json({
        status: "success",
        message:
          "Create Campaign successfully and added to existing user campaigns.",
        data: userCampaign,
      });
    } else {
      // If the user doesn't have a campaign, create a new one
      const newCampaign = await CreateCampaignModal.create({
        user: userId,
        campaigns: [data_come],
      });

      res.json({
        status: "success",
        message: "Create Campaign successfully.",
        data: newCampaign,
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {};
    resError.status = "failed";
    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError);
  }
};

exports.getCampaignbyUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    // Ensure userId exists
    if (!userId) {
      return res.json({
        status: "fail",
        message: "User ID is missing in the request.",
      });
    }

    const userCampaign = await CreateCampaignModal.findOne({ user: userId })
      .populate({
        path: "user",
        model: AdvertiserModal,
        select:
          "fullName userName email company country messenger messengerDetails",
      })
      .lean(); // Use lean() to get a plain JavaScript object

    if (userCampaign) {
      res.json({
        status: "success",
        message: "Get Campaign successfully.",
        data: userCampaign,
      });
    } else {
      res.json({
        status: "fail",
        message: "No Campaign Found",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error fetching user campaign.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};

exports.deleteCampaignUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaignId = req.params.id;

    // Ensure userId and campaignId exist
    if (!userId || !campaignId) {
      return res.json({
        status: "fail",
        message: "User ID or Campaign ID is missing in the request.",
      });
    }

    // Find the user's document and update the array by pulling the specified campaignId
    const updatedUser = await CreateCampaignModal.findOneAndUpdate(
      { user: userId },
      { $pull: { campaigns: { _id: campaignId } } },
      { new: true }
    ).lean();

    if (updatedUser) {
      res.json({
        status: "success",
        message: "Campaign deleted and user document updated successfully.",
        data: updatedUser,
      });
    } else {
      res.json({
        status: "fail",
        message: "Campaign not found or could not be deleted.",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error deleting campaign.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};

exports.updateCampaignUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const campaignId = req.params.id;
    const data = req.body;

    // Ensure userId and campaignId exist
    if (!userId || !campaignId) {
      return res.json({
        status: "fail",
        message: "User ID or Campaign ID is missing in the request.",
      });
    }

    // Find the user's document and update the array by pulling the specified campaignId
    const updatedUser = await CreateCampaignModal.findOneAndUpdate(
      { user: userId, "campaigns._id": campaignId },
      {
        $set: {
          "campaigns.$.campaignName": data.campaignName,
          "campaigns.$.connectionType": data.connectionType,
          "campaigns.$.pricingType": data.pricingType,
          "campaigns.$.adUnitCategory": data.adUnitCategory,
          "campaigns.$.trafficType": data.trafficType,
          "campaigns.$.landingUrl": data.landingUrl,
          "campaigns.$.deviceFormat": data.deviceFormat,
          "campaigns.$.countries": data.countries,
          "campaigns.$.totalBudget": data.totalBudget,
          "campaigns.$.dailyBudget": data.dailyBudget,
          "campaigns.$.afterVerification": data.afterVerification,
          "campaigns.$.campaignStatus": data.campaignStatus,
        },
      },
      { new: true }
    ).lean();

    if (updatedUser) {
      res.json({
        status: "success",
        message: "Campaign updated successfully.",
        data: updatedUser,
      });
    } else {
      res.json({
        status: "fail",
        message: "Campaign not found or could not be updated.",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error updating campaign.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};



exports.getSingleCampaignbyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    // Ensure userId exists
    if (!userId) {
      return res.json({
        status: "fail",
        message: "User ID is missing in the request.",
      });
    }

    const userCampaign = await CreateCampaignModal.findOne({ user: userId })
      .populate({
        path: "user",
        model: AdvertiserModal,
        select: "fullName userName ",
      })
      .lean(); // Use lean() to get a plain JavaScript object
    console.log(userCampaign);
    const updatedCampaign = userCampaign.campaigns.map((ele) => {
      return {
        ...ele,
        createcampaign_images: ele?.createcampaign_images?.map((img) => img),
      };
    });
    userCampaign.campaigns = updatedCampaign;
    if (userCampaign) {
      res.json({
        status: "success",
        message: "Get Campaign successfully.",
        data: userCampaign,
      });
    } else {
      res.json({
        status: "fail",
        message: "No Campaign Found",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error fetching user campaign.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};


// Controller for User Campaigns

// campaigns Controller for admin
exports.getAllCampaigns = async (req, res) => {
  try {
    // const managerId = req.user.id;
    // Fetch all campaigns and populate user details
    const userCampaigns = await CreateCampaignModal.find({})
      .populate({
        path: "user",
        model: AdvertiserModal,
        select: "fullName userName ",
      })
      .lean(); // Adding clean() to convert Mongoose documents to plain JavaScript objects

    const modifiedUserampaigns = userCampaigns.map((user) => {
      const totalCampaigns = user.campaigns.length;
      const approvedCampaigns = user.campaigns.filter((campaign) => {
        return campaign.campaignStatus == "approved";
      }).length;
      const rejectedCampaigns = user.campaigns.filter((campaign) => {
        return campaign.campaignStatus == "rejected";
      }).length;
      return {
        user: user.user,
        totalCampaigns,
        rejectedCampaigns,
        approvedCampaigns,
      };
    });

    if (userCampaigns.length > 0) {
      res.json({
        status: "success",
        message: "Get Campaigns successfully.",
        data: modifiedUserampaigns,
      });
    } else {
      res.json({
        status: "fail",
        message: "No Campaigns Found",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error fetching campaigns.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }
    res.json(resError);
  }
};
exports.getAllCampaignForAdmin = async (req, res) => {
  try {
    // Fetch all campaigns and populate user details
    const userCampaigns = await CreateCampaignModal.find({})
      .populate({
        path: "user",
        model: AdvertiserModal,
        select: "fullName userName ",
      })
      .lean(); // Adding clean() to convert Mongoose documents to plain JavaScript objects
    const campaigns = userCampaigns.map((ele1) =>
      ele1.campaigns.map((ele) => {
        return { ...ele, user: ele1.user };
      })
    );

    if (userCampaigns.length > 0) {
      res.json({
        status: "success",
        message: "Get Campaigns successfully.",

        user: campaigns,
      });
    } else {
      res.json({
        status: "fail",
        message: "No Campaigns Found",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error fetching campaigns.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};
exports.updateCampaignByAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`userId is !update ${userId}`);

    const campaignId = req.params.campaignId;
    console.log(`campaignId is !update ${campaignId}`);
    const data = req.body;
    console.log(`data is !update ${JSON.stringify(data)}`);

    // Ensure userId and campaignId exist
    if (!userId || !campaignId) {
      return res.json({
        status: "fail",
        message: "User ID or Campaign ID is missing in the request.",
      });
    }

    // Find the user's document and update the array by pulling the specified campaignId
    const updatedUser = await CreateCampaignModal.findOneAndUpdate(
      { user: userId, "campaigns._id": campaignId },
      {
        $set: {
          "campaigns.$.campaignName": data.campaignName,
          "campaigns.$.connectionType": data.connectionType,
          "campaigns.$.pricingType": data.pricingType,
          "campaigns.$.adUnitCategory": data.adUnitCategory,
          "campaigns.$.trafficType": data.trafficType,
          "campaigns.$.landingUrl": data.landingUrl,
          "campaigns.$.deviceFormat": data.deviceFormat,
          "campaigns.$.countries": data.countries,
          "campaigns.$.totalBudget": data.totalBudget,
          "campaigns.$.dailyBudget": data.dailyBudget,
          "campaigns.$.afterVerification": data.afterVerification,
          "campaigns.$.campaignStatus": data.campaignStatus,
        },
      },
      { new: true }
    ).lean();

    if (updatedUser) {
      res.json({
        status: "success",
        message: "Campaign updated successfully.",
        data: updatedUser,
      });
    } else {
      res.json({
        status: "fail",
        message: "Campaign not found or could not be updated.",
      });
    }
  } catch (error) {
    console.error(error);
    const resError = {
      status: "failed",
      message: "Error updating campaign.",
    };

    if (error.name === "ValidationError") {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      resError.error = errors;
    }

    res.json(resError);
  }
};
// campaigns Controller for admin