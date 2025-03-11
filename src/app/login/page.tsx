import Header from "@/components/Header";
import LoginForm from "./login-form";

export default async function LoginPage() {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000000);
  // });
  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-red-400 to-bg-red-300 min-h-screen grid place-items-center">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-primary mb-4">
            Bem vindo de volta
          </h1>
          <h2 className="text-lg text-center mb-4 text-ct-primary">
            Entre para ter acesso!
          </h2>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
