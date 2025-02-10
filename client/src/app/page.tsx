
import Image from "next/image";
import TransactionPage from "./transactions/page";

export default function Home() {
  return (
      <main className="flex">
      <div className="md:flex w-full">
        <nav className="w-64 p-4 md:h-screen hidden md:block bg-purple-900 sticky top-0">
          <div className="flex justify-center cursor-wait items-center">
            <h1 className=" text-2xl md:text-4xl tracking-wide leading-normal py-2 text-white font-bold hidden md:block">Tracky</h1>
            <Image src={"/nano.png"} height={100} width={50} className="rounded-full aspect-auto"  alt={"nano-dev"}/>
          </div>
          <hr className="my-4 border-gray-500"/>
          <ul className="flex cursor-pointer flex-col justify-center items-start text-white">
            <li className="text-lg  border-1 block px-4 hover:rounded w-full hover:bg-purple-600 rounded-sm font-bold py-2">
             <span>Transactions</span>
            </li>
          </ul>
        </nav>
        <div className="w-full">
        <div className="flex justify-center md:hidden sticky top-0 bg-purple-900 h-[20vh] cursor-wait items-center">
            <h1 className=" text-2xl md:text-4xl tracking-wide leading-normal py-2 text-white font-bold">Tracky</h1>
            <Image src={"/nano.png"} height={100} width={50} className="rounded-full aspect-auto"  alt={"nano-dev"}/>
          </div>
          <div className="p-8">
        <TransactionPage/>
          </div>
        </div>
      </div>
    </main>
  );
}
