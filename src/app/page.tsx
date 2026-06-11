import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-5 bg-gray-900 rounded-lg px-6 py-4">
          <h1 className="text-3xl font-bold text-blue-200">
            Sistema de Separação
          </h1>
          <p className="text-blue-400">
            Monitoramento em Tempo Real
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-500/20 border border-green-500 px-4 py-2 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span>Operando</span>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Produção Hoje
          </p>
          <p className="text-3xl font-bold">1248</p>
        </div>

        <div className="bg-gray-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Pequenos
          </p>
          <p className="text-3xl font-bold text-blue-400">
            745
          </p>
        </div>

        <div className="bg-gray-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Médios
          </p>
          <p className="text-3xl font-bold text-yellow-400">
            350
          </p>
        </div>

        <div className="bg-gray-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-zinc-400 text-sm">
            Grandes
          </p>
          <p className="text-3xl font-bold text-red-400">
            153
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Área principal */}
        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-10">
            Esteira de Separação
          </h2>

          {/* Entrada */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-zinc-800 px-4 py-2 rounded-lg">
              <span>📥</span>
              <span>Entrada</span>
            </div>
          </div>

          {/* Esteira */}
          <div className="relative flex justify-between items-center">

            {/* Linha da esteira */}
            <div className="absolute left-0 right-0 h-2 bg-zinc-700 top-1/2 -translate-y-1/2" />

            {/* P0 */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-cyan-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded bg-blue-500 flex items-center justify-center font-bold">
                  15
                </div>
              </div>
              <span>P0</span>
              <span className="text-xs text-zinc-400">
                Identificação
              </span>
            </div>

            {/* P1 */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-blue-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded bg-yellow-500 text-black flex items-center justify-center font-bold">
                  14
                </div>
              </div>

              <span>P1</span>

              <span className="text-xs text-zinc-400">
                Pequenos
              </span>

              {/* Braço */}
              <div className="absolute -top-14 flex flex-col items-center">
                <div className="w-2 h-12 bg-blue-500" />
                <div className="w-12 h-2 bg-blue-500" />
              </div>
            </div>

            {/* P2 */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-yellow-500 flex items-center justify-center">
              </div>

              <span>P2</span>

              <span className="text-xs text-zinc-400">
                Médios
              </span>

              <div className="absolute -top-14 flex flex-col items-center">
                <div className="w-2 h-12 bg-yellow-500" />
                <div className="w-12 h-2 bg-yellow-500" />
              </div>
            </div>

            {/* P3 */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-4 border-red-500 flex items-center justify-center">
              </div>

              <span>P3</span>

              <span className="text-xs text-zinc-400">
                Grandes
              </span>

              <div className="absolute -top-14 flex flex-col items-center">
                <div className="w-2 h-12 bg-red-500" />
                <div className="w-12 h-2 bg-red-500" />
              </div>
            </div>
          </div>

          {/* Rampas */}
          <div className="flex justify-around mt-20">
            <div className="w-32 h-20 border-2 border-blue-500 rounded-xl flex items-center justify-center text-blue-400">
              Rampa P1
            </div>

            <div className="w-32 h-20 border-2 border-yellow-500 rounded-xl flex items-center justify-center text-yellow-400">
              Rampa P2
            </div>

            <div className="w-32 h-20 border-2 border-red-500 rounded-xl flex items-center justify-center text-red-400">
              Rampa P3
            </div>
          </div>
        </div>

        {/* Eventos */}
        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            Eventos
          </h2>

          <div className="space-y-4">
            <div className="border-l-2 border-blue-500 pl-4">
              <p className="font-medium">
                Objeto #15 identificado
              </p>
              <p className="text-xs text-zinc-400">
                14:25:10
              </p>
            </div>

            <div className="border-l-2 border-yellow-500 pl-4">
              <p className="font-medium">
                Objeto #14 avançou para P1
              </p>
              <p className="text-xs text-zinc-400">
                14:25:08
              </p>
            </div>

            <div className="border-l-2 border-green-500 pl-4">
              <p className="font-medium">
                Objeto #12 removido
              </p>
              <p className="text-xs text-zinc-400">
                14:24:59
              </p>
            </div>

            <div className="border-l-2 border-red-500 pl-4">
              <p className="font-medium">
                Objeto #10 enviado para rampa
              </p>
              <p className="text-xs text-zinc-400">
                14:24:54
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}