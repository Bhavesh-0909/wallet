'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-8 bg-background text-primary">
      <div className="border-b border-slate-600 w-full flex justify-around items-center py-3">
        <Sheet>
          <SheetTrigger asChild>
            <Avatar>
              <AvatarImage src={`https://ui-avatars.com/api/?name=Account+${account[0].no ? "1" : "0"}&rounded=true&bold=true`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <div className="pt-4 flex flex-col gap-2">
              {account.map((acc, index) => (
                <div key={index} className="flex items-center justify-between w-full bg-muted rounded-[0.5rem]">
                  <Button className="w-full">Account {acc.no}</Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <p>Account {account[0]?.no}</p>
      </div>
      <div className="flex flex-col w-full px-10">
        {account[0]?.keys?.map((key, index) => (
          <div
            key={index}
            className="flex flex-col justify-between w-full mx-auto max-w-[800px] p-2 border-b-border bg-muted rounded-[0.5rem]"
          >
            <h3 className="text-3xl font-bold">{key.name}</h3>
            <p className="text-sm">Private Key: {key.value.privateKey}</p>
            <p className="text-sm">Public Key: {key.value.publicKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
