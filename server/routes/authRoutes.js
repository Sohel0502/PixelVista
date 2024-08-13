const router = require('express').Router()
const {login, signup, refresh, switchProfile  } = require("../controlllers/authControllers")
const { verifyToken } = require("../middleware/verifyToken")

router.post("/login", login)
router.post("/signup", signup)
router.get("refresh", refresh)
router.get("/switch", verifyToken, switchProfile);

module.exports = router;