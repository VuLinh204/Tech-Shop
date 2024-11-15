import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select, Upload, message, notification, Drawer } from 'antd';
import { createProduct, deleteProduct, getDetailProduct, updateProduct } from '../../api/Api'
import { UploadOutlined } from '@ant-design/icons';
import '../../assets/css/CategoriesManage.css';
import axios from 'axios';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [productDetails, setProductDetails] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        quantity: '',
        color: [],
        discount_percent: '',
        thumbnail: '',
        category_name: ''
    });
    const [categoryId, setCategoryId] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { Option } = Select;
    const [colorInput, setColorInput] = useState([]);
    const [form] = Form.useForm();



    // Hàm gọi API để lấy danh sách sản phẩm và danh mục
    const fetchData = async () => {
        try {
            const [productResponse, categoryResponse] = await Promise.all([
                axios.get('http://localhost/tech-shop/backend/api/product_api.php?action=list'),
                axios.get('http://localhost/tech-shop/backend/api/CategoryApi.php')
            ]);

            setProducts(productResponse.data);
            setCategories(categoryResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchGetDetailProduct = async (productId) => {
        const data = await getDetailProduct(productId);
        if (data && data.status === 'success') {
            const { product } = data;
            console.log(product);
            setCategoryId(product.category_id);
            setProductDetails({
                ...product,
                colors: data.product.color.join(", "),
                thumbnail_url: `http://localhost/tech-shop/backend/public/uploads/${product.thumbnail}`
            });

        } else {
            notification.error({
                message: 'Lỗi',
                description: 'Không thể tải chi tiết sản phẩm.',
                placement: 'topRight',
            });
        }
    };

    const handleSubmit = async (values) => {
        const productData = {
            action: "create",
            name: values?.name,
            description: values?.description,
            category_id: values?.category_id,
            price: values?.price,
            quantity: values?.quantity,
            discount_percent: values?.discount_percent,
            color: colorInput,
            thumbnail: values?.thumbnail?.file?.name
        };
        try {
            const data = await createProduct(productData);
            if (data && data.status === 'success') {
                notification.success({
                    message: 'Thêm sản phẩm thành công!',
                    description: 'Sản phẩm của bạn đã được thêm vào hệ thống.',
                    placement: 'topRight', // Đặt vị trí của thông báo
                    duration: 3, // Thời gian hiển thị thông báo
                    style: {
                        backgroundColor: '#27a745',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        padding: '15px',
                    },
                });
                setIsModalOpen(false);
                form.resetFields();
                fetchData();
            } else {
                notification.error({
                    message: 'Thêm sản phẩm thât bại!',
                    placement: 'topRight', // Đặt vị trí của thông báo
                    duration: 3, // Thời gian hiển thị thông báo
                    style: {
                        backgroundColor: '#e83b46',
                        color: '#fff', // Màu chữ trắng
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        padding: '15px',
                    },
                });
                console.error("Error details:", data.message || "Không có thông tin chi tiết.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            message.error('Có lỗi xảy ra khi thêm sản phẩm.');
        }

    };

    // Hàm cập nhật sản phẩm
    const handleUpdate = async (values) => {
        const updatedProductData = {
            id: productDetails.id,
            action: "update",
            name: values.name,
            description: values.description,
            category_id: categoryId,
            price: values.price,
            quantity: values.quantity,
            discount_percent: values.discount_percent,
            color: colorInput,
            thumbnail: values.thumbnail?.file?.name || productDetails.thumbnail,
        };
        try {
            const response = await updateProduct(updatedProductData);
            console.log(response);

            if (response && response.status === 'success') {
                notification.success({
                    message: 'Cập nhật sản phẩm thành công!',
                    description: 'Sản phẩm đã được cập nhật trong hệ thống.',
                    placement: 'topRight',
                    duration: 3,
                });
                setIsDrawerOpen(false);
                fetchData(); // Tải lại danh sách sản phẩm sau khi cập nhật
                form.resetFields(); // Reset form sau khi hoàn thành
            } else {
                notification.error({
                    message: 'Cập nhật sản phẩm thất bại!',
                    description: response.data.message || 'Không thể cập nhật sản phẩm.',
                    placement: 'topRight',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error("Error updating product:", error);
            notification.error({
                message: 'Lỗi cập nhật',
                description: 'Có lỗi xảy ra khi cập nhật sản phẩm.',
                placement: 'topRight',
            });
        }
    };


    const handleDeleted = async (productId) => {
        const data = {
            action: "delete",
            id: productId
        }
        try {
            const response = await deleteProduct(data);
            if (response.status === 'success') {
                notification.success({
                    message: 'Xóa sản phẩm thành công!',
                    description: 'Sản phẩm đã được xóa khỏi hệ thống.',
                    placement: 'topRight',
                    duration: 3,
                });
                // Cập nhật danh sách sản phẩm sau khi xóa
                setProducts(products.filter((product) => product.id !== productId));
            } else {
                notification.error({
                    message: 'Xóa sản phẩm thất bại!',
                    description: response.message || 'Không thể xóa sản phẩm.',
                    placement: 'topRight',
                    duration: 3,
                });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    useEffect(() => {
        fetchData();
    })

    useEffect(() => {
        form.setFieldsValue(productDetails);
    }, [productDetails]);


    //drawer
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const showDrawer = (productId) => {
        setIsDrawerOpen(true);
        fetchGetDetailProduct(productId);
    };

    //Model
    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    //hàm xử lí màu sắc
    const handleColorChange = (value) => {
        setColorInput("");
        const colorsArray = value.split(',').map(color => color.trim());
        setColorInput(colorsArray);
    };

    const showDeleteConfirm = (productId) => {
        Modal.confirm({
            title: 'Cảnh báo',
            content: 'Bạn có chắc muốn xóa sản phẩm này không?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                handleDeleted(productId);
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

    return (
        <div className="grid__column-10">
            <div className="category-manager">
                <div>
                    <div className="category-manager__header">
                        <h1>Danh sách các sản phẩm</h1>
                        <button className="btn btn--primary" onClick={showModal}>
                            + Thêm sản phẩm
                        </button>
                    </div>
                    {loading ? (
                        <p>Loading sản phẩm...</p>
                    ) : products.length === 0 ? (
                        <h3>Không có sản phẩm nào</h3>
                    ) : (
                        <table className="category-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Hình ảnh</th>
                                    <th>Mô tả</th>
                                    <th>Số lượng</th>
                                    <th>Màu sắc</th>
                                    <th>Giác</th>
                                    <th>% Giảm</th>
                                    <th>Thuộc danh mục</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost/tech-shop/backend/public/uploads/${product.thumbnail}`}
                                                    alt="Hình ảnh"
                                                    style={{ width: '100px' }}
                                                />
                                            </td>
                                            <td>{product.description}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.color}</td>
                                            <td>{product.price}</td>
                                            <td>{product.discount_percent}</td>
                                            <td>{product.category_name}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    title="Sửa"
                                                    onClick={() => showDrawer(product.id)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    title="Xóa"
                                                    onClick={() => showDeleteConfirm(product.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">Không có sản phẩm nào.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>)}
                    <div className="pagination">
                        <button className="btn-pagination">1</button>
                        <button className="btn-pagination">2</button>
                        <button className="btn-pagination">3</button>
                    </div>
                </div>
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
            ]}>
                <Form
                    form={form}
                    name="basic"
                    onFinish={handleSubmit}
                    labelCol={{
                        span: 6,
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
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên sản phẩm!',
                            },
                            {
                                min: 3,
                                message: 'Tên sản phẩm phải có ít nhất 3 ký tự!',
                            },
                            {
                                max: 255,
                                message: 'Tên sản phẩm không vượt quá 255 ký tự.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả sản phẩm!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4}
                            placeholder="Nhập mô tả" />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name="category_id"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {categories.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm!',
                            },

                            {
                                validator: (_, value) =>
                                    value >= 0 ? Promise.resolve() : Promise.reject('Giá phải lớn hơn hoặc bằng 0!'),
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Giá sản phẩm chỉ chứa số!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập giá sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng sản phẩm!',
                            },
                            {
                                validator: (_, value) =>
                                    value > 0 ? Promise.resolve() : Promise.reject('Số lượng phải lớn hơn 0!'),
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Số lượng sản phẩm chỉ chứa số!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lượng sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Màu sắc"
                        name="colors"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập màu sắc, nếu có nhiều màu phân tách bằng dấu phấy!',
                            },
                            {
                                validator: (_, value) => {
                                    const colors = value.split(',').map(color => color.trim());
                                    return colors.every(color => color.length > 0)
                                        ? Promise.resolve()
                                        : Promise.reject('Vui lòng nhập đúng định dạng màu sắc!');
                                },
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập các màu, phân tách bằng dấu phẩy"
                            onChange={(e) => handleColorChange(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="%Giảm"
                        name="discount_percent"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập % giảm giá!',
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Giá giảm sản phẩm chỉ chứa số!',
                            },
                            {
                                validator: (_, value) =>
                                    value >= 0 && value <= 100 ? Promise.resolve() : Promise.reject('Giá giảm nằm trong khoảng từ 0% đến 100%'),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập % giảm giá sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Hình ảnh"
                        name="thumbnail"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình ảnh cho sản phẩm!',
                            },
                            {
                                validator: (_, value) => {
                                    console.log(value);
                                    const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                        return Promise.reject("Bạn chỉ có thể tải lên tệp JPG/PNG!");
                                    }

                                    const isLt2M = value.file.size / 1024 / 1024 < 2;
                                    if (!isLt2M) {
                                        return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
                                    }

                                    return Promise.resolve();
                                }
                            }

                        ]}
                    >
                        <Upload
                            name="thumbnail"
                            listType="picture"
                            beforeUpload={() => false} // Không upload tự động
                        >
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 20,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            {/* chi tiết sản phẩm           */}
            <Drawer title="Chi tiết sản phẩm" placement="left" onClose={handleCloseDrawer} open={isDrawerOpen} width="80%">
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
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên sản phẩm!',
                            },
                            {
                                min: 3,
                                message: 'Tên sản phẩm phải có ít nhất 3 ký tự!',
                            },
                            {
                                max: 255,
                                message: 'Tên sản phẩm không vượt quá 255 ký tự.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả sản phẩm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mô tả sản phẩm!',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4}
                            placeholder="Nhập mô tả" />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name="category_name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {categories.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá sản phẩm!',
                            },

                            {
                                validator: (_, value) =>
                                    value >= 0 ? Promise.resolve() : Promise.reject('Giá phải lớn hơn hoặc bằng 0!'),
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Giá sản phẩm chỉ chứa số!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập giá sản phẩm" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng sản phẩm!',
                            },
                            {
                                validator: (_, value) =>
                                    value > 0 ? Promise.resolve() : Promise.reject('Số lượng phải lớn hơn 0!'),
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Số lượng sản phẩm chỉ chứa số!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập số lượng sản phẩm" />
                    </Form.Item>
                    <Form.Item
                        label="Màu sắc"
                        name="colors"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập màu sắc, nếu có nhiều màu phân tách bằng dấu phấy!',
                            },
                            {
                                validator: (_, value) => {
                                    const colors = value.split(',').map(color => color.trim());
                                    return colors.every(color => color.length > 0)
                                        ? Promise.resolve()
                                        : Promise.reject('Vui lòng nhập đúng định dạng màu sắc!');
                                },
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập các màu, phân tách bằng dấu phẩy"
                            onChange={(e) => handleColorChange(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="%Giảm giá"
                        name="discount_percent"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập % giảm giá!',
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Giá giảm sản phẩm chỉ chứa số!',
                            },
                            {
                                validator: (_, value) =>
                                    value >= 0 && value <= 100 ? Promise.resolve() : Promise.reject('Giá giảm nằm trong khoảng từ 0% đến 100%'),
                            },
                        ]}
                    >
                        <Input placeholder="Nhập % giảm giá sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        label="Hình ảnh"
                        name="thumbnail"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn hình ảnh cho sản phẩm!',
                            },
                            {
                                validator: (_, value) => {
                                    console.log(value);
                                    const isJpgOrPng = value.file.type === 'image/jpeg' || value.file.type === 'image/png';
                                    if (!isJpgOrPng) {
                                        return Promise.reject("Bạn chỉ có thể tải lên tệp JPG/PNG!");
                                    }

                                    const isLt2M = value.file.size / 1024 / 1024 < 2;
                                    if (!isLt2M) {
                                        return Promise.reject("Hình ảnh phải nhỏ hơn 2MB!");
                                    }

                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Upload
                            name="thumbnail"
                            listType="picture"
                            beforeUpload={() => false}                >
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh mới</Button>
                        </Upload>
                        {productDetails.thumbnail_url && (
                            <div style={{ marginTop: '10px' }}>
                                <span>Hình ảnh hiện tại:</span>
                                <img
                                    src={productDetails.thumbnail_url}
                                    alt="Hình ảnh hiện tại"
                                    style={{ width: '150px', marginTop: '5px' }}
                                />
                            </div>
                        )}
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

export default AdminProduct;
