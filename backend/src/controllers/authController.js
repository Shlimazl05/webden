const User = require('../models/User');
const authService = require('../services/authService');

// 1. ĐĂNG KÝ
const register = async (req, res) => {
  try {
    // Gọi hàm registerUser từ authService
    const user = await authService.registerUser(req.body);
    
    res.status(201).json({
      message: "Đăng ký thành công",
      data: { 
        id: user._id, 
        username: user.username,
        phone: user.phone 
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. ĐĂNG NHẬP
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        
        // Gọi hàm loginUser từ authService
        const result = await authService.loginUser(identifier, password);
        
        res.status(200).json({
            message: "Đăng nhập thành công!",
            data: {
                token: result.token,
                user: result.user
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. ĐĂNG XUẤT
const logout = (req, res) => {
    // Với JWT, việc đăng xuất chủ yếu thực hiện ở Frontend (xóa token)
    res.status(200).json({ message: "Đăng xuất thành công!" });
};

// 4. LẤY THÔNG TIN CÁ NHÂN
const getProfile = async (req, res) => {
    try {
        // req.user.id lấy từ middleware xác thực (nếu bạn đã viết middleware)
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ------ thong tin tai khoan -------//
const updateProfile = async (req, res) => {
    try {
        const user = await authService.updateUserProfile(req.user.id, req.body);
        res.status(200).json({ message: "Cập nhật thành công", data: user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ------ doi mat khau----- //
const changePassword = async (req, res) => {
    try {
        await authService.changePassword(req.user.id, req.body);
        res.status(200).json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// QUAN TRỌNG: Export tất cả các hàm bằng cách này để đồng nhất
module.exports = {
    register,
    login,
    logout,
    getProfile,
    updateProfile, 
    changePassword
};