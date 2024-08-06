"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import validator from "validator";
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

import { registerUser } from "@/app/api/data/usersFunctions"; // Correção: usar a função correta
import { useState } from "react";

// Definindo o esquema de validação com zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "O nome de usuário deve ter pelo menos 2 caracteres.",
  }),

  emailSignUp: z.string().email({
    message: "Seu email está inválido",
  }),

  passwordSignUp: z.string().min(4, {
    message: "A senha deve ter pelo menos 4 caracteres.",
  }),
  
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Digite seu número corretamente",
  }),
});

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      emailSignUp: "",
      passwordSignUp: "",
      phone: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Chamando a função para criar o usuário
      await registerUser(data.username, data.emailSignUp, data.passwordSignUp, data.phone);

      // Mensagem de sucesso
      setSuccessMessage("Cadastro realizado com sucesso!");
      setErrorMessage(null); // Reseta qualquer mensagem de erro anterior
    } catch (error) {
      // Mensagem de erro
      setErrorMessage("Erro ao cadastrar o usuário. Tente novamente.");
      console.error("Erro ao cadastrar o usuário:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faça seu cadastro!</CardTitle>
        <CardDescription>
          Preencha com suas informações abaixo para acessar o Harpia!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailSignUp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="harpias@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu número de telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordSignUp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex flex-col items-center mt-5">
              <Button type="submit">Cadastrar</Button>
              {successMessage && (
                <p className="text-green-600 mt-3">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 mt-3">{errorMessage}</p>
              )}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
