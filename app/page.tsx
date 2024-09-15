"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const handleButton = () => {
    router.push("/api/auth/signin");
  }
  return (
    <div className="container">
      <div className="flex mx-auto justify-center">
        <button className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg px-5 py2.5 me-2 mb-2" onClick={handleButton}>Login</button>
      </div>
    </div>
  );
}
