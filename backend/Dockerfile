# Sử dụng PHP hình ảnh với Apache
FROM php:8.0-apache

# Cài đặt các phần mở rộng PHP cần thiết
RUN docker-php-ext-install pdo pdo_mysql

# Copy mã nguồn vào container
COPY . /var/www/html/

# Cấp quyền cho các tệp tin
RUN chown -R www-data:www-data /var/www/html/

# Expose port 80
EXPOSE 80
