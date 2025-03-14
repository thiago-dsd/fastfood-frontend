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
      <section className="bg-gradient-to-r from-red-400 to-bg-red-300  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            <div className="mt-8">
              <p className="mb-3">Id: {user?.id}</p>
              <p className="mb-3">Name: {user?.name}</p>
              <p className="mb-3">Email: {user?.email}</p>
              <p className="mb-3">Role: {user?.role}</p>
            </div>
          </div>
        </div>
      </section>
      {/* <AuthPageInvisible /> */}
    </>
  );
}
