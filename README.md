# Tech-store

Chạy docker:

docker-compose up -d  -> (chạy container trong nền, terminal không bị chiếm dụng)
docker-compose up     -> (run giữ terminal vs  container đang chạy)
docker-compose down   -> (stop và delete toàn bộ container đang chạy)


---

database: cd backend

composer remove robmorgan/phinx

composer require robmorgan/phinx

lệnh chạy database:

php vendor/bin/phinx migrate

php vendor/bin/phinx seed:run

---

front end (Nhớ cài node_module -> npm i) 
cd frontend (chạy các lệnh dưới)

npm install react-router-dom

npm install @fortawesome/fontawesome-free

npm install axiosa

npm install react-slick slick-carousel


lệnh chạy localhost:3000
cd frontend
npm start -> run
ctr C  -> tắt
