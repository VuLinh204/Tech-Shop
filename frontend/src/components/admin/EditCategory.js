import React, { useState, useEffect } from 'react';
import '../../assets/css/AddCategory.css';
import axios from 'axios';

const EditCategory = ({ categoryData, onEditSuccess }) => {
    const [name, setName] = useState(categoryData ? categoryData.name : '');
    const [thumbnail, setThumbnail] = useState(categoryData ? categoryData.thumbnail : '');
    const [preview, setPreview] = useState(
        categoryData ? `http://localhost/tech-shop/backend/public/uploads/${categoryData.thumbnail}` : '',
    );
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isNameValid, setIsNameValid] = useState(true); // Biến để kiểm tra tính hợp lệ của tên

    useEffect(() => {
        if (categoryData) {
            setName(categoryData.name);
            setThumbnail(categoryData.thumbnail);
            setPreview(`http://localhost/tech-shop/backend/public/uploads/${categoryData.thumbnail}`);
        }
    }, [categoryData]);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file); // Lưu tệp ảnh mới
            setPreview(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        // Kiểm tra tính hợp lệ của tên
        const regex = /^[a-zA-Z0-9]+$/; // Chỉ cho phép ký tự a-z, A-Z và 0-9
        if (regex.test(value) && value.length <= 50) {
            setIsNameValid(true); // Nếu hợp lệ thì set true
            setError(''); // Reset lỗi
        } else {
            setIsNameValid(false); // Nếu không hợp lệ thì set false
        }
    };

    const handleUpdateCategory = async () => {
        if (!isNameValid || !name || !thumbnail) {
            setError('Vui lòng điền đầy đủ thông tin hợp lệ!');
            return;
        }

        const formData = new FormData();
        formData.append('id', categoryData.id);
        formData.append('name', name);
        formData.append('thumbnail', thumbnail);
        formData.append('action', 'update'); // Thêm thông tin để xác định là cập nhật

        try {
            await axios.post('http://localhost/tech-shop/backend/api/CategoryApi.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Cập nhật danh mục thành công!');
            setError('');
            onEditSuccess();
        } catch (error) {
            console.error('Lỗi khi cập nhật danh mục:', error);
            setError('Đã xảy ra lỗi khi cập nhật danh mục.');
            setMessage('');
        }
    };

    return (
        <div className="add-category">
            <h2>Chỉnh sửa danh mục</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label>Tên danh mục</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className={isNameValid ? '' : 'error'} // Thêm lớp CSS khi tên không hợp lệ
                    />
                </div>
                <div className="form-group">
                    <label>Thumbnail hiện tại</label> <br />
                    {preview && (
                        <img
                            src={preview}
                            alt="Thumbnail hiện tại"
                            className="thumbnail-preview"
                            style={{ maxWidth: '200px' }}
                        />
                    )}
                    <br />
                    <br />
                    <label>Chọn Thumbnail cần thay</label>
                    <input type="file" onChange={handleThumbnailChange} accept="image/*" />
                </div>
                {message && <div className="message">{message}</div>}
                {error && <div className="error">{error}</div>}
                <button className="btn btn--primary" type="button" onClick={handleUpdateCategory}>
                    Cập nhật danh mục
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
