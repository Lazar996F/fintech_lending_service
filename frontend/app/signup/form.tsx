'use client';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Form() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
const password = formData.get('password');
    const response = await fetch(`http://localhost:5000/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });


    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/dashboard');
    } else {
      router.push('/');
    }

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="email"
        placeholder="email"
        className="border border-black text-black p-2"
        type="email"
      />
      <input
        placeholder="password"
        name="password"
        className="border border-black  text-black p-2"
        type="password"
      />
      <button type="submit">Sign up</button>
    </form>
  );
}
