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

import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setResource } from "@/app/api/data/resourceFunctions";

const FormSchema = z.object({
  option8: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  question4: z.string().min(3, {
    message: "Digite pelo menos 3 caracteres.",
  }),
});

export default function FormRecursos() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question4: "",
      option8: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data).length);

    await setResource(null, null, data.question4);
    await setResource(null, null, data.option8);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push("/form/historico");
  }
  return (
    <Card className="flex flex-col mt-9 m-3">
      <CardHeader>
        <CardTitle>Recursos Necessários</CardTitle>
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
                name="question4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Qual é o custo estimado para a reconstrução?
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Digite aqui..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option8"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantos dias são necessários para completar a
                      reconstrução?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">0-7 dias</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">8-30 dias</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-three"
                            id="option-three"
                          />
                          <Label htmlFor="option-three">31-90 dias</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-four"
                            id="option-four"
                          />
                          <Label htmlFor="option-four">Mais de 90 dias</Label>
                        </div>
                      </RadioGroup>
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
