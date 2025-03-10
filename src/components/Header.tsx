import ThemeButton from "./ThemeButton";

const Header = () => {
  return (
    <header className="w-full h-[20%]">
      <section className="w-[90%] flex justify-between items-center mx-auto py-6">
        <h1 className="text-5xl font-bold text-[var(--heading)]">
          PorCentagem
        </h1>
        <ThemeButton />
      </section>
    </header>
  );
};

export default Header;