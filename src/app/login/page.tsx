import Header from "@/components/Header";
import LoginForm from "./login-form";

export default async function LoginPage() {
  return (
    <>
      <Header />
      <section className="bg-cover bg-center bg-no-repeat min-h-[calc(100vh-80px)] grid place-items-center"
      style={{ backgroundImage: "url('/images/login-background.jpg')",
        backgroundBlendMode: "overlay",
      }}>
        <div className="w-full">
          <LoginForm />
        </div>
        <div className=" inset-0 bg-black opacity-10"></div>
      </section>
    </>
  );
}
