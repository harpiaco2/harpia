"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import the uploadImage function from the relevant file
import { uploadImage } from "@/app/api/data/images";

const FormSchema = z.object({
  picture1: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Selecione uma opção válida.",
    }),
});

export default function FormFotos() {
  const router = useRouter();
  const notifySuccess = () => toast.success("Upload realizado com sucesso!");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      picture1: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const file = data.picture1;
      const formId = "uniqueFormId"; // Substitua por um ID único relevante
      if (file) {
        const downloadURL = await uploadImage(file, formId);
        console.log('Image uploaded successfully:', downloadURL);
        notifySuccess();
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Erro ao realizar o upload da imagem.");
    }
  }

  return (
    <Card className="flex flex-col mt-9 m-3">
      <CardHeader>
        <CardTitle>Fotos e Documentação</CardTitle>
        <CardDescription>
          Preencha corretamente as questões abaixo!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center flex-col m-3 gap-2">
              <FormField
                control={form.control}
                name="picture1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Por favor, anexe fotos do local afetado.
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
      <ToastContainer />
    </Card>
  );
}
