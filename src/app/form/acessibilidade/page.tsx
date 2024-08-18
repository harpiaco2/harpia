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
import { addAccessibilitie } from "@/app/api/data/accessibilitieFunctions";
import { getFormId } from "@/globalState";

const FormSchema = z.object({
  option6: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option7: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
});

export default function FormAcessibilidade() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      option6: "",
      option7: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data).length);

    await addAccessibilitie(getFormId(), "", data.option6);

    await addAccessibilitie(getFormId(), "", data.option7);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.push("/form/recursos");
  }
  return (
    <Card className="flex flex-col mt-9 m-3">
      <CardHeader>
        <CardTitle>Acessibilidade e Mobilidade</CardTitle>
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
                name="option6"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      O problema está afetando a acessibilidade de serviços
                      essenciais (saúde, educação, transporte)? (0 - não, 5 -
                      impacta severamente)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-three"
                            id="option-three"
                          />
                          <Label htmlFor="option-three">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-four"
                            id="option-four"
                          />
                          <Label htmlFor="option-four">4</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-five"
                            id="option-five"
                          />
                          <Label htmlFor="option-five">5</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="option7"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      O problema está causando interrupções no tráfego ou
                      mobilidade? (0 - não, 5 - interrupção completa)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label htmlFor="option-one">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <Label htmlFor="option-two">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-three"
                            id="option-three"
                          />
                          <Label htmlFor="option-three">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-four"
                            id="option-four"
                          />
                          <Label htmlFor="option-four">4</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="option-five"
                            id="option-five"
                          />
                          <Label htmlFor="option-five">5</Label>
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
