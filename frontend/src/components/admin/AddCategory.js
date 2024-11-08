import React, { useState } from 'react';
import '../../assets/css/AddCategory.css';

const AddCategory = ({ onAddSuccess }) => {
    const [name, setName] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isNameValid, setIsNameValid] = useState(true);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setThumbnail(reader.result);
                    setSelectedFile(file);
                };
                reader.readAsDataURL(file);
            } else {
                setError('Chỉ cho phép chọn file JPG hoặc PNG.');
                setThumbnail(''); // Reset thumbnail nếu file không hợp lệ
                setSelectedFile(null);
            }
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isNameValid) {
            setError('Tên danh mục không hợp lệ! Chỉ cho phép ký tự a-z, A-Z và 0-9, và không quá 50 ký tự.');
            return; // Dừng thực hiện nếu tên không hợp lệ
        }

        setMessage(''); // Reset message mỗi lần submit
        setError(''); // Reset error mỗi lần submit

        const formData = new FormData();
        formData.append('name', name);
        formData.append('thumbnail', selectedFile); // Thêm file hình ảnh vào formData

        try {
            const response = await fetch('http://localhost/tech-shop/backend/api/CategoryApi.php', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage('Category created successfully!');
                setName('');
                setThumbnail('');
                setSelectedFile(null);
                onAddSuccess();
            } else {
                setError(data.error || 'Failed to create category');
                console.error('Error from server:', data.error); // Log lỗi từ server
            }
        } catch (error) {
            setError('Failed to create category. Please try again.');
            console.error('Client error:', error.message);
        }
    };

    return (
        <div className="add-category">
            <h1>Thêm danh mục mới</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên danh mục:</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        className={isNameValid ? '' : 'error'} // Thêm lớp CSS khi tên không hợp lệ
                    />
                </div>
                <div>
                    <label>Chọn hình ảnh (JPG hoặc PNG):</label>
                    <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} required />
                </div>
                {thumbnail && (
                    <div className="thumbnail-preview">
                        <h4>Thumbnail Preview:</h4>
                        <img src={thumbnail} alt="Thumbnail Preview" style={{ maxWidth: '200px' }} />
                    </div>
                )}
                <button type="submit">Thêm danh mục</button>

                {/* Hiển thị thông báo thành công hoặc lỗi */}
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default AddCategory;
