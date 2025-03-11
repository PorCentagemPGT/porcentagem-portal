import ThemeButton from "./ThemeButton";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="w-full h-[20%]">
      <section className="w-[90%] flex justify-between items-center mx-auto py-6">
        <Logo />
        <ThemeButton />
      </section>
    </header>
  );
};

export default Header;