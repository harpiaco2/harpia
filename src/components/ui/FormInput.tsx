"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";

import { Input } from "./input";
import { toast } from "./use-toast";
import { Separator } from "./separator";

const FormSchema = z.object({
  question1: z.string().min(3, {
    message: "Digite pelo menos 3 caracteres.",
  }),
  question2: z.string().min(10, {
    message: "Digite pelo menos 10 caracteres.",
  }),
  question3: z.string().min(5, {
    message: "Digite pelo menos 5 caracteres.",
  }),
  question4: z.string().min(10, {
    message: "Digite pelo menos 10 caracteres.",
  }),
  question5: z.string().min(5, {
    message: "Digite pelo menos 5 caracteres.",
  }),
  selectField: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option1: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option2: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option3: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option4: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option5: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option6: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option7: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option8: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option9: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option10: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  option11: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
  picture1: z.string().nonempty({
    message: "Selecione uma opção valida.",
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectField: "",
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
      option6: "",
      option7: "",
      option8: "",
      option9: "",
      option10: "",
      option11: "",
      picture1: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Tipo de Infraestrutura
            </h1>
            <FormField
              control={form.control}
              name="selectField"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual tipo de infraestrutura foi afetada?
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Infraestrutura</SelectLabel>
                          <SelectItem value="school">Escola</SelectItem>
                          <SelectItem value="healthCenter">
                            Posto de saúde
                          </SelectItem>
                          <SelectItem value="road">Estrada</SelectItem>
                          <SelectItem value="bridge">Ponte</SelectItem>
                          <SelectItem value="sanitation">
                            Rede de saneamento
                          </SelectItem>
                          <SelectItem value="other">
                            Outro (especificar)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é o nome/identificação da infraestrutura?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Descrição do problema
            </h1>
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição detalhada do problema:</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="question3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é a extensão do dano (em metros quadrados ou outras
                    unidades relevantes)?
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite aqui..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Avaliação do Impacto
            </h1>

            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é o impacto na segurança pública? (0 - nenhum impacto,
                    5 - impacto crítico)
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
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
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é o impacto na comunidade local? (0 - nenhum impacto, 5
                    - impacto crítico)
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
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
              name="option3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é o impacto na economia local? (0 - nenhum impacto, 5 -
                    impacto crítico)
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">5</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">Urgência</h1>
            <FormField
              control={form.control}
              name="option4"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Qual é a urgência da intervenção? (0 - não urgente, 5 -
                    intervenção imediata necessária)
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
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
              name="option5"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quantas pessoas são diretamente afetadas pelo problema?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">0-50</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">51-200</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">201-500</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">501-1000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">Mais de 1000</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Acessibilidade e Mobilidade
            </h1>
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">4</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-five" id="option-five" />
                        <Label htmlFor="option-five">5</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Recursos Necessários
            </h1>
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
                    Quantos dias são necessários para completar a reconstrução?
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
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Mais de 90 dias</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Histórico de Incidentes
            </h1>
            <FormField
              control={form.control}
              name="option9"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Esse problema já ocorreu anteriormente?</FormLabel>
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
              name="option10"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Se sim, quantas vezes nos últimos 5 anos?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">1 vez</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">2-3 vezes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">4-5 vezes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Mais de 5 vezes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Não aconteceu</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Medidas Temporárias
            </h1>
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

          <Separator />

          <div className="flex justify-center flex-col m-3 gap-2">
            <h1 className="flex items-center justify-center">
              Fotos e Documentação
            </h1>
            <FormField
              control={form.control}
              name="picture1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Por favor, anexe fotos do local afetado.
                  </FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center m-6 items-center">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
