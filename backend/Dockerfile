FROM php:8.1-apache

# Install PDO MySQL extension and other dependencies
RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy application source
COPY src/ /var/www/html/

# Set proper permissions (optional, adjust as needed)
RUN chown -R www-data:www-data /var/www/html
