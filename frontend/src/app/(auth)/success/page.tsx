'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { userAuthStore } from '@/store/authStore';

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = userAuthStore();

  useEffect(() => {
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const user = searchParams.get('user');

    if (token && user) {
      const parsedUser = JSON.parse(decodeURIComponent(user));
      setUser({ ...parsedUser, type }, token);

      if (type === 'doctor') {
        router.replace('/doctor/dashboard');
      } else {
        router.replace('/patient/dashboard');
      }
    } else {
      router.replace('/login/patient');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging you in...</p>
    </div>
  );
}
