import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-[#E2583E] p-2.5 rounded-xl text-white font-bold text-xl shadow-lg shadow-orange-950/20">
          🔥
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold tracking-wide text-white">SnapBite</h1>
            <span className="text-[10px] bg-[#2D2B2B] text-gray-400 px-1.5 py-0.5 rounded font-mono">PÁGINA ADM</span>
          </div>
        </div>
      </div>
      
      <button className="hidden md:flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-gray-400 hover:text-white transition bg-[#222121] px-4 py-2 rounded-xl border border-[#2D2B2B]">
        <span className="text-[#E2583E] text-sm">+</span> Adicionar Produto
      </button>
      
      <div className="flex items-center gap-3 text-right">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Dono</p>
          <p className="font-semibold text-sm text-gray-300">SnapBite Corp</p>
        </div>
      </div>
    </header>
  );
}