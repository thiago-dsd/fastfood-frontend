"use client"; 
import Header from "@/components/Header";
import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import { AuthPageInvisible } from "@/lib/protect-page";
import useStore from "@/store";

export default async function ProfilePage() {
  const user = useStore((state) => state.authUser);

  return (
    <>
      <Header />
      <section
  className="relative bg-cover bg-center bg-no-repeat min-h-[calc(100vh-80px)]"
  style={{
    backgroundImage: "url('/images/register-background.jpg')",
    backgroundBlendMode: "overlay",
  }}
>
  
  <div className="absolute inset-0 flex justify-center items-center">
    <div className="bg-ct-dark-200 rounded-md w-full max-w-lg p-8 flex flex-col items-center">
      <p className="text-4xl  text-ct-dark-600 text-center font-semibold mb-6">Profile Page</p>
      
      <div className="space-y-4 text-white">
        <p className="text-lg text-ct-dark-600">Id: {user?.id}</p>
        <p className="text-lg text-ct-dark-600">Name: {user?.name}</p>
        <p className="text-lg text-ct-dark-600">Email: {user?.email}</p>
        <p className="text-lg text-ct-dark-600">Role: {user?.role}</p>
      </div>
    </div>
  </div>
  
</section>
      {/* <AuthPageInvisible /> */}
    </>
  );
}
