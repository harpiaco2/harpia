"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { setMeasure } from "@/app/api/data/measuresFunctions";

const FormSchema = z.object({
  option11: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  question5: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
});

export default function FormMedidas() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      option11: "",
      question5: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    await setMeasure(null, null, data.option11);
    await setMeasure(null, null, data.question5);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push("/form/fotos");
  }
  return (
    <Card className="flex flex-col mt-9 m-3">
      <CardHeader>
        <CardTitle>Medidas Temporárias</CardTitle>
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
                name="option11"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Há medidas temporárias que podem ser implementadas para
                      mitigar o problema?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">Sim</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">Não</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question5"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Se sim, quais medidas temporárias podem ser adotadas?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite aqui..." {...field} />
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
    </Card>
  );
}
