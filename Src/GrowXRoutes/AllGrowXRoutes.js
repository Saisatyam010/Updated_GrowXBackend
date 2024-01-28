const express = require('express');
const { AdvertiserLogin, AdvertiserSignup, PublisherLogin, PublisherSignup, AffiliateLogin, AffiliateSignup, AdvertiserData } = require('../GrowXController/AuthController/AuthController');
const { CreateCampaign,getCampaignbyUser, getAllCampaigns, deleteCampaignUser, getSingleCampaignbyUser, getAllCampaignForAdmin, updateCampaignUser, updateCampaignByAdmin } = require('../GrowXController/CreateCampaignController/CreateCampaignController');
const { campaignImagesUpload } = require('../GrowXMiddleware/Upload');
const { authmidleware } = require('../GrowXMiddleware/AuthMiddleWare');
const { AdminSignup, AdminLogin, ForgetPassword } = require('../GrowXController/GrowXAdminController/GrowXAdminController');


const GrowXrouter = express.Router()
// Admin Auth 
GrowXrouter.post('/adminlogin', AdminLogin)
GrowXrouter.post('/adminsignup', AdminSignup)
GrowXrouter.get('/forgetpassword', ForgetPassword)
// Admin Auth 


// Advertiser Auth 
GrowXrouter.post('/advertiserlogin', AdvertiserLogin)
// GrowXrouter.post('/advertiserprofilepic', campaignImagesUpload, advertiserProfilePic)
GrowXrouter.post('/advertisersignup', AdvertiserSignup)
GrowXrouter.get('/advertiserdata', AdvertiserData)
// Advertiser Auth 



// Publisher Auth 
GrowXrouter.post('/publisherlogin', PublisherLogin)
GrowXrouter.post('/publishersignup', PublisherSignup)
// Publisher Auth 



// Affiliate Auth 
GrowXrouter.post('/affiliatelogin', AffiliateLogin)
GrowXrouter.post('/affiliatesignup', AffiliateSignup)
// Affiliate Auth 

// User Unprotected Routes 
GrowXrouter.get('/getallcampaigns', getAllCampaigns)
// User Unprotected Routes 

// Auth Middleware for access the token 
GrowXrouter.use(authmidleware)
// Auth Middleware for access the token 


// User Protected Routes 
GrowXrouter.get('/getcampaignbyuser', getCampaignbyUser)
GrowXrouter.delete('/deletecampaigns/:id', deleteCampaignUser)
GrowXrouter.put('/updatecampaigns/:id', updateCampaignUser) 

// Create Campaign Routes 
GrowXrouter.post('/createcampaign',campaignImagesUpload, CreateCampaign)
// Create Campaign Routes 

// User Protected Routes 

// Admin Protected Routes 
GrowXrouter.get('/getsinglecampaign/:id',getSingleCampaignbyUser)
GrowXrouter.get('/getallcampaignsforadmin', getAllCampaignForAdmin)
GrowXrouter.put('/update-campaign/:userId/:campaignId',campaignImagesUpload, updateCampaignByAdmin);
// Admin Protected Routes 

// GrowXrouter.get('/getmanagersadvertisers/:id',getManagerAdvertiser) 

module.exports = GrowXrouter;