# Tech-store

Cách 1: Tạo các image

start -> docker-compose up (8081)

dừng -> ctr+C

CáCh 2: Không tạo các image

start -> docker-compose start (8080) nhớ sửa trong docker-compose yml

dừng -> docker-compose down

---

database:
composer require robmorgan/phinx

lệnh chạy database:
vendor/bin/phinx migrate

vendor/bin/phinx seed:run

---

front end (Nhớ cài node_module -> npm i)

npm install react-router-dom

npm install @fortawesome/fontawesome-free

npm install axios

cd Tech-store\frontend
npm start -> bật
ctr C tắt
