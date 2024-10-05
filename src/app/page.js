import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="hero flex w-full ">
        <div className="left w-1/2 flex flex-col gap-8 justify-center items-center">
          <h1 className="text-blue-500 font-bold text-3xl text-start">
            Simplify Living, Empower Communities
          </h1>
          <p className="text-blue-400 text-start">'
            Streamline Society Management with Seamless Communication, Payments, and Support—All in One Place
          </p>
        </div>
        <div className="right w-1/2 flex justify-center items-center">
          <Image src="/hero.jpg" height={100} width={100} className="w-[400px] h-[300px]" alt="hero" />
        </div>
      </div>
    </div>
  );
}
