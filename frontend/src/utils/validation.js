export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

export const validatePassword = (password) => {
    // Kiểm tra mật khẩu ít nhất 6 ký tự, bao gồm chữ cái và số
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordPattern.test(password);
};

export const validateRequired = (value) => {
    return value.trim() !== '';
};

export const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword;
};
