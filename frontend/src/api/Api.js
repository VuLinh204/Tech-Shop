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
