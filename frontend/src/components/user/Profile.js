import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Input, Select, Upload, message, notification, Drawer, AutoComplete } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [error, setError] = useState("");
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([""]);


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
                profile_picture: storedUser.profile_picture,
                thumbnail: {
                    uid: "-1",
                    name: storedUser.username,
                    url: `http://localhost/tech-shop/backend/public/uploads/${storedUser.profile_picture}`,
                }

            });
        }
    }, [navigate]);

    // Khi dữ liệu `formData` được cập nhật:
    useEffect(() => {
        form.setFieldsValue({
            name: formData.username || '',
            phone_number: formData.phone_number || '',
            address: formData.address || '',
        });
        setFileList([formData.thumbnail]);
    }, [formData]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleUpdate = async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('phone_number', values.phone_number);
        formData.append('address', values.address);
        formData.append('address', values.address);
        // Kiểm tra nếu người dùng chọn ảnh mới
        if (values?.profile_picture?.file) {
            // Thêm ảnh mới vào FormData
            formData.append("profile_picture", values?.profile_picture?.file);
        } else {
            // Nếu không có ảnh mới, chỉ gửi giá trị ảnh cũ
            // formUpdatData.append("profile_picture", productDetails?.thumbnail); // Giả sử productDetails chứa ảnh cũ
        }

        try {
            const response = await fetch('http://localhost/tech-shop/backend/api/update_profile.php', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error update product: ', error);
            return { status: 'error', message: 'Có lỗi xảy ra khi sửa sản phẩm.' };
        }
        // try {
        //     const response = await axios.post(
        //         'http://localhost/tech-shop/backend/api/update_profile.php',
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     );

        //     console.log(response);
        //     const result = response.data;
        //     if (result.success) {
        //         alert(result.message);
        //         sessionStorage.setItem('user', JSON.stringify({ ...user, ...formData }));
        //         setUser({ ...user, ...formData });
        //     } else {
        //         alert(result.message);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('Có lỗi xảy ra khi cập nhật.');
        // }
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
                                    <a href="" className="manager-item__link active">
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
                                    src={`http://localhost/tech-shop/backend/public/uploads/${formData.profile_picture || ''}`}
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <button
                                className="btn-edit"
                                title="Sửa"
                                onClick={() => showDrawer()}
                            >
                                <i className="fas fa-edit"></i>Sửa thông tin
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
                        name="name"
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
                                validator: (_, value) =>
                                    value.length = 10 ? Promise.reject('S lớn hơn hoặc bằng 0!') : Promise.resolve,
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
                        name="profile_picture"
                        rules={[
                            {
                                required: true, // Chỉ yêu cầu ảnh nếu không có ảnh cũ
                                message: 'Vui lòng chọn hình ảnh cho sản phẩm!',
                            },
                            {
                                validator: (_, value) => {
                                    // Nếu có ảnh mới
                                    if (value && value.file) {
                                        const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
                                        if (!isJpgOrPng) {
                                            return Promise.reject("Bạn chỉ có thể tải lên tệp JPG/PNG!");
                                        }

                                        const isLt2M = value.file.size / 1024 / 1024 < 2;
                                        if (!isLt2M) {
                                            return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
                                        }
                                    }

                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Upload
                            name="profile_picture"
                            listType="picture"
                            fileList={fileList}
                            beforeUpload={() => false}
                            maxCount={1}
                        // onChange={handleUpdateImgChange}
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
