import axios from 'axios';

const API_URL = 'http://localhost/Tech-Shop/backend/api';

export const Login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login.php`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in: ', error);
    }
};

// Hàm gọi API lấy thông tin người dùng
export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/getUser.php`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi lấy thông tin người dùng.' };
    }
};

export const updateUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/updateUser.php`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        return { status: 'error', message: 'Không thể cập nhật thông tin người dùng.' };
    }
};

// Hàm gọi API để đổi mật khẩu
export const changePassword = async (oldPassword, newPassword, email) => {
    try {
        const response = await axios.post(
            `${API_URL}/changePassword.php`,
            {
                oldPassword,
                newPassword,
                email,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error('Có lỗi khi đổi mật khẩu: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi đổi mật khẩu.' };
    }
};

// Hàm gọi API gửi OTP
export const sendOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/sendOtp.php`, { email }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Hàm gọi API xác thực OTP
export const verifyOtp = async (email, otp) => {
    try {
        const response = await axios.post(
            `${API_URL}/verifyOtp.php`,
            { email, otp },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } },
        );
        return response.data;
    } catch (error) {
        return { errors: error.response ? error.response.data.errors : ['OTP verification failed.'] };
    }
};

// Hàm gọi API để tạo mật khẩu mới sau khi xác thực OTP
export const createPassword = async (password) => {
    try {
        const response = await axios.post(`${API_URL}/createPassword.php`, { password });
        return response.data;
    } catch (error) {
        return { success: false, errors: [error.message] };
    }
};

export const createUser = async (userData, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/createUser.php`, userData, { email, password });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await axios.post(`${API_URL}/resetPassword.php`, { email, newPassword });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

// Ví dụ hàm đăng xuất
export const logout = async () => {
    try {
        const response = await axios.post(
            `${API_URL}/logout.php`,
            {},
            {
                withCredentials: true,
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error logging out: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi đăng xuất.' };
    }
};

// Ví dụ hàm lấy danh sách sản phẩm
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getProducts.php`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm.' };
    }
};


export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/product_api.php`, {
            method: "POST",
            body: productData,
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error creating product:', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi tạo sản phẩm.' };
    }
};


export const getDetailProduct = async (id) => {
    try {
        const response = await axios.get(
            `${API_URL}/product_api.php?action=view&id=${id}`,
        );
        return response.data;
    } catch (error) {
        console.error('Error create product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi sửa tạo sản phẩm.' };
    }
};

export const updateProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/product_api.php`, {
            method: "POST",
            body: productData,
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error update product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi sửa sản phẩm.' };
    }
};

export const deleteProduct = async (data) => {
    try {
        const response = await fetch(`${API_URL}/product_api.php`, {
            method: "POST",
            body: data,
        });
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error('Error create product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi xóa tạo sản phẩm.' };
    }
};