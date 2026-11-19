"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    kampus: "",
    area_kos: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // 1. Validasi konfirmasi password
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok!");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);

    try {
      // 2. Daftarkan akun ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            kampus: formData.kampus,
            area_kos: formData.area_kos,
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      // 3. Simpan data tambahan ke tabel 'profiles'
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: authData.user.id,
          username: formData.username,
          kampus: formData.kampus,
          area_kos: formData.area_kos,
        });

        if (profileError) {
          console.warn("Profil disimpan via Auth metadata:", profileError.message);
        }
      }

      alert("Pendaftaran berhasil! Selamat datang di TrocTalent.");
      router.push("/dashboard");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Gagal melakukan pendaftaran. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 my-8">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-sky-100 shadow-xl shadow-sky-100/50">
        
        {/* Header Form */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 mx-auto flex items-center justify-center text-white text-2xl shadow-md shadow-sky-200/60 mb-3">
            🎓
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Daftar Akun TrocTalent
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bergabung dengan sesama anak kos & mulai tukar keahlian!
          </p>
        </div>

        {/* Notifikasi Error */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-xs sm:text-sm flex items-start gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Pendaftaran */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="contoh: joko_kos"
              className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="anak.kos@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Kampus
              </label>
              <input
                type="text"
                name="kampus"
                required
                value={formData.kampus}
                onChange={handleChange}
                placeholder="UGM / UI / ITB"
                className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Area Kos
              </label>
              <input
                type="text"
                name="area_kos"
                required
                value={formData.area_kos}
                onChange={handleChange}
                placeholder="Pogung / Dago"
                className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Ketik ulang password"
              className="w-full px-4 py-2.5 rounded-xl border border-sky-100 bg-sky-50/30 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold text-sm shadow-md shadow-sky-200 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Membuat Akun..." : "Daftar Sekarang"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs sm:text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-sky-600 hover:underline">
            Masuk di sini
          </Link>
        </p>

      </div>
    </div>
  );
}
