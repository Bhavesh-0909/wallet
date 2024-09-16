'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSeedDecryptedLocally } from "@/config/logged";
import { deriveEthereumPrivateKey, getEthereumWallet } from "@/config/etherium";
import { getPasswordLocaly } from "@/config/password";
import { Wallet } from "ethers";

const Home = () => {
  const [password, setPassword] = useState<string | null>(null);
  let accountNo = parseInt(localStorage.getItem("accountNo") || "1");
  const [wallet, setWallet] = useState<Wallet[]>([]);

  useEffect(() => {
    setPassword(getPasswordLocaly());
    if (!password) {
      window.location.href = "/password";
    }
  }, []);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        if (!password) return;
        const seed = await getSeedDecryptedLocally(password);
        const wallets = [];
        if (!seed) return;
        for (let i = 0; i < accountNo; i++) {
          const privateKey = deriveEthereumPrivateKey(seed, `m/44'/60'/${i}'/0/0`);
          const wallet = getEthereumWallet(privateKey);
          wallets.push(wallet);
        }
        if (wallets.length > 0) {
          setWallet(wallets);
        }
        
      } catch (error) {
        console.error("Error deriving wallets: ", error);
      }
    };

    loadWallets();
  }, [password, accountNo]);

  function addaccount() {
    accountNo++;
    localStorage.setItem("accountNo", accountNo.toString());
    window.location.reload();
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-8 bg-gradient-to-b from-blue-900 to-slate-900 text-white">
      <div className="border-b border-slate-600 w-full flex justify-between items-center py-3 px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={`https://ui-avatars.com/api/?name=Account+${accountNo}&rounded=true&bold=true&background=4F46E5&color=fff`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <div className="pt-4 flex flex-col gap-4">
              {wallet.map((acc, index) => (
                <div key={index} className="flex items-center justify-between w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3">
                  <Button className="w-full text-lg font-medium">Account {index + 1}</Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <p className="text-lg font-semibold">Account {accountNo}</p>
        <Button className="bg-indigo-600 hover:bg-indigo-500 transition" onClick={addaccount}>Add Account</Button>
      </div>

      <div className="flex flex-col w-full px-6 gap-6">
        {wallet?.map((key, index) => (
          <div
            key={index}
            className="flex flex-col justify-between w-full max-w-[800px] mx-auto bg-gray-800 hover:bg-gray-700 transition p-6 border border-gray-600 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-300 mb-2">Wallet {index + 1}</h2>
            <div className="text-lg font-mono break-all bg-gray-900 p-4 rounded-lg text-indigo-400 mb-4">
              <p><strong>Address:</strong> {key?.address}</p>
              <p><strong>Private Key:</strong> {key?.privateKey}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
