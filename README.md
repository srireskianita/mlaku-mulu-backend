Mlaku-Mulu Backend API
Backend API untuk aplikasi travel bureau Mlaku-Mulu menggunakan Netlify Functions, MongoDB, JWT, dan Typescript.

Fitur Utama
Register dan login untuk Employee dan Tourist

Manajemen data trip (add, update, delete, get trips)

Autentikasi JWT dengan role-based authorization

MongoDB sebagai database (bisa lokal maupun Atlas)

Fungsi serverless menggunakan Netlify Functions

Setup dan Instalasi
Clone repo ini:

bash
Copy
Edit
git clone https://github.com/username/mlaku-mulu-backend.git
cd mlaku-mulu-backend
Install dependencies:

bash
Copy
Edit
npm install
Buat file .env di root folder dengan isi:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/mlaku
JWT_SECRET=mlakulaku-sangat-rahasia
(Ubah MONGODB_URI sesuai dengan database yang kamu pakai, bisa Atlas juga.)

Jalankan secara lokal dengan Netlify CLI:

bash
Copy
Edit
netlify dev
Struktur Folder
netlify/functions/ - Semua fungsi serverless untuk API

models/ - Schema Mongoose untuk Employee, Tourist, Trip, dll

lib/ - Utility seperti database connection, response helper, middleware

.env - Config environment variables

Endpoint Utama
Method	URL	Keterangan
POST	/registerEmployee	Register pegawai baru
POST	/registerTourist	Register turis baru
POST	/login	Login untuk pegawai/turis
GET	/getMyTrips	Ambil daftar trip milik turis
POST	/addTrip	Tambah trip baru
PUT	/updateTrip/{id}	Update trip berdasarkan id
DELETE	/deleteTrip/{id}	Hapus trip berdasarkan id