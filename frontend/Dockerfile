# Chọn hình ảnh Node.js làm môi trường xây dựng
FROM node:14 AS build

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép tệp package.json để cài đặt các phụ thuộc
COPY package.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng React
RUN npm run build

# Chọn hình ảnh Nginx để phục vụ ứng dụng
FROM nginx:alpine

# Sao chép các tệp xây dựng từ bước trước vào thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80 để phục vụ ứng dụng
EXPOSE 80

# Lệnh để chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
