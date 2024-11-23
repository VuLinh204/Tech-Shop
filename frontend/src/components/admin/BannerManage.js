import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Drawer } from 'antd';
import { addBanner, deleteBanner, getBanners, updateBanner } from '../../api/BannerApi';
import { UploadOutlined } from '@ant-design/icons';
import Pagination from '../common/Pagination_admin';
import axios from 'axios';
import '../../assets/css/CategoriesManage.css';


const BannerManage = () => {
    const [banners, setBanners] = useState([]);
    const [bannerDetails, setBannerDetails] = useState({
        id: '',
        title: '',
        image_url: '',
        link: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fileList, setFileList] = useState([""]);
    const [currentPage, setCurrentPage] = useState(1);
    const [form] = Form.useForm();

    const itemsPerPage = 10;
    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = banners.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(banners.length / itemsPerPage);

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch banners data
    const fetchData = async () => {
        try {
            const data = await getBanners();
            setBanners(data);
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải danh sách biểu ngữ.',
                placement: 'topRight',
            });
        } finally {
            setLoading(false);
        }
    };

    // Add new banner
    const handleAdd = async (values) => {
        const formData = {
            action: "add",
            title: values.title,
            link: values.link,
            image_url: fileList[0]?.originFileObj.name
        }
        try {
            const response = await addBanner(formData);
            if (response && response.status === 'success') {
                notification.success({ message: 'Thêm biểu ngữ thành công!' });
                setIsModalOpen(false);
                fetchData();
                form.resetFields();
            } else {
                throw new Error(response?.data?.message || 'Không thể thêm biểu ngữ.');
            }
        } catch (error) {
            notification.error({ message: 'Thêm biểu ngữ thất bại!', description: error.message });
        }
    };

    // Update banner
    const handleUpdate = async (values) => {
        const formData = {
            action: "update",
            id: bannerDetails.id,
            title: values.title,
            link: values.link,
            image_url: fileList[0].originFileObj.name
        }
        try {
            const response = await updateBanner(formData);
            if (response && response.status === 'success') {
                notification.success({ message: 'Cập nhật biểu ngữ thành công!' });
                setIsDrawerOpen(false);
                fetchData();
                form.resetFields();
            } else {
                throw new Error(response?.data?.message || 'Không thể cập nhật biểu ngữ.');
            }
        } catch (error) {
            notification.error({ message: 'Cập nhật thất bại!', description: error.message });
        }
    };

    // Delete banner
    const handleDelete = async (bannerId) => {
        try {
            const response = await deleteBanner(bannerId);
            if (response && response.status === 'success') {
                notification.success({ message: 'Xóa biểu ngữ thành công!' });
                setBanners(banners.filter((banner) => banner.id !== bannerId));
            } else {
                throw new Error(response?.data?.message || 'Không thể xóa biểu ngữ.');
            }
        } catch (error) {
            notification.error({ message: 'Xóa biểu ngữ thất bại!', description: error.message });
        }
    };

    const showDeleteConfirm = (bannerId) => {
        Modal.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc muốn xóa biểu ngữ này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDelete(bannerId);
            },
            onCancel() {
                notification.warning({
                    message: 'Bạn đã hủy thao tác xóa',
                    placement: 'topRight',
                    duration: 3,
                });
            },
        });
    };

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const showDrawer = (banner) => {
        setBannerDetails(banner);
        form.setFieldsValue({
            title: banner.title,
            link: banner.link,
        });
        setFileList([{
            uid: "-1",
            name: banner.image,
            url: banner.image,
        }]);
        setIsDrawerOpen(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUpdateImgChange = ({ fileList }) => {
        setFileList(fileList);
    };

    return (
        <div className="grid__column-10">
            <div className="category-manager">
                <div>
                    <div className="category-manager__header">
                        <h1 style={{ marginRight: '100px' }}>Danh sách các biểu ngữ</h1>
                        <div className="header__search" style={{ width: '30%', border: '1px solid #000' }}>
                            <div className="header__search-input-wrap">
                                <form action="#" method="GET">
                                    <input
                                        type="text"
                                        name="query"
                                        className="header__search-input"
                                        placeholder="Tìm kiếm"
                                    />
                                </form>
                            </div>
                            <button type="submit" className="header__search-btn">
                                <i className="header__search-btn-icon fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        <button className="btn btn--primary" onClick={showModal} style={{ marginLeft: '140px' }}>
                            + Thêm biểu ngữ
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading biểu ngữ...</p>
                    ) : banners.length === 0 ? (
                        <h3>Không có biểu ngữ nào</h3>
                    ) : (
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Hình ảnh</th>
                                    <th>Liên kết</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((banner) => (
                                    <tr key={banner.id}>
                                        <td>{banner.id}</td>
                                        <td>{banner.title}</td>
                                        <td>
                                            <img
                                                src={`http://localhost/Tech-Shop/backend/public/uploads/${banner.image_url}`}
                                                alt="Banner"
                                                style={{ width: '100px' }}
                                            />
                                        </td>
                                        <td>{banner.link}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                title="Sửa"
                                                onClick={() => showDrawer(banner)}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                title="Xóa"
                                                onClick={() => showDeleteConfirm(banner.id)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div>
                        <Pagination
                            totalPages={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>

            {/* Add Banner Modal */}
            <Modal
                title="Thêm Biểu Ngữ"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                        Hủy
                    </Button>,
                ]}
            >
                <Form onFinish={handleAdd} form={form} layout="vertical">
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Nhập tiêu đề!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="link" label="Liên kết" rules={[{ required: true, message: 'Nhập liên kết!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình ảnh cho sản phẩm!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && value.fileList.length === 0) {
                                        return Promise.reject('Vui lòng chọn hình ảnh.');
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Upload
                            name="image_url"
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            maxCount={1}
                            onChange={handleUpdateImgChange}
                        >
                            <UploadOutlined />
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Update Banner Drawer */}
            <Drawer
                title="Sửa Biểu Ngữ"
                placement="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                width={700}
                footer={
                    <Button key="back" onClick={() => setIsDrawerOpen(false)}>
                        Hủy
                    </Button>
                }
            >
                <Form onFinish={handleUpdate} form={form} layout="vertical">
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Nhập tiêu đề!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="link" label="Liên kết" rules={[{ required: true, message: 'Nhập liên kết!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình ảnh cho sản phẩm!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && value.fileList.length === 0) {
                                        return Promise.reject('Vui lòng chọn hình ảnh.');
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Upload
                            name="image_url"
                            listType="picture-card"
                            beforeUpload={() => false}
                            fileList={fileList}
                            maxCount={1}
                            onChange={handleUpdateImgChange}
                        >
                            <UploadOutlined />
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default BannerManage;
