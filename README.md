<div align="center">

  # 🎓 TrocTalent
  ### *Platform Pertukaran Skill & Jasa Anak Kos*

  [![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

  <p align="center">
    Solusi kolaboratif bagi mahasiswa dan anak kos untuk saling bertukar keahlian, bakat, dan bantuan tanpa harus menggunakan uang tunai.
  </p>

  <p align="center">
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-fitur-utama">Fitur Utama</a> •
    <a href="#-struktur-project">Struktur Project</a> •
    <a href="#-cara-menjalankan">Cara Menjalankan</a> •
    <a href="#-environment-variables">Environment</a>
  </p>

</div>

---

## 🚀 Tech Stack

<div align="center">

<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,supabase,postgres,nodejs,git,github,vscode" alt="Tech Stack Icons" />
</a>

<br/>

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white) | Full-stack React framework (App Router) |
| **Frontend Library** | ![React](https://img.shields.io/badge/-React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Dynamic UI components |
| **Language** | ![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white) | Type-safe code & scalable development |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first CSS styling |
| **Backend & DB** | ![Supabase](https://img.shields.io/badge/-Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | Database PostgreSQL & Authentication service |

</div>

---

## ✨ Fitur Utama

- 🔐 **Autentikasi Pengguna**: Sistem login dan registrasi berbasis Supabase Auth.
- 👤 **Profil Pengguna & Mahasiswa**: Data profil mencakup informasi kampus dan lokasi kos untuk mempermudah pencarian koneksi sekitar.
- 🎓 **Dashboard Interaktif**: Halaman dashboard khusus untuk memantau data pengguna dan status aktivitas.
- 🔄 **Pertukaran Skill (Skill Barter)**: Konsep barter kemampuan (coding, desain, servis alat, masak, dsb.) antar komunitas anak kos.
- ⚡ **Performa Kilat**: Ditenagai oleh Next.js App Router dan Tailwind CSS modern yang responsif di berbagai perangkat.

---

## 📁 Struktur Project

```bash
troctalent/
├── app/
│   ├── dashboard/          # Halaman Dashboard pengguna
│   │   └── page.tsx
│   ├── lib/
│   │   └── supabase.ts     # Inisialisasi client Supabase
│   ├── globals.css         # Styling global Tailwind CSS
│   ├── layout.tsx          # Root Layout aplikasi
│   └── page.tsx            # Halaman Login / Masuk
├── public/                 # Aset publik (gambar, icon, svg)
├── .env.local              # Konfigurasi Environment (disembunyikan)
├── .gitignore              # Daftar file yang diabaikan oleh Git
├── package.json            # Daftar dependensi dan scripts
├── tsconfig.json           # Konfigurasi TypeScript
└── README.md               # Dokumentasi project
```

---

## 💻 Cara Menjalankan Project

### 1. Prasyarat
Pastikan Anda sudah menginstal:
- [Node.js](https://nodejs.org/) (versi 18.x atau yang lebih baru)
- [Git](https://git-scm.com/)

### 2. Clone Repositori
```bash
git clone https://github.com/alpuyy/TROCTALENT.git
cd TROCTALENT
```

### 3. Install Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment
Buat file bernama `.env.local` di folder root project dan masukkan kredensial Supabase Anda:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Jalankan Local Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 🔐 Environment Variables

| Variabel | Deskripsi |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL endpoint API Supabase project Anda |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Kunci publik (anon key) Supabase client |

---

## 👤 Author

* **Alpuyy** - [@alpuyy](https://github.com/alpuyy)
* Email: [fianabidin31@gmail.com](mailto:fianabidin31@gmail.com)

---

<div align="center">
  Dibuat dengan ❤️ untuk komunitas anak kos & mahasiswa Indonesia.
</div>
