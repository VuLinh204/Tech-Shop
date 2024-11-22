import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, Input, Select, Upload, message, notification, Drawer, AutoComplete } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [fileList, setFileList] = useState([""]);
    const [form] = Form.useForm();

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
        } else {
            setUser(storedUser);
            console.log(storedUser);
            setFormData({
                user_id: storedUser.id,
                username: storedUser.username,
                phone_number: storedUser.phone_number,
                address: storedUser.address,
                avatar: `${storedUser.avatar}`,
                avatar_url: {
                    uid: "-1",
                    name: storedUser.username,
                    status: 'done',
                    url: `http://localhost/tech-shop/backend/public/uploads/${storedUser.avatar}`,
                }

            });
        }
    }, [navigate]);


    // Khi dữ liệu `formData` được cập nhật:
    useEffect(() => {
        form.setFieldsValue({
            username: formData.username || '',
            phone_number: formData.phone_number || '',
            address: formData.address || '',
        });
        setFileList([formData.avatar_url]);
    }, [formData]);

    // Xử lý khi người dùng chọn ảnh mới trong update
    const handleUpdateImgChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleUpdate = async (values) => {
        // e.preventDefault();
        const formUpdatData = new FormData();
        formUpdatData.append("user_id", formData.user_id);
        formUpdatData.append("username", values?.username);
        formUpdatData.append("phone_number", values?.phone_number);
        formUpdatData.append("address", values?.address);
        console.log(values);
        const fileItem = fileList[0]?.originFileObj;
        console.log(fileItem);
        // Kiểm tra nếu người dùng chọn ảnh mới
        if (fileList && fileList.length > 0 && fileList[0]?.originFileObj) {
            formUpdatData.append("avatar", fileList[0].originFileObj); // Ảnh mới
        } else {
            formUpdatData.append("avatar_url", formData?.avatar_url.url); // Giữ ảnh cũ
        }
        try {
            const response = await fetch('http://localhost/tech-shop/backend/api/update_profile.php', {
                method: 'POST',
                body: formUpdatData,
            });

            const result = await response.json();
            console.log(result);
            if (result.status === 'success') {
                // Cập nhật thông tin người dùng trong state và sessionStorage
                const updatedUser = { ...user, ...result.data };
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser); // Cập nhật lại state user
                setFormData({ ...formData, ...result.data }); // Cập nhật lại formData
                setIsDrawerOpen(false); // Đóng drawer
                notification.success({
                    message: 'Cập nhật thông tin thành công!',
                    placement: 'topRight',
                    duration: 3,
                });
            } else {
                notification.error({ message: result.message }); // Hiển thị thông báo lỗi nếu có
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    //drawer
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };
    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app__container">
            <div className="grid">
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <nav className="manager">
                            <h3 className="manager__heading">Tài Khoản Của Tôi</h3>
                            <ul className="manager-list">
                                <li className="manager-item">
                                    <a href="#" className="manager-item__link active">
                                        Tài Khoản Của Tôi
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/password" className="manager-item__link">
                                        Mật Khẩu
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/orderList" className="manager-item__link">
                                        Đơn Mua
                                    </a>
                                </li>
                                <li className="manager-item">
                                    <a href="/voucher" className="manager-item__link">
                                        Voucher
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="grid__column-10">
                        <div className="profile">
                            <h1>Thông Tin Tài Khoản</h1>
                            <div className="form-group">
                                <label htmlFor="profile_picture">Ảnh đại diện</label>
                                <img
                                    src={`${formData.avatar_url.url || ''}`}
                                    alt="Hình ảnh"
                                    style={{ width: '150px', height: '150px', borderRadius: "50%", marginLeft: "15px" }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={user.email} disabled required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Họ và Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="username"
                                    value={formData.username || ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số Điện Thoại:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone_number"
                                    value={formData.phone_number || ''}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address || ''}
                                    required
                                />
                            </div>
                            <button
                                className="btn-edit"
                                title="Sửa"
                                onClick={() => showDrawer()}
                            >
                                <i className="fas fa-edit"></i>Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <Drawer title="Chi tiết thông tin người dùng" placement="left" onClose={handleCloseDrawer} open={isDrawerOpen} width="50%">
                <Form
                    form={form}
                    name="basic"
                    onFinish={handleUpdate}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên!',
                            },
                            {
                                min: 3,
                                message: 'Tên phải có ít nhất 3 ký tự!',
                            },
                            {
                                max: 255,
                                message: 'Tên không vượt quá 255 ký tự.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone_number"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại!',
                            },
                            {
                                validator: (_, value) => {
                                    return value && value.length === 10
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Số điện thoại phải đúng 10 chữ số!'));
                                },
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Số điện thoại chỉ chứa số!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>


                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ!',
                            },
                            {
                                min: 10,
                                message: 'Địa chỉ phải có ít nhất 10 ký tự!',
                            },
                            {
                                max: 255,
                                message: 'Địa chỉ không vượt quá 255 ký tự.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập địa chỉ" />
                    </Form.Item>


                    <Form.Item
                        label="Ảnh đại diện"
                        name="avatar"

                        getValueFromEvent={(e) => e && e.fileList}
                        rules={[
                            {
                                required: !formData?.avatar_url, // Yêu cầu ảnh nếu không có ảnh cũ
                                message: 'Vui lòng chọn hình ảnh!',
                            },
                            {
                                validator: (_, value) => {
                                    if (value && value.length > 0) {
                                        const file = value[0].originFileObj;
                                        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                        if (!isJpgOrPng) {
                                            return Promise.reject("Chỉ chấp nhận tệp JPG/PNG!");
                                        }

                                        const isLt2M = file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture"
                            fileList={fileList}
                            beforeUpload={() => false}
                            maxCount={1}
                            onChange={handleUpdateImgChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sửa
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default Profile;
