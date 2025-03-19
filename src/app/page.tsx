import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section
        className="relative min-h-[calc(100vh-80px)] pt-20 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{ backgroundImage: "url('/images/home-background.jpg')",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <p className="absolute text-6xl font-extrabold text-ct-primary text-center">
          More fast, more food.
        </p>
      </section>
    </>
  );
}
