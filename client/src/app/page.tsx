import TransactionPage from "./transactions/page";

export default function Home() {
  return (
      <main className="flex">
      <div className="flex w-full">
        <nav className="w-64 p-4 h-screen bg-gray-600 sticky top-0">
          <div className="flex justify-center items-center">
            <h1 className="text-md py-2 text-white font-bold hidden md:block">Tracky</h1>
          </div>
          <ul className="flex flex-col text-white">
            <li className="text-lg font-bold py-2">
             <span>Transactions</span>
            </li>
       
          </ul>
        </nav>
        <div className="w-full p-8">
        <TransactionPage/>
        </div>
      </div>
    </main>
  );
}
