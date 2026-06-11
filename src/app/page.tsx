"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";

// ─── Tipos ───────────────────────────────────────────────────────────────────

type TipoPeca = "pequena" | "media" | "grande";

interface Slot {
  tipo: TipoPeca;
  id: number;
}

interface Transito {
  tipo: TipoPeca;
  id: number;
  fromIdx: number;
  toIdx: number;
  startedAt: number;
}

interface Evento {
  texto: string;
  hora: string;
  cor: string;
}

// ─── Constantes ──────────────────────────────────────────────────────────────

const TIPOS: TipoPeca[] = ["pequena", "media", "grande"];
const PULSE_MS = 4000;
const ANIM_MS = 1800;

const COR_TIPO: Record<TipoPeca, { bg: string; text: string; label: string; hex: string }> = {
  pequena: { bg: "bg-blue-500",   text: "text-white", label: "P", hex: "#3b82f6" },
  media:   { bg: "bg-yellow-400", text: "text-black", label: "M", hex: "#facc15" },
  grande:  { bg: "bg-red-500",    text: "text-white", label: "G", hex: "#ef4444" },
};

const COR_POSTO = ["border-cyan-500", "border-blue-500", "border-yellow-500", "border-red-500"];
const COR_EVENTO = ["border-cyan-500", "border-blue-500", "border-yellow-500", "border-red-500"];

const POS_X = [12.5, 37.5, 62.5, 87.5]; // % do container para cada posto

let idGlobal = 11;

function now(): string {
  return new Date().toTimeString().split(" ")[0];
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function Esteira() {
  const [slots, setSlots] = useState<(Slot | null)[]>([
    { tipo: "pequena", id: 10 },
    null,
    null,
    null,
  ]);
  const [transitos, setTransitos] = useState<Transito[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([
    { texto: "Sistema iniciado. Peça #10 (Pequena) aguardando em P0.", hora: now(), cor: "border-cyan-500" },
  ]);

  const slotsRef = useRef<(Slot | null)[]>(slots);

  useEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  useEffect(() => {
    const interval = setInterval(() => {
      const agora = Date.now();
      const currentSlots = slotsRef.current;
      const novoTipo = TIPOS[Math.floor(Math.random() * TIPOS.length)];
      const novoId = idGlobal++;
      const novosEventos: Evento[] = [];
      const novosTransitos: Transito[] = [];

      for (let i = 3; i >= 1; i--) {
        const peca = currentSlots[i - 1];
        if (peca) {
          novosTransitos.push({ tipo: peca.tipo, id: peca.id, fromIdx: i - 1, toIdx: i, startedAt: agora });
          novosEventos.push({
            texto: `Peça #${peca.id} (${peca.tipo}) avançou de P${i - 1} para P${i}`,
            hora: now(),
            cor: COR_EVENTO[i],
          });
        }
      }

      novosEventos.push({
        texto: `Nova Peça #${novoId} (${novoTipo}) chegou em P0`,
        hora: now(),
        cor: "border-cyan-500",
      });

      setSlots([{ tipo: novoTipo, id: novoId }, null, null, null]);
      setTransitos(novosTransitos);
      setEventos((prev) => [...novosEventos, ...prev].slice(0, 8));

      setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev];
          novosTransitos.forEach((t) => {
            next[t.toIdx] = { tipo: t.tipo, id: t.id };
          });
          return next;
        });
        setTransitos([]);
      }, ANIM_MS);
    }, PULSE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 text-white p-6 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-gray-900 rounded-lg px-6 py-3 border border-zinc-800">
          <h1 className="text-2xl font-bold text-blue-200">Sistema de Separação Sequencial</h1>
          <p className="text-blue-400 text-xs">Deslocamento Contínuo e Homogêneo da Esteira</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/50 px-4 py-2 rounded-lg text-green-400 text-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
          <span>Esteira em Movimento</span>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-[1fr_360px] gap-6">

        {/* Painel da esteira */}
        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-8 flex flex-col relative overflow-hidden">
          <h2 className="text-lg font-semibold mb-16 text-zinc-300">Linha de Transmissão Ativa</h2>

          <div className="relative" style={{ height: 140 }}>
            {/* Trilho */}
            <div className="absolute left-0 right-0 h-4 bg-zinc-800 top-12 rounded-full border-t border-b border-zinc-700 z-0" />

            {/* Setas entre postos */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute top-10 text-zinc-500 text-xl z-10"
                style={{ left: `${POS_X[i] + (POS_X[i + 1] - POS_X[i]) / 2 - 1}%`, transform: "translateX(-50%)" }}
              >
                ›
              </div>
            ))}

            {/* Círculos dos postos */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`absolute w-24 h-24 rounded-full bg-zinc-900 ${COR_POSTO[i]} border-4 flex items-center justify-center z-10`}
                style={{ left: `${POS_X[i]}%`, top: 0, transform: "translateX(-50%)" }}
              >
                {slots[i] && <Peca tipo={slots[i]!.tipo} id={slots[i]!.id} />}
              </div>
            ))}

            {/* Peças em trânsito */}
            {transitos.map((t) => (
              <PecaEmTransito
                key={`${t.id}-transit`}
                tipo={t.tipo}
                id={t.id}
                fromPct={POS_X[t.fromIdx]}
                toPct={POS_X[t.toIdx]}
                durationMs={ANIM_MS}
              />
            ))}
          </div>

          {/* Labels dos postos */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { label: "P0", sub: "Scanner / Entrada", rampa: null },
              { label: "P1", sub: "Triagem Pequenos",  rampa: { cor: "border-blue-500/40 bg-blue-950/30 text-blue-400",     txt: "Rampa P1" } },
              { label: "P2", sub: "Triagem Médios",    rampa: { cor: "border-yellow-500/40 bg-yellow-950/30 text-yellow-400", txt: "Rampa P2" } },
              { label: "P3", sub: "Triagem Grandes",   rampa: { cor: "border-red-500/40 bg-red-950/30 text-red-400",         txt: "Rampa P3" } },
            ].map(({ label, sub, rampa }, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-bold text-sm mt-1">{label}</span>
                <span className="text-[11px] text-zinc-500 mb-3">{sub}</span>
                {rampa ? (
                  <div className={`w-28 h-14 border-2 border-dashed ${rampa.cor} rounded-xl flex items-center justify-center font-medium text-xs`}>
                    {rampa.txt}
                  </div>
                ) : (
                  <div className="w-28 h-14 border border-zinc-800 rounded-xl bg-zinc-950/20 flex items-center justify-center text-xs text-zinc-600 italic">
                    Apenas Leitura
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-6 border-t border-zinc-800/80 pt-4 flex justify-between items-center text-[11px] text-zinc-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded" /> Pequena</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-yellow-400 rounded" /> Média</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded" /> Grande</span>
            </div>
            <span>Deslocamento Linear Síncrono 🔄</span>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-gray-900 border border-zinc-800 rounded-2xl p-5 flex flex-col">
          <h2 className="text-md font-semibold mb-4 text-zinc-300">Histórico de Movimentação</h2>
          <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1 flex-1">
            {eventos.map((evt, idx) => (
              <div key={idx} className={`border-l-4 ${evt.cor} bg-zinc-950/40 p-2 rounded-r transition-all duration-500`}>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">{evt.texto}</p>
                <p className="text-[10px] text-zinc-600 mt-1">{evt.hora}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Subcomponentes ──────────────────────────────────────────────────────────

interface PecaProps {
  tipo: TipoPeca;
  id: number;
}

function Peca({ tipo, id }: PecaProps) {
  const c = COR_TIPO[tipo];
  return (
    <div className={`w-14 h-14 rounded-md flex flex-col items-center justify-center font-bold shadow-2xl ${c.bg} ${c.text}`}>
      <span className="text-xs opacity-70">#{id}</span>
      <span className="text-[10px] uppercase font-black">{c.label}</span>
    </div>
  );
}

interface PecaEmTransitoProps {
  tipo: TipoPeca;
  id: number;
  fromPct: number;
  toPct: number;
  durationMs: number;
}

function PecaEmTransito({ tipo, id, fromPct, toPct, durationMs }: PecaEmTransitoProps) {
  const c = COR_TIPO[tipo];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.left = `${toPct}%`;
      });
    });
  }, [toPct]);

  const wrapStyle: CSSProperties = {
    position: "absolute",
    left: `${fromPct}%`,
    top: 0,
    transform: "translateX(-50%)",
    transition: `left ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    zIndex: 20,
    width: 96,
    height: 96,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  };

  return (
    <div ref={ref} style={wrapStyle}>
      <div
        className={`w-14 h-14 rounded-md flex flex-col items-center justify-center font-bold shadow-2xl ${c.bg} ${c.text}`}
        style={{ boxShadow: `0 0 20px ${c.hex}88` }}
      >
        <span className="text-xs opacity-70">#{id}</span>
        <span className="text-[10px] uppercase font-black">{c.label}</span>
      </div>
    </div>
  );
}