import Header from "@/components/Header";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center">
      <Header />
      
      <section className="w-[90%] h-[80%] flex flex-col justify-center items-center gap-6">
        <Loading size="lg" />
        <p className="text-2xl text-[var(--foreground)]">Under development...</p>
      </section>
    </main>
  );
}
