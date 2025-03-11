import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        src="/logo.png"
        alt="PorCentagem Logo"
        width={50}
        height={50}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
