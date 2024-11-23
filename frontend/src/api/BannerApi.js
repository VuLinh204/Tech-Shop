import axios from 'axios';

const API_URL = 'http://localhost/Tech-Shop/backend/api';

// Lấy danh sách banner
export const getBanners = async () => {
    try {
        const response = await axios.get(`${API_URL}/banners.php`);
        return response.data;
    } catch (error) {
        console.error('Error fetching banners: ', error.response || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách banner.',
        };
    }
};

// Thêm banner
export const addBanner = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/banners.php`, formData, {
        });
        return response.data;
    } catch (error) {
        console.error('Error adding banner: ', error.response || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Có lỗi xảy ra khi thêm banner.',
        };
    }
};

// Cập nhật banner
export const updateBanner = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/banners.php`, formData, {
        });
        return response.data;
    } catch (error) {
        console.error('Error updating banner: ', error.response || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật banner.',
        };
    }
};

// Xóa banner
export const deleteBanner = async (bannerId) => {
    try {
        const response = await axios.post(`${API_URL}/banners.php`, {action: 'delete', id: bannerId});
        return response.data;
    } catch (error) {
        console.error('Error deleting banner: ', error.response || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Có lỗi xảy ra khi xóa banner.',
        };
    }
};

