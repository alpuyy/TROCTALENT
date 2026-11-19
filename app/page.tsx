import Link from "next/link";

export default function Home() {
  const categories = [
    {
      icon: "💻",
      title: "Coding & Tugas Lab",
      desc: "Bantuan coding Python, Web, C++, hingga tugas praktikum kampus.",
      count: "30+ anak kos",
    },
    {
      icon: "🎨",
      title: "Desain & Media",
      desc: "Poster acara, presentasi canva estetik, hingga video editing TikTok.",
      count: "24+ anak kos",
    },
    {
      icon: "🔧",
      title: "Servis & Gadget",
      desc: "Instal ulang laptop, bersihkan kipas laptop, perbaiki motor kos.",
      count: "18+ anak kos",
    },
    {
      icon: "🍳",
      title: "Masakan Kos & Logistik",
      desc: "Tukar masakan rumahan sehat, nebeng belanja pasar, antar-jemput.",
      count: "20+ anak kos",
    },
    {
      icon: "📚",
      title: "Les Bahasa & Matkul",
      desc: "Belajar TOEFL/IELTS, kalkulus, akuntansi, dan review jurnal ilmiah.",
      count: "35+ anak kos",
    },
    {
      icon: "🎸",
      title: "Musik & Hobi",
      desc: "Belajar gitar dasar, fotografi wisuda, partner olahraga gym/badminton.",
      count: "15+ anak kos",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Buat Profil Kos",
      desc: "Daftar gratis dengan memasukkan kampus dan area kosmu agar mudah terhubung dengan teman terdekat.",
    },
    {
      number: "02",
      title: "Tawarkan & Cari Skill",
      desc: "Cantumkan keahlian yang kamu miliki dan sebutkan apa keahlian atau bantuan yang sedang kamu butuhkan.",
    },
    {
      number: "03",
      title: "Sepakati & Nikmati Barter",
      desc: "Hubungi teman barter, saling berbagi manfaat tanpa keluar uang tunai, dan perluas lingkaran pertemanan!",
    },
  ];

  return (
    <div className="space-y-20 py-8">
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 sm:pt-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/70 border border-sky-200/80 text-sky-800 text-xs sm:text-sm font-medium shadow-sm">
            <span>✨</span>
            <span>Platform Barter Skill #1 Khusus Anak Kos & Mahasiswa</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-800 leading-tight">
            Tukar Keahlian,{" "}
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hemat Pengeluaran
            </span>{" "}
            Anak Kos!
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Bisa coding tapi butuh les kalkulus? Bisa servis laptop tapi kangen masakan rumahan? Di <strong>TrocTalent</strong>, kamu bisa saling barter kemampuan dengan teman kos satu kampus tanpa perlu uang tunai!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-sky-200/80 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 text-center"
            >
              🔍 Jelajah Skill Barter
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-sky-50 text-slate-700 font-semibold text-sm sm:text-base border border-sky-200 shadow-sm transition-all duration-200 text-center"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Social Proof / Mini Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-sky-500">✔</span> 100% Khusus Komunitas Mahasiswa
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sky-500">✔</span> Tanpa Biaya Transaksi
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sky-500">✔</span> Filter Berdasarkan Kampus & Area Kos
            </div>
          </div>

        </div>
      </section>

      {/* Kategori Populer */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Keahlian yang Siap Dibarter
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Dari tugas kuliah, urusan hobi, hingga kebutuhan perut anak kos sehari-hari.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-3xl bg-white border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md hover:shadow-sky-100/60 transition-all duration-200 space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {cat.desc}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-sky-600 uppercase tracking-wider">
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-100/40 border border-sky-100 p-8 sm:p-14">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
              Mudah & Tanpa Ribet
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
              Cara Kerja TrocTalent
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hanya butuh 3 langkah sederhana untuk mulai saling bertukar kebaikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-white/80 border border-sky-100/80 shadow-sm space-y-3">
                <div className="text-3xl font-black text-sky-300">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 p-8 sm:p-12 text-center text-white shadow-xl shadow-sky-200 space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Punya Skill yang Bisa Dibagikan?
          </h2>
          <p className="text-sm sm:text-base text-sky-100 max-w-xl mx-auto leading-relaxed">
            Jangan biarkan keahlianmu nganggur! Bantu kawan kos lain dan dapatkan bantuan yang kamu perlukan secara cuma-cuma.
          </p>
          <div>
            <Link
              href="/register"
              className="inline-block px-8 py-3.5 rounded-full bg-white text-sky-700 font-bold text-sm sm:text-base hover:bg-sky-50 shadow-md transition transform hover:-translate-y-0.5"
            >
              Gabung TrocTalent Sekarang 🎓
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
