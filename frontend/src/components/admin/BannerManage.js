import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Upload, notification, Drawer, AutoComplete } from 'antd';
import { addBanner, deleteBanner, getBanners, updateBanner } from '../../api/BannerApi';
import { UploadOutlined } from '@ant-design/icons';
import Pagination from '../common/Pagination_admin';
import '../../assets/css/CategoriesManage.css';

const BannerManage = () => {
    const [banners, setBanners] = useState([]);
    const [filteredBanners, setFilteredBanners] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
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
    const validCurrentPage = currentPage > 0 ? currentPage : 1;
    const offset = (validCurrentPage - 1) * itemsPerPage;
    const currentItems = Array.isArray(filteredBanners)
        ? filteredBanners.slice(offset, offset + itemsPerPage)
        : [];
    const pageCount = Array.isArray(filteredBanners)
        ? Math.ceil(filteredBanners.length / itemsPerPage)
        : 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getBanners();
            setBanners(data);
            setFilteredBanners(data);
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

    // Tìm kiếm biểu ngữ
    const handleSearch = (value) => {
        if (!value.trim()) {
            setFilteredBanners(banners);
            setSearchOptions([]);
            return;
        }

        const filtered = banners.filter((banner) =>
            banner.title.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredBanners(filtered);
        setSearchOptions(filtered.map((banner) => ({ value: banner.title })));
    };

    const handleResetSearch = () => {
        setFilteredBanners(banners);
        setSearchOptions([]);
    };

    const handleAdd = async (values) => {
        const formData = {
            action: "add",
            title: values.title,
            link: values.link,
            image_url: fileList[0]?.originFileObj.name
        };
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

    const handleUpdate = async (values) => {
        const formData = {
            action: "update",
            id: bannerDetails.id,
            title: values.title,
            link: values.link,
            image_url: fileList[0].originFileObj.name
        };
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

    const handleDelete = async (bannerId) => {
        try {
            const response = await deleteBanner(bannerId);
            if (response && response.status === 'success') {
                notification.success({ message: 'Xóa biểu ngữ thành công!' });
                fetchData();
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
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <AutoComplete
                                options={searchOptions}
                                style={{ width: 300 }}
                                onSearch={handleSearch}
                                placeholder="Tìm kiếm biểu ngữ..."
                            >
                                <Input.Search enterButton size="large" onSearch={handleSearch} />
                            </AutoComplete>
                            <Button type="default" onClick={handleResetSearch}>
                                Hiển thị tất cả
                            </Button>
                        </div>
                        <button className="btn btn--primary" onClick={() => setIsModalOpen(true)}>
                            + Thêm biểu ngữ
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading biểu ngữ...</p>
                    ) : filteredBanners.length === 0 ? (
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
                                                onClick={() => {
                                                    setBannerDetails(banner);
                                                    setIsDrawerOpen(true);
                                                }}
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
                    <Pagination
                        totalPages={pageCount}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
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
                                    const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                        return Promise.reject("Bạn chỉ có thể tải lên tệp JPG/PNG!");
                                    }

                                    const isLt2M = value.file.size / 1024 / 1024 < 2;
                                    if (!isLt2M) {
                                        return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
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
                                    const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                        return Promise.reject("Bạn chỉ có thể tải lên tệp JPG/PNG!");
                                    }

                                    const isLt2M = value.file.size / 1024 / 1024 < 2;
                                    if (!isLt2M) {
                                        return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
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
