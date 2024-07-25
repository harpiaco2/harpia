"use client";

import { Label } from "@/components/ui/label";

export default function SecondHeader() {
  return (
    <div className="flex flex-col gap-7 rounded-lg m-5 bg-white">
      <Label className="font-bold text-lg pl-5 pt-4">
        Painel de Acompanhamento obras prioritárias Municipal
      </Label>
      <div className="flex flex-row  pb-4 items-center justify-evenly w-1/2">
        <div>
          <h1 className="pt-2 pr-4 pb-2 pl-4 font-bold bg-backgroundColor-baixa">
            Baixa
          </h1>
          <span className="font-semibold text-center text-sm">Obras 27</span>
        </div>
        <div>
          <h1 className="pt-2 pr-4 pb-2 pl-4 font-bold bg-backgroundColor-media">
            Média
          </h1>
          <span className="font-semibold text-center text-sm">Obras 2500</span>
        </div>
        <div>
          <h1 className="pt-2 pr-4 pb-2 pl-4 font-bold bg-backgroundColor-alta">
            Alta Prioridade
          </h1>
          <span className="font-semibold text-center text-sm">Obras 200</span>
        </div>
        <div>
          <h1 className="pt-2 pr-4 pb-2 pl-4 font-bold bg-backgroundColor-maxima">
            Máxima
          </h1>
          <span className="font-semibold text-center text-sm">Obras 120</span>
        </div>
      </div>
    </div>
  );
}
