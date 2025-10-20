
import Image from "next/image";
import TransactionPage from "./transactions/page";
import { HiUsers } from "react-icons/hi";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiFundsLine } from "react-icons/ri";

export default function Home() {
  return (
    <main className="flex">
      <div className="md:flex w-full">
        <nav className="w-64 p-4 md:h-screen hidden md:block bg-[#3A4C4F] sticky top-0">
          <div className="flex justify-center cursor-wait items-center">
            <h1 className=" text-2xl md:text-4xl tracking-wide leading-normal py-2 text-white font-bold hidden md:block">Tracky</h1>
            {/* <Image src={"/nano.png"} height={100} width={50} className="rounded-full aspect-auto" alt={"nano-dev"} /> */}
          </div>
          <hr className="my-4 border-gray-500" />
          <ul className="flex cursor-pointer flex-col gap-4 justify-center items-start text-white">
            <li className="text-lg  border-1 block px-4 hover:rounded w-full hover:bg-[#3A4C4F] rounded-sm font-bold py-2">
              <div className="flex gap-2 jusyify-center items-center ">
                <AiOutlineTransaction className="font-bold" size={30} />Transactions
              </div>
            </li>
            <li className="text-lg  border-1 block px-4 hover:rounded w-full hover:bg-[#3A4C4F] rounded-sm font-bold py-2">
              <div className="flex gap-2 jusyify-center items-center ">
                <HiUsers className="font-bold" size={30} />Users
              </div>
            </li>
          </ul>
        </nav>
        <div className="w-full">
          <div className="flex justify-center md:hidden sticky top-0 bg-[#3A4C4F] h-[20vh] cursor-wait items-center">
            <h1 className=" text-2xl md:text-4xl tracking-wide leading-normal py-2 text-white font-bold">Tracky</h1>
            <Image src={"/nano.png"} height={100} width={50} className="rounded-full aspect-auto" alt={"nano-dev"} />
          </div>
          <div className="p-8 w-full">
            <div className="container mx-auto py-10">
              <div className="flex justify-between  w-full p-4">
                <div className="flex justify-center bg-[#D5EADA] items-center border border-2 gap-4 rounded-lg w-[20vw] h-40">
                  <span className="block">
                    <HiUsers size={50} />
                  </span><br />
                  <span className="text-lg font-bold text-xl">
                    120 Users
                  </span>
                </div>
                <div className="flex justify-center items-center bg-[#FED1CE] border border-2 gap-4 rounded-lg w-[20vw] h-40">
                  <span>
                    <AiOutlineTransaction size={50} />
                  </span><br />
                  <span className="text-lg font-bold text-xl">
                    34k Transactions
                  </span>
                </div>
                <div className="flex justify-center items-center bg-[#FCFCF7] border border-2 gap-4 rounded-lg w-[20vw] h-40">
                  <span>
                    <RiFundsLine  size={50} />
                  </span><br />
                  <span className="text-lg font-bold text-xl">
                    504M Turn Over
                  </span>                </div>
              </div>
              <TransactionPage />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
