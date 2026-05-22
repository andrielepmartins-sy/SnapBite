import React from "react";

interface BanerProps {
  counts: {
    pending: number;
    production: number;
    sent: number;
    delivered: number;
  };
}

export default function Baner({ counts }: BanerProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Recebidos (Mapeia status "pending") */}
      <div className="bg-[#222121] rounded-2xl p-4 flex items-center justify-between border border-[#2D2B2B]">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Recebidos</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></span>
        </div>
        <span className="text-2xl font-bold text-white">{counts.pending}</span>
      </div>

      {/* Em Produção */}
      <div className="bg-[#222121] rounded-2xl p-4 flex items-center justify-between border border-[#2D2B2B]">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Em Produção</span>
          <span className="w-2 h-2 rounded-full bg-purple-500 shadow-sm shadow-purple-500/50"></span>
        </div>
        <span className="text-2xl font-bold text-white">{counts.production}</span>
      </div>

      {/* Enviados */}
      <div className="bg-[#222121] rounded-2xl p-4 flex items-center justify-between border border-[#2D2B2B]">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Enviados</span>
          <span className="w-2 h-2 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50"></span>
        </div>
        <span className="text-2xl font-bold text-white">{counts.sent}</span>
      </div>

      {/* Entregues */}
      <div className="bg-[#222121] rounded-2xl p-4 flex items-center justify-between border border-[#2D2B2B]">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs uppercase font-bold tracking-wider">Entregues</span>
          <span className="text-green-500 font-bold bg-green-950/40 px-1.5 py-0.5 rounded text-xs border border-green-900/30">✓</span>
        </div>
        <span className="text-2xl font-bold text-white">{counts.delivered}</span>
      </div>
    </section>
  );
}