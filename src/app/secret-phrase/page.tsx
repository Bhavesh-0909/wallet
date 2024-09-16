'use client';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { setLoggedLocaly } from "@/config/logged";
import { useRouter } from "next/navigation";
import { getPasswordLocaly } from "@/config/password";

const SecretPhrase = () => {
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent duplicate submissions
  const [mnemonic, setMnemonic] = useState("");
  const words = mnemonic.split(" ");
  const { toast } = useToast();
  const { push } = useRouter();

  const copyPhrase = () => {
    navigator.clipboard.writeText(mnemonic);
    toast({
      variant: "default",
      title: "Copied",
      description: "Phrase copied to clipboard",
    });
  };

  useEffect(() => {
    const password = getPasswordLocaly();
    if (!password) {
      push("/password");
    }
    setMnemonic(generateMnemonic());
  }, []);

  const submitPhrase = async () => {
    if (isSubmitting) return; // Prevent multiple submissions
    if(password === null) return;
    setIsSubmitting(true); // Disable button on click
    const seed = mnemonicToSeedSync(mnemonic);
    await setLoggedLocaly(seed, password);
    toast({
      variant: "default",
      title: "Success",
      description: "Secret phrase saved",
    });
    push('/'); // Redirect
  };

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center text-primary bg-background">
      <div className="max-w-[1080px] w-full flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-5xl text-center font-bold">Secret Phrase</h1>
          <p className="text-secondary-foreground text-center">
            Save these words in a Safe Place
          </p>
          <h3 className="text-blue-400 text-xl text-center">Read the Warning again</h3>
        </div>
        <div
          onClick={copyPhrase}
          className="bg-muted p-2 w-full max-w-[60%] rounded-md space-y-3 cursor-pointer"
        >
          <div className="grid grid-cols-3 gap-2">
            {words.map((word, index) => (
              <div key={index} className="p-2 border border-ring rounded-[0.5rem]">
                {index + 1}. {word}
              </div>
            ))}
          </div>
          <div className="border-t text-center border-ring w-full">
            Click anywhere on this card to copy
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms2"
              checked={checked}
              onCheckedChange={(value: boolean) => setChecked(value)}
            />
            <label htmlFor="terms2" className="text-sm font-medium leading-none">
              I saved the phrase in a safe place
            </label>
          </div>
          <Button 
            onClick={submitPhrase} 
            className="w-full mt-4" 
            disabled={!checked || isSubmitting} // Disable if unchecked or submitting
          >
            {isSubmitting ? 'Saving...' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecretPhrase;
