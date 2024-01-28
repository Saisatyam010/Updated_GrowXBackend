const twt = require("jsonwebtoken");
const { isValidPassword } = require("../../GrowXUtils/GrowXUtils");
const { JWT_SECRET_KEY } = require("../../GrowXConstant/GrowXConstant");
const AdvertiserModal = require("../../GrowXModals/AllAuthModal/AdvertiserModal");
const PublisherModal = require("../../GrowXModals/AllAuthModal/PublishersModal");
const AffiliateModal = require("../../GrowXModals/AllAuthModal/AffiliateModal");

const express = require("express");
const AdminModal = require("../../GrowXModals/GrowXAdminModals/GrowXAdminModals");

// Advertiser Auth

exports.AdvertiserLogin = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const data_come = {
      email: data.email,
      password: data.password,
    };
    const ress = await AdvertiserModal.findOne({ email: data_come.email });
    if (ress) {
      const isValid = isValidPassword(data_come.password, ress.password);
      if (isValid) {
        const token = twt.sign({ id: ress._id }, JWT_SECRET_KEY);
        res.json({
          status: "success",
          message: "login sucessfully",
          data: ress,
          token: token,
        });
      } else {
        res.json({
          status: "fail",
          message: "password is not correct",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "email is not correct",
      });
    }
  } catch (error) {
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
exports.AdvertiserSignup = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const data_come = {
      fullName: data.fullName,
      userName: data.userName,
      email: data.email,
      password: data.password,
      company: data.company,
      country: data.country,
      messenger: data.messenger,
      messengerDetails: data.messengerDetails,
    };
    const ress = await AdvertiserModal.create(data_come);
    if (ress) {
      res.json({
        status: "success",
        message: "signup sucessfully",
        data: ress,
      });
    } else {
      res.json({
        status: "fail",
      });
    }
  } catch (error) {
    console.log(error);
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

exports.AdvertiserData = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const ress = await AdvertiserModal.find();
    if (ress) {
      res.json({
        status: "success",
        message: "data sucessfully",
        data: ress,
      });
    } else {
      res.json({
        status: "fail",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Advertiser Auth

// Publisher Auth
exports.PublisherLogin = async (req, res) => {
  try {
    const data = req.body;
    const data_come = {
      email: data.email,
      password: data.password,
    };
    const ress = await PublisherModal.findOne({ email: data_come.email });
    if (ress) {
      const isValid = isValidPassword(data_come.password, ress.password);
      if (isValid) {
        const token = twt.sign({ id: ress._id }, JWT_SECRET_KEY);
        res.json({
          status: "success",
          message: "login sucessfully",
          data: ress,
          token: token,
        });
      } else {
        res.json({
          status: "fail",
          message: "password is not correct",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "email is not correct",
      });
    }
  } catch (error) {
    console.log(error);
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

exports.PublisherSignup = async (req, res) => {
  try {
    const data = req.body;

    const data_come = {
      fullName: data.fullName,
      userLogin: data.userLogin,
      country: data.country,
      email: data.email,
      password: data.password,
      messenger: data.messenger,
      messengerDetails: data.messengerDetails,
      paymentMethod: data.paymentMethod,
    };

    const ress = await PublisherModal.create(data_come);
    if (ress) {
      res.json({
        status: "success",
        message: "signup sucessfully",
        data: ress,
      });
    } else {
      res.json({
        status: "fail",
      });
    }
  } catch (error) {
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
// Publisher Auth

// Affiliate Auth
exports.AffiliateLogin = async (req, res) => {
  try {
    const data = req.body;
    const data_come = {
      email: data.email,
      password: data.password,
    };
    const ress = await AffiliateModal.findOne({ email: data_come.email });
    if (ress) {
      const isValid = isValidPassword(data_come.password, ress.password);
      if (isValid) {
        const token = twt.sign({ id: ress._id }, JWT_SECRET_KEY);
        res.json({
          status: "success",
          message: "login sucessfully",
          data: ress,
          token: token,
        });
      } else {
        res.json({
          status: "fail",
          message: "password is not correct",
        });
      }
    } else {
      res.json({
        status: "fail",
        message: "email is not correct",
      });
    }
  } catch (error) {
    console.log(error);
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

exports.AffiliateSignup = async (req, res) => {
  try {
    const data = req.body;

    const data_come = {
      fullName: data.fullName,
      userLogin: data.userLogin,
      email: data.email,
      password: data.password,
      messenger: data.messenger,
      messengerDetails: data.messengerDetails,
      paymentMethod: data.paymentMethod,
      // company: data.company,
    };

    const ress = await AffiliateModal.create(data_come);
    if (ress) {
      res.json({
        status: "success",
        message: "signup sucessfully",
        data: ress,
      });
    } else {
      res.json({
        status: "fail",
      });
    }
  } catch (error) {
    console.log(error);

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

// Affiliate Auth
