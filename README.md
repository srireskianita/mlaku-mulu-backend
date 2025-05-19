# 🚀 Mlaku-Mulu Backend API

Backend API untuk aplikasi biro perjalanan wisata **Mlaku-Mulu** menggunakan:
- **Netlify Functions (Serverless)**
- **MongoDB (lokal/Atlas)**
- **JWT Authentication**
- **TypeScript**

---

## ✨ Fitur Utama

- ✅ Register dan login untuk **Employee** dan **Tourist**
- ✅ Manajemen data trip (add, update, delete, get trips)
- ✅ Autentikasi JWT dengan role-based authorization
- ✅ MongoDB sebagai database utama (lokal maupun Atlas)
- ✅ Fungsi serverless menggunakan **Netlify Functions**

---

## ⚙️ Setup dan Instalasi

### 1. Clone Repo

```bash
git clone https://github.com/username/mlaku-mulu-backend.git
cd mlaku-mulu-backend

**2. Install Dependencies**
npm install

**3. Buat File .env**
Buat file .env di root folder dengan isi:

env
MONGODB_URI=
JWT_SECRET=

4. Jalankan Secara Lokal
netlify dev

📁 Struktur Folder
mlaku-mulu-backend/
│
├── netlify/functions/ # Semua function handler (API) langsung di sini
│ ├── registerTourist.ts
│ ├── registerEmployee.ts
│ ├── login.ts
│ ├── getMyTrips.ts
│ ├── addTrip.ts
│ ├── updateTrip.ts
│ └── deleteTrip.ts
│
├── models/ # Mongoose schemas (Employee, Tourist, Trip)
├── lib/ # DB connect, middleware, helper, utils
├── .env # Environment config (tidak di-push ke GitHub)
├── netlify.toml # Netlify config file
├── package.json
└── tsconfig.json


🔌 Endpoint Utama
| Method | URL                 | Keterangan                    |
| ------ | ------------------- | ----------------------------- |
| POST   | `/registerEmployee` | Register pegawai baru         |
| POST   | `/registerTourist`  | Register turis baru           |
| POST   | `/login`            | Login untuk pegawai/turis     |
| GET    | `/getMyTrips`       | Ambil daftar trip milik turis |
| POST   | `/addTrip`          | Tambah trip baru              |
| PUT    | `/updateTrip/{id}`  | Update trip berdasarkan ID    |
| DELETE | `/deleteTrip/{id}`  | Hapus trip berdasarkan ID     |

🧪 Testing
Gunakan Postman atau sejenis untuk uji endpoint.

Pastikan .env sesuai dengan konfigurasi lokal kamu.
MONGODB_URI=mongodb://localhost:27017/mlaku


🌐 Deployment
Project ini bisa dideploy ke layanan seperti Netlify.

URL GitHub: https://github.com/username/mlaku-mulu-backend

URL Netlify: https://mlaku-mulu.netlify.app

Pastikan MONGODB_URI dan JWT_SECRET sudah di-set di environment variable di dashboard Netlify.


👤 Author
Sri Reski Anita
GitHub: https://github.com/srireskianita
