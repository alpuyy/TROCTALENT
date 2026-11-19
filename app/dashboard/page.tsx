"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserProfile {
  username?: string;
  kampus?: string;
  area_kos?: string;
}

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Cek sesi login user
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        setUserEmail(session.user.email || "");

        // 2. Ambil data profil dari tabel 'profiles' atau fallback ke metadata user
        const { data } = await supabase
          .from("profiles")
          .select("username, kampus, area_kos")
          .eq("id", session.user.id)
          .single();

        if (data) {
          setProfile(data);
        } else {
          // Fallback dari user_metadata Supabase
          const meta = session.user.user_metadata;
          setProfile({
            username: meta?.username || "Anak Kos",
            kampus: meta?.kampus || "Belum diatur",
            area_kos: meta?.area_kos || "Belum diatur",
          });
        }
      } catch (err: unknown) {
        console.warn("Koneksi ke Supabase gagal:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-sky-300 border-t-sky-600 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">
            Memuat profil TrocTalent Anda...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 p-6 sm:p-8 text-white shadow-lg shadow-sky-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
            <span>🎓</span> Dashboard Mahasiswa
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Halo, {profile?.username || "Anak Kos"}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-sky-100">
            Kelola keahlianmu dan temukan partner barter skill di sekitar kosanmu.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="px-4 py-2.5 rounded-full bg-white text-sky-700 text-xs sm:text-sm font-bold hover:bg-sky-50 shadow-sm transition"
          >
            🔍 Cari Barter
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold transition"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* Kartu Profil Mahasiswa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
            Username
          </p>
          <p className="text-lg font-bold text-slate-800">
            @{profile?.username || "belum_diatur"}
          </p>
          <p className="text-xs text-slate-400">{userEmail}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
            Kampus
          </p>
          <p className="text-lg font-bold text-slate-800">
            {profile?.kampus || "Belum diatur"}
          </p>
          <p className="text-xs text-slate-400">Verifikasi mahasiswa</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-sm space-y-1">
          <p className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">
            Area Kos
          </p>
          <p className="text-lg font-bold text-slate-800">
            {profile?.area_kos || "Belum diatur"}
          </p>
          <p className="text-xs text-slate-400">Radius teman barter terdekat</p>
        </div>
      </div>

      {/* Konten Skill Saya */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Keahlian Saya */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>💡</span> Keahlian yang Saya Tawarkan
            </h2>
            <Link
              href="/explore?action=post"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/60 transition"
            >
              + Tambah Skill
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-sky-100 p-8 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-sky-50 text-2xl flex items-center justify-center mx-auto text-sky-500">
              ✍️
            </div>
            <h3 className="text-sm font-bold text-slate-700">
              Belum Ada Skill yang Ditawarkan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Kamu bisa menawarkan keahlian seperti mengajari tugas kuliah, desain grafis, servis laptop, atau masakan rumahan kos!
            </p>
            <Link
              href="/explore?action=post"
              className="inline-block mt-2 px-5 py-2 text-xs font-bold text-white rounded-full bg-sky-500 hover:bg-sky-600 shadow-sm transition"
            >
              Tawarkan Keahlian Pertamamu
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Keahlian yang Dicari / Kebutuhan */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>🎯</span> Keahlian yang Saya Cari
          </h2>

          <div className="rounded-2xl bg-white border border-sky-100 p-6 space-y-4 shadow-sm">
            <p className="text-xs text-slate-500 leading-relaxed">
              Tulis bantuan atau skill yang sedang kamu butuhkan saat ini agar anak kos lain bisa mengajukan barter!
            </p>
            <div className="p-3.5 rounded-xl bg-sky-50/60 border border-dashed border-sky-200 text-xs text-slate-600">
              📌 <em>Contoh: &quot;Butuh diajarin rumus Excel untuk tugas magang&quot;, &quot;Butuh temen servis motor bareng&quot;.</em>
            </div>
            <Link
              href="/explore"
              className="block w-full text-center py-2.5 rounded-xl border border-sky-200 text-xs font-bold text-sky-700 hover:bg-sky-50 transition"
            >
              Lihat Penawaran Anak Kos Lain
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
