'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { getPasswordLocaly, setPasswordLocaly } from "@/config/password";
import { useRouter } from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { getLoggedLocaly } from "@/config/logged";

export default function Password() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {push} = useRouter();
    const {toast} = useToast();

    function SubmitPassword() {
        if (password === confirmPassword) {
            setPasswordLocaly(password);
            push('/secret-phrase')
        } else {
            setPassword("");
            toast({
                variant: "destructive",
                title: "Passwords do not match",
                description: "Please make sure the passwords match",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        }
    }
    const user = useRef(null);
    useEffect(() => {
        user.current = getLoggedLocaly() || null ;
    }, []);

    function Submit() {
        const localPassword = getPasswordLocaly();
        if (localPassword === password) {
            push('/search-phrase')
        } else {
            setConfirmPassword("");
            setPassword("");
            toast({
                variant: "destructive",
                title: "Passwords do not match",
                description: "Please make sure the passwords match",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        }
    }
    
    if (user.current === null) {
        return (
            <div className="w-full h-full min-h-screen flex justify-center items-center bg-background">
            <Card className="w-1/4 h-2/3 border-border bg-popover">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Pocket</CardTitle>
                    <CardDescription>Enter the local password for the wallet</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>
                </CardContent>                
                <CardFooter>
                    <Button className="w-full" onClick={Submit}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
        )
    }

    return (
        <div className="w-full h-full min-h-screen flex justify-center items-center bg-background p-1">
            <Card className=" w-full md:w-1/4 md:h-2/3 border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Pocket</CardTitle>
                    <CardDescription>Enter the local password for the wallet</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                    </div>
                </CardContent>                
                <CardFooter>
                    <Button className="w-full" onClick={SubmitPassword}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
