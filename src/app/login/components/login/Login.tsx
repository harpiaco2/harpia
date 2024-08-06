"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser, registerUser } from '@/app/api/data/usersFunctions'; 

const loginSchema = z.object({
  emailLogin: z.string().email({ message: 'Seu email está inválido' }),
  passwordLogin: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

const registerSchema = z.object({
  emailRegister: z.string().email({ message: 'Seu email está inválido' }),
  passwordRegister: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formLogin = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailLogin: "",
      passwordLogin: "",
    },
  });

  const formRegister = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      emailRegister: "",
      passwordRegister: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    try {
      const user = await loginUser(data.emailLogin, data.passwordLogin);
      if (user) {
        setSuccessMessage('Login bem-sucedido!');
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
      setSuccessMessage(null);
    }
  };

  const handleRegister = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerUser("User Name", data.emailRegister, data.passwordRegister, "Phone Number");
      setSuccessMessage('Cadastro bem-sucedido! Faça login para continuar.');
      setErrorMessage(null);
      setIsLogin(true); // Retorna ao login após o cadastro
    } catch (error: any) {
      if (error.message === "A senha deve ter pelo menos 6 caracteres.") {
        setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setErrorMessage('Erro ao cadastrar. Tente novamente.');
      }
      setSuccessMessage(null);
    }
  };

  if (!isMounted) {
    return null; // Renderiza nada até que o componente esteja montado no cliente
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? 'Faça seu Login!' : 'Cadastre-se'}</CardTitle>
        <CardDescription>
          {isLogin
            ? 'Preencha com seu email e senha abaixo para acessar o Harpias!'
            : 'Preencha com seu email e senha abaixo para criar sua conta!'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLogin ? (
          <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(handleLogin)}>
              <FormField
                control={formLogin.control}
                name="emailLogin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formLogin.control}
                name="passwordLogin"
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
                <Button type="submit">Entrar</Button>
                {successMessage && <p className="text-green-600 mt-3">{successMessage}</p>}
                {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
                <p className="mt-5">
                  Não tem uma conta?{' '}
                  <Button variant="link" onClick={() => setIsLogin(false)}>
                    Cadastre-se
                  </Button>
                </p>
              </CardFooter>
            </form>
          </Form>
        ) : (
          <Form {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(handleRegister)}>
              <FormField
                control={formRegister.control}
                name="emailRegister"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu email" {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={formRegister.control}
                name="passwordRegister"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua senha" {...field} />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <CardFooter className="flex flex-col items-center mt-5">
                <Button type="submit">Cadastrar</Button>
                {successMessage && <p className="text-green-600 mt-3">{successMessage}</p>}
                {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
                <p className="mt-5">
                  Já tem uma conta?{' '}
                  <Button variant="link" onClick={() => setIsLogin(true)}>
                    Faça Login
                  </Button>
                </p>
              </CardFooter>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Login;
