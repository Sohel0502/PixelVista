const { verifyToken } = require("../middleware/verifyToken");
const {
  generateOrder,
  verifyOrder,
} = require("../controlllers/paymentControllers");

const router = require("express").Router();

router.post("/payment/generate", verifyToken, generateOrder);
router.post("/payment/verify", verifyToken, verifyOrder);

module.exports = router;