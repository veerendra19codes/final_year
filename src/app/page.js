import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="hero flex w-full justify-center items-center min-h-screen">
        <div className="left w-1/2 flex flex-col gap-8 justify-center items-start px-16">
          <h1 className="text-blue-500 font-bold text-5xl text-start">
            Simplify Living, Empower Communities
          </h1>
          <p className="text-blue-400 text-start text-2xl">
            Streamline Society Management with Seamless Communication, Payments, and Support
            —All in One Place
          </p>
          <div className="flex gap-4 justify-center items-start">

            <button className="rounded-3xl px-8 py-2 bg-blue-500 text-white"> + Join a society</button>
            <Link href="/newsociety" className="rounded-3xl px-8 py-2 bg-blue-500 text-white">Create a society profile</Link>
          </div>

        </div>
        <div className="right w-1/2 flex justify-center items-center">
          <Image src="/hero2.jpeg" height={100} width={100} className="w-[500px] h-[400px] rounded-xl" alt="hero" />
        </div>
      </div>
    </div>
  );
}
