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

export default function Password() {
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
                        <Input id="password" value={passwordState} onChange={(e) => setPasswordState(e.target.value)} type="password" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" value={confirmPasswordState} onChange={(e) => setConfirmPasswordState(e.target.value)} type="password" />
                    </div>
                </CardContent>                
                <CardFooter>
                    <Button className="w-full" onClick={SubmitPassword}>Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
