import Header from "@/components/Header";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
  return (
    <>
      <Header />
      <section className="bg-cover bg-center bg-no-repeat py-8 min-h-[calc(100vh-80px)] grid place-items-center" style={{ backgroundImage: "url('/images/register-background.jpg')",
        backgroundBlendMode: "overlay",
      }}>
        <div className="w-full">
          <RegisterForm />
        </div>
        <div className=" inset-0 bg-black opacity-10"></div>
      </section>
    </>
  );
}
