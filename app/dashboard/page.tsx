'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

interface UserProfile {
  username: string
  kampus: string
  area_kos: string
}

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('')
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      // 1. Cek sesi login user
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      setUserEmail(session.user.email || '')

      // 2. Ambil data tambahan dari tabel 'profiles'
      const { data, error } = await supabase
        .from('profiles')
        .select('username, kampus, area_kos')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Gagal memuat profil:', error.message)
      } else if (data) {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Memuat data profil...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard TrocTalent 🎓</h1>
            <p className="text-sm text-gray-500">Platform Pertukaran Skill Anak Kos</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Keluar (Logout)
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Username</p>
            <p className="mt-1 text-lg font-bold text-gray-800">{profile?.username || 'Belum diatur'}</p>
          </div>
          <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Kampus</p>
            <p className="mt-1 text-lg font-bold text-gray-800">{profile?.kampus || 'Belum diatur'}</p>
          </div>
          <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Area Kos</p>
            <p className="mt-1 text-lg font-bold text-gray-800">{profile?.area_kos || 'Belum diatur'}</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <h3 className="font-semibold text-gray-700">Email Akun Anda</h3>
          <p className="mt-1 text-sm text-gray-500">{userEmail}</p>
        </div>
      </div>
    </div>
  )
}