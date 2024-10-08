'use client';
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getSeedDecryptedLocally } from "@/config/logged";
import { deriveEthereumPrivateKey, getEthereumWallet } from "@/config/etherium";
import { getPasswordLocaly } from "@/config/password";
import { Wallet } from "ethers";

const Home = () => {
  const [password, setPassword] = useState<string | null>(null);
  const [accountNo, setAccountNo] = useState<number>(1); // Initialize accountNo with 1 by default
  const [wallet, setWallet] = useState<Wallet[]>([]);

  useEffect(() => {
    // Only access localStorage on the client
    if (typeof window !== "undefined") {
      const savedAccountNo = parseInt(localStorage.getItem("accountNo") || "1");
      setAccountNo(savedAccountNo);
    }
  }, []);

  useEffect(() => {
    setPassword(getPasswordLocaly());
    if (!password) {
      window.location.href = "/password";
    }
  }, [password]);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        if (!password) return;
        const seed = await getSeedDecryptedLocally(password);
        const wallets: Wallet[] = [];
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

  const addAccount = () => {
    const newAccountNo = accountNo + 1;
    setAccountNo(newAccountNo);
    if (typeof window !== "undefined") {
      localStorage.setItem("accountNo", newAccountNo.toString());
    }
    window.location.reload();
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-8 bg-background text-primary">
      <div className="border-b border-slate-600 w-full flex justify-around items-center py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=Account+${accountNo}&rounded=true&bold=true`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="pt-4 flex flex-col gap-2">
              {wallet.map((acc, index) => (
                <div key={index} className="flex items-center justify-between w-full bg-muted rounded-[0.5rem]">
                  <Button className="w-full">Account {index + 1}</Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <p>Account {accountNo}</p>
        <Button onClick={addAccount}>Add</Button>
      </div>

      <div className="flex flex-col w-full px-10">
        {wallet.map((key, index) => (
          <div
            key={index}
            className="flex flex-col justify-between w-full mx-auto max-w-[800px] p-2 border-b bg-muted rounded-[0.5rem]"
          >
            <h2 className="text-xl font-bold">Wallet {index + 1}</h2>
            <h3 className="text-3xl font-bold">{key?.address}</h3>
            <h3 className="text-3xl font-bold">{key?.privateKey}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
