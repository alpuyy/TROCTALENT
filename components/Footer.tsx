import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-sky-50/40 to-sky-100/50 border-t border-sky-100/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Kolom 1: Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white text-base shadow-sm">
                🎓
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TrocTalent
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Platform pertukaran skill dan jasa khusus mahasiswa & anak kos. Saling bantu, asah kemampuan, dan hemat biaya tanpa uang tunai!
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-700 bg-sky-100/60 px-3 py-1.5 rounded-full w-fit font-medium">
              <span>✨</span> Hemat pengeluaran, perbanyak relasi
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-sky-600 transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/explore" className="hover:text-sky-600 transition">
                  Jelajah Skill
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-sky-600 transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kategori Populer */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Skill Populer
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li className="hover:text-sky-600 cursor-pointer transition">
                💻 Belajar Coding & Web
              </li>
              <li className="hover:text-sky-600 cursor-pointer transition">
                🎨 Desain Grafis & Poster
              </li>
              <li className="hover:text-sky-600 cursor-pointer transition">
                🔧 Reparasi Laptop / HP
              </li>
              <li className="hover:text-sky-600 cursor-pointer transition">
                🍳 Masak Masakan Kos
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-100/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} TrocTalent. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dikembangkan oleh{" "}
            <a
              href="https://github.com/alpuyy"
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 font-semibold hover:underline"
            >
              alpuyy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
