"use client";

import { useEffect, useState } from 'react'; // Adicione esta linha no início do arquivo

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

// Definindo o esquema de validação com zod
const formSchema = z.object({
  emailLogin: z.string().email({
    message: "Seu email está inválido",
  }),
  passwordLogin: z.string().min(4, {
    message: "A senha deve ter pelo menos 4 caracteres.",
  }),
});

const Login = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setTimeout(async () => {
        console.log(data);
      }, 1000);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  }

  if (!isClient) {
    return null; // Ou um loading spinner se preferir
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faça seu Login!</CardTitle>
        <CardDescription>
          Preencha com seu email e senha abaixo para acessar o Harpias!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="emailLogin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="konventus@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordLogin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-center mt-5">
              <Button type="submit">Entrar</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
