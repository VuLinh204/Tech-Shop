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

export const changePassword = async (oldPassword, newPassword, email, id) => {
    try {
        const response = await axios.post(
            `${API_URL}/changePassword.php`,
            {
                oldPassword,
                newPassword,
                email,
                id
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

export const sendOtp = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/sendOtp.php`, { email }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

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

export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/getProducts.php`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm.' };
    }
};

export const getProductsSearch = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search.php`, {
            params: { query: query },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/CategoryApi.php`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi lấy danh sách sản phẩm.' };
    }
};

export const getProductsByCategory = async (categoryIds) => {
    try {
        const response = await axios.post(`${API_URL}/getProductsByCategories.php`, {
            categoryIds: categoryIds,
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API getProductsByCategory:', error);
        throw error;
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
        const response = await axios.get(`${API_URL}/product_api.php?action=view&id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error create product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi sửa tạo sản phẩm.' };
    }
};

export const updateProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/product_api.php`, {
            method: 'POST',
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
            method: 'POST',
            body: data,
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error create product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi xóa tạo sản phẩm.' };
    }
};

export const searchProduct = async ($keyword) => {
    try {
        const response = await axios.get(`${API_URL}/product_api.php?action=search&keyword=${$keyword}`);
        return response.data;
    } catch (error) {
        console.error('Error create product: ', error);
        return { status: 'error', message: 'Có lỗi xảy ra khi xóa tạo sản phẩm.' };
    }
};

export const addToCart = async (userId, productId, quantityToAdd, selectedColor) => {
    try {
        const response = await axios.post(`${API_URL}/cart.php`, {
            action: 'add_to_cart',
            user_id: userId,
            product_id: productId,
            quantity: quantityToAdd,
            color: selectedColor,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const deleteToCart = async (cartItemId) => {
    try {
        const response = await axios.post(`${API_URL}/cart.php`, {
            action: 'delete_cart_item',
            cart_item_id: cartItemId,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const clearCart = async (userId) => {
    try {
        const response = await axios.post(`${API_URL}/clearCart.php`, {
            user_id: userId,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const updateToCart = async (userId, productId, quantity, color) => {
    try {
        const response = await axios.post(`${API_URL}/cart.php`, {
            action: 'update_cart_item',
            user_id: userId,
            product_id: productId,
            quantity: quantity,
            color: color,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const getProductsCart = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/cart.php?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { success: false, errors: [error.message] };
    }
};

export const checkoutOrder = async (checkoutData) => {
    try {
        const response = await axios.post(`${API_URL}/checkout.php`, checkoutData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        return { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau.' };
    }
};


export const getRelatedProducts = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/relatedProducts.php?product_id=${productId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json(); // Parse JSON response

        if (result.status === "success" && result.related_products) {
            return result.related_products;
        } else {
            // Return empty array if no related products or error
            console.log("No related products found:", result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching related products:', error);
        return []; // Return empty array on error
    }
};


