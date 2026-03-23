'use client';
import React, { useEffect, useState } from 'react';
import { authApi } from '@/features/customer/api/authApi';
import { IUser } from '@/features/customer/customer.types';
import { ProfileCard } from '@/features/customer/components/client/ProfileCard';
import { SecuritySection } from '@/features/customer/components/client/SecuritySection';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // State điều khiển: 'profile' hiện thông tin, 'password' hiện đổi mật khẩu
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const fetchProfile = async () => {
    try {
      const res = await authApi.getProfile();
      setUser(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-[var(--color-primary)]">
      <Loader2 className="animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {activeTab === 'profile' ? (
        /* CHỈ HIỆN THÔNG TIN KHI Ở TAB PROFILE */
        user && (
          <ProfileCard
            user={user}
            onUpdateSuccess={fetchProfile}
            onGoToSecurity={() => setActiveTab('password')} // Chuyển sang đổi mật khẩu
          />
        )
      ) : (
        /* CHỈ HIỆN BẢO MẬT KHI Ở TAB PASSWORD */
        <SecuritySection onBack={() => setActiveTab('profile')} />
      )}
    </div>
  );
}