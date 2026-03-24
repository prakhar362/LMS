const express=require('express');
const User=require('../../models/User');
const {registerUser,loginUser}=require('../../controllers/auth-controller/index');
const authenticateMiddleware=require('../../middleware/auth-middleware');
const router=express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get("/check-auth", authenticateMiddleware, async (req, res) => {
  const userPayload = req.user;
  const user = await User.findById(userPayload._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    data: {
      user: {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
        role: user.role,
        credits: user.credits,
      },
    },
  });
});
module.exports =router;