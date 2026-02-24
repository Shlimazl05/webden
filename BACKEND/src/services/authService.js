const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { username, phone, password } = userData;

  // 1. Kiểm tra người dùng đã tồn tại chưa
  const existingUser = await User.findOne({ $or: [{ username }, { phone }] });
  if (existingUser) {
    throw new Error('Tên đăng nhập hoặc số điện thoại đã tồn tại');
  }

  // 2. Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Lưu vào DB
  const newUser = await User.create({
    username,
    phone,
    password: hashedPassword
  });

  // Tối ưu: Loại bỏ password trước khi trả về
  const userResponse = newUser.toObject();
  delete userResponse.password;

  return userResponse;
};

const loginUser = async (identifier, password) => {
    // 1. Tìm user theo username HOẶC phone
    const user = await User.findOne({
        $or: [{ username: identifier }, { phone: identifier }]
    });
    
    if (!user) throw new Error("Tài khoản không tồn tại!");

    // 2. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu không chính xác!");

    // 3. Kiểm tra trạng thái (Nếu bạn có trường status trong Model)
    if (user.status === 0) throw new Error("Tài khoản đã bị khóa!");

    // 4. Tạo JWT
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "Bi_Mat_123",
        { expiresIn: '30d' }
    );

    // Tối ưu: Loại bỏ password trước khi trả về
    const userResponse = user.toObject();
    delete userResponse.password;

    return { token, user: userResponse };
};

module.exports = { registerUser, loginUser };