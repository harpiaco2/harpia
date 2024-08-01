"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

export default function Acesso() {
  return (
    <Tabs defaultValue="login" className="m-5 mt-10">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <SignUp />
      </TabsContent>
      <TabsContent value="login">
        <Login />
      </TabsContent>
    </Tabs>
  );
}

