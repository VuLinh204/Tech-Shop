<?php
class EncryptionHelper
{
    private $method = 'AES-256-CBC';
    private $key = 'secretkey'; // Chọn một khóa bí mật mạnh
    private $iv = '1234567890123456'; // Chọn một IV có độ dài phù hợp

    public function encrypt($data)
    {
        return openssl_encrypt($data, $this->method, $this->key, 0, $this->iv);
    }

    public function decrypt($encryptedData)
    {
        return openssl_decrypt($encryptedData, $this->method, $this->key, 0, $this->iv);
    }
}
