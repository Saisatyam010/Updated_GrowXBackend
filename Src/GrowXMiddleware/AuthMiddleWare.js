const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../GrowXConstant/GrowXConstant");

exports.authmidleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log(JSON.stringify(decoded) + "decoded");
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.json({
        success: false,
        message: "Unothorization token",
      });
    }
  } catch (err) {
    res.json({
      success: false,
      message: "Unothorization token",
    });
  }
};
