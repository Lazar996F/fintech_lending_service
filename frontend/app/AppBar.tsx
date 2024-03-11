'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AppBar = () => {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-200 p-2 flex gap-5 p-6 items-center">
      <div className="flex gap-2 flex-row justify-around w-full items-center">
        <Link href="/">
          <Image
            src="/images/applogo.png"
            width={80}
            height={80}
            alt="Land and borrow service logo"
            priority={true}
          />
        </Link>
        {session?.user && <p className="text-sky-600"> {session.user.email}</p>}
        {session?.user ? (
          <button
            className="text-blue-500 ml-6 hover:font-semibold"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="px-2 h-[40px] inline-flex items-center font-semibold text-large rounded-lg border border-transparent text-blue-600  hover:text-blue-800 hover:font-bold"
            onClick={() => signIn()}
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
