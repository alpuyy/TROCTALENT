"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Profile {
  username?: string;
  kampus?: string;
  area_kos?: string;
}

interface SkillPost {
  id: string | number;
  title: string;
  category: string;
  description: string;
  wanted: string;
  author_name: string;
  kampus: string;
  area_kos: string;
  contact?: string;
  created_at?: string;
}

// Data awal sebagai inspirasi & fallback
const INITIAL_SKILLS: SkillPost[] = [
  {
    id: 1,
    title: "Bisa Ajarin Dasar Python & Tugas Algoritma",
    category: "Coding",
    description: "Mahasiswa Ilkom semester 5. Bisa bantu tugas coding dasar, perulangan, array, OOP Python santai sampai paham.",
    wanted: "Barter masakan rumahan kos 2x atau diajarin Akuntansi Dasar.",
    author_name: "dimas_py",
    kampus: "UGM",
    area_kos: "Pogung Baru",
    contact: "081234567890",
  },
  {
    id: 2,
    title: "Bisa Bikin Desain Poster & Feed Instagram Canva Pro",
    category: "Desain",
    description: "Anak DKV. Siap bantu bikinin poster acara kampus, banner organisasi, atau slide presentasi estetik.",
    wanted: "Dicari yang bisa benerin rantai/rem sepeda kosan atau bantu antar ke stasiun.",
    author_name: "sarah_art",
    kampus: "ITB",
    area_kos: "Dago Asri",
    contact: "sarah_dkv (Instagram)",
  },
  {
    id: 3,
    title: "Jasa Bersihin Fan Laptop & Ganti Pasta Thermal",
    category: "Servis",
    description: "Punya toolkit lengkap. Bisa bersihin debu laptop yang cepat panas dan ganti thermal paste Arctic MX-4.",
    wanted: "Barter diajarin listening/speaking TOEFL atau ditraktir makan siang warteg.",
    author_name: "reza_tech",
    kampus: "UI",
    area_kos: "Kukusan Teknik",
    contact: "085712349999",
  },
  {
    id: 4,
    title: "Siap Masakin Menu Rumahan Sehat (Sayur Asem & Lauk)",
    category: "Makanan",
    description: "Suka masak di kosan berlebih. Bersih, higienis, dan hemat gizi seimbang buat anak kos.",
    wanted: "Barter les matematika dasar / statistika untuk adik kos.",
    author_name: "nisa_kitchen",
    kampus: "UNAIR",
    area_kos: "Mulyorejo",
    contact: "nisa_kosan (Telegram)",
  },
  {
    id: 5,
    title: "Review Jurnal Ilmiah & Cek Grammar Skripsi",
    category: "Belajar",
    description: "Mahasiswa Sastra Inggris tingkat akhir. Siap proofread abstrak skripsi atau grammar paper kamu.",
    wanted: "Barter diajarin dasar pembuatan web portofolio sederhana.",
    author_name: "kevin_eng",
    kampus: "UNDIP",
    area_kos: "Tembalang",
    contact: "kevin_lang (Telegram)",
  },
];

export default function ExploreSkills() {
  const [skills, setSkills] = useState<SkillPost[]>(INITIAL_SKILLS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkillForBarter, setSelectedSkillForBarter] = useState<SkillPost | null>(null);
  const [barterMsg, setBarterMsg] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  // Form State untuk Posting Skill Baru
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Coding");
  const [newDescription, setNewDescription] = useState("");
  const [newWanted, setNewWanted] = useState("");
  const [newContact, setNewContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Semua", "Coding", "Desain", "Servis", "Makanan", "Belajar", "Musik"];

  useEffect(() => {
    // Cek sesi user
    const loadSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username, kampus, area_kos")
            .eq("id", session.user.id)
            .single();
          if (profile) setUserProfile(profile);
        }
      } catch {
        setUser(null);
      }
    };

    loadSession();

    // Coba load skill dari tabel Supabase jika sudah ada
    const fetchSupabaseSkills = async () => {
      try {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setSkills([...data, ...INITIAL_SKILLS]);
        }
      } catch {
        console.log("Menggunakan initial skills data");
      }
    };

    fetchSupabaseSkills();
  }, []);

  // Handle Tambah Skill Baru
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const authorName = userProfile?.username || user?.user_metadata?.username || "Anak Kos";
    const authorKampus = userProfile?.kampus || user?.user_metadata?.kampus || "Kampus Terdekat";
    const authorArea = userProfile?.area_kos || user?.user_metadata?.area_kos || "Area Kos";

    const newPost: SkillPost = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      description: newDescription,
      wanted: newWanted,
      author_name: authorName,
      kampus: authorKampus,
      area_kos: authorArea,
      contact: newContact || "Hubungi lewat akun TrocTalent",
      created_at: new Date().toISOString(),
    };

    // Coba simpan ke Supabase jika tabel 'skills' aktif
    try {
      await supabase.from("skills").insert([
        {
          title: newTitle,
          category: newCategory,
          description: newDescription,
          wanted: newWanted,
          author_name: authorName,
          kampus: authorKampus,
          area_kos: authorArea,
          contact: newContact,
          user_id: user?.id,
        },
      ]);
    } catch {
      console.log("Menyimpan ke local memory feed");
    }

    setSkills([newPost, ...skills]);
    setIsModalOpen(false);
    setIsSubmitting(false);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewWanted("");
    setNewContact("");
    alert("Skill berhasil ditawarkan! Selamat mencari kawan barter 🎉");
  };

  // Filter skills berdasarkan search dan kategori
  const filteredSkills = skills.filter((item) => {
    const matchCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.wanted.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kampus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area_kos.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sky-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-2">
            <span>🤝</span> Feed Barter Keahlian
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            Jelajah Skill Anak Kos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Temukan teman satu kampus atau kos terdekat untuk saling bertukar kebaikan tanpa biaya.
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold text-sm shadow-md shadow-sky-200 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>➕</span> Tawarkan Skill Baru
          </button>
        </div>
      </div>

      {/* Bar Pencarian & Filter Kategori */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative max-w-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari skill (misal: kalkulus, servis laptop, canva, UGM, Dago)..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-sky-100 text-slate-700 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          />
          <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Hapus
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-sky-500 text-white shadow-sm shadow-sky-200"
                  : "bg-white text-slate-600 border border-sky-100 hover:bg-sky-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Kartu Skill */}
      {filteredSkills.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-sky-100 space-y-3">
          <div className="text-4xl">🔎</div>
          <h3 className="text-base font-bold text-slate-700">
            Tidak ditemukan penawaran skill yang cocok
          </h3>
          <p className="text-xs text-slate-500">
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-md hover:shadow-sky-100/70 transition-all duration-200 space-y-4"
            >
              <div className="space-y-3">
                
                {/* Badge Kategori & Lokasi */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 font-semibold border border-sky-100">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-medium">
                    📍 {item.kampus} • {item.area_kos}
                  </span>
                </div>

                {/* Judul Skill yang Ditawarkan */}
                <h3 className="text-base font-bold text-slate-800 leading-snug">
                  {item.title}
                </h3>

                {/* Deskripsi */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Barter yang Dicari (Wanted) */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    <span>🔄</span> Barter yang Dicari:
                  </div>
                  <p className="text-xs text-emerald-950 font-medium">
                    {item.wanted}
                  </p>
                </div>
              </div>

              {/* Footer Kartu: Author & Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {item.author_name[0]}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    @{item.author_name}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedSkillForBarter(item)}
                  className="px-3.5 py-1.5 rounded-full bg-sky-50 hover:bg-sky-500 text-sky-700 hover:text-white font-semibold text-xs border border-sky-200/60 hover:border-transparent transition-all duration-150"
                >
                  Ajukan Barter
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal: Tawarkan Skill Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Tawarkan Keahlianmu 🎓
                </h2>
                <p className="text-xs text-slate-500">
                  Bantu anak kos lain dan tulis apa bantuan yang kamu harapkan.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Judul Skill yang Kamu Tawarkan
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Bisa Ajarin Kalkulus 1 & Matematika Dasar"
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Kategori
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                >
                  <option value="Coding">Coding & Web</option>
                  <option value="Desain">Desain & Poster</option>
                  <option value="Servis">Servis Gadget / Alat</option>
                  <option value="Makanan">Masakan Kos & Makanan</option>
                  <option value="Belajar">Les Pelajaran & Bahasa</option>
                  <option value="Musik">Hobi & Musik</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Deskripsi Keahlian & Ketersediaan
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Jelaskan detail apa saja yang bisa kamu bantu, kapan bisanya (misal: malam minggu / weekend)..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1">
                  Skill / Bantuan yang Kamu Inginkan (Barter)
                </label>
                <input
                  type="text"
                  required
                  value={newWanted}
                  onChange={(e) => setNewWanted(e.target.value)}
                  placeholder="Contoh: Barter masakan kos 1x / bantuan pasang lampu kamar"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/20 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Kontak (WhatsApp / Telegram / Instagram)
                </label>
                <input
                  type="text"
                  value={newContact}
                  onChange={(e) => setNewContact(e.target.value)}
                  placeholder="0812xxxxxx / @username"
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Posting Penawaran"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: Ajukan Barter */}
      {selectedSkillForBarter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">
                Ajukan Barter Skill 🤝
              </h2>
              <button
                onClick={() => setSelectedSkillForBarter(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1">
              <p className="text-[11px] font-bold text-sky-700 uppercase">
                Menghubungi @{selectedSkillForBarter.author_name}
              </p>
              <h4 className="text-sm font-bold text-slate-800">
                {selectedSkillForBarter.title}
              </h4>
              <p className="text-xs text-slate-500">
                📍 {selectedSkillForBarter.kampus} • {selectedSkillForBarter.area_kos}
              </p>
              <div className="pt-2 text-xs text-emerald-800 font-medium">
                Permintaan barter mereka: <em>&ldquo;{selectedSkillForBarter.wanted}&rdquo;</em>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Kontak Teman Barter Ini:
                </label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 font-semibold select-all">
                  {selectedSkillForBarter.contact || "Kontak belum dicantumkan"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Pesan / Ajakan Barter Kamu:
                </label>
                <textarea
                  rows={3}
                  value={barterMsg}
                  onChange={(e) => setBarterMsg(e.target.value)}
                  placeholder="Hai! Saya tertarik barter skill ini. Saya bisa bantu kamu dengan..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/20 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white"
                />
              </div>

              <button
                onClick={() => {
                  alert(
                    `Pesan ajakan barter berhasil dikirim ke @${selectedSkillForBarter.author_name}! Silakan hubungi langsung via ${selectedSkillForBarter.contact}`
                  );
                  setSelectedSkillForBarter(null);
                  setBarterMsg("");
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-200 transition"
              >
                Kirim Ajakan Barter 🚀
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
