const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---- HÀM ĐĂNG KÝ ------// 

const registerUser = async (userData) => {
  
  const { username, phone, password, email, address, role, confirmPassword } = userData;

  // 1. Kiểm tra tên đăng nhập
  const usernameRegex = /^[a-zA-Z0-9_]{6,20}$/;
  if (!username) throw new Error('Vui lòng nhập tên đăng nhập');
  if (!usernameRegex.test(username)) {
    throw new Error('Tên đăng nhập từ 6-20 ký tự, không chứa dấu hoặc ký tự đặc biệt');
  }

  // 2. Kiem tra so dien thoai 
  const phoneRegex = /^0[0-9]{9}$/;
  if (!phone) throw new Error('Vui lòng nhập số điện thoại');
  if (!phoneRegex.test(phone)) {
    throw new Error('Số điện thoại không hợp lệ');
  }

  // 3. Kiểm tra Mật khẩu
  if (!password || password.length < 6) {
    throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
  }

  // 4. Kiểm tra Xác nhận mật khẩu
  if (password !== confirmPassword) {
    throw new Error('Mật khẩu xác nhận không khớp');
  }

  // 5. Kiểm tra trùng lặp trong Database (Báo lỗi riêng từng trường)
  const isUsernameExist = await User.findOne({ username });
  if (isUsernameExist) throw new Error('Tên đăng nhập này đã được sử dụng');

  const isPhoneExist = await User.findOne({ phone });
  if (isPhoneExist) throw new Error('Số điện thoại này đã được đăng ký');

  if (email) {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) throw new Error('Email này đã được sử dụng');
  }
  
  // 6. Mã hóa và lưu
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    phone,
    password: hashedPassword,
    email: email || null,
    address: address || '',
    role: role || 'Customer'
  });

  const userResponse = newUser.toObject();
  delete userResponse.password;
  return userResponse;
};


// --- HAM DANG NHAP ------//
const loginUser = async (identifier, password) => {
    // 1. Kiểm tra xem có để trống không
    if (!identifier) {
        throw new Error("Vui lòng nhập tên đăng nhập hoặc số điện thoại!");
    }
    if (!password) {
        throw new Error("Vui lòng nhập mật khẩu!");
    }

    // 2. Kiểm tra định dạng của identifier
    const usernameRegex = /^[a-zA-Z0-9_]{6,20}$/; // Định dạng giống lúc đăng ký
    const phoneRegex = /^0[0-9]{9}$/;           // Định dạng giống lúc đăng ký
    
    const isPhone = phoneRegex.test(identifier);
    const isUsername = usernameRegex.test(identifier);

    
    if (!isPhone && !isUsername) {
        throw new Error("Tài khoản không đúng định dạng (Tên đăng nhập hoặc Số điện thoại)!");
    }

    // 3. Kiểm tra độ dài mật khẩu tối thiểu (để tránh gửi pass quá ngắn lên DB)
    if (password.length < 6) {
        throw new Error("Mật khẩu không chính xác!"); // Báo chung chung để bảo mật
    }
    // ----- TIM TAI KHOAN TRONG DB --------//

    const user = await User.findOne({
        $or: [{ username: identifier }, { phone: identifier }]
    });
    
    if (!user) throw new Error("Tài khoản không tồn tại!");
    
    // 5. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu không chính xác!");

    // 6. Kiểm tra trạng thái (Nếu bạn có trường status trong Model)
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