"use client";
import { useState } from 'react';
import { Atom, Zap, Microscope, Award, Terminal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lab() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runProtocol = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ hypothesis: input })
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      alert("BACKEND OFFLINE: Make sure Terminal 1 (Python) is running main.py!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans selection:bg-cyan-500 selection:text-black">
      {/* HUD Header */}
      <header className="flex justify-between items-start max-w-7xl mx-auto mb-20 border-l-4 border-cyan-500 pl-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter flex items-center gap-4">
            <Atom className="text-cyan-400 animate-spin-slow" size={48}/> AETHER.OS
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="h-[1px] w-12 bg-cyan-500/50"></span>
            <p className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase">Quantum Research Initiative</p>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Award size={20} className="text-cyan-400"/>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">System Authority</p>
                <p className="text-sm font-black text-white uppercase">Lead Scientist: Ali Haider</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto pt-10">
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-center">
            Initialize <span className="text-cyan-400 italic">Neural</span> Protocol
          </h2>
          
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-2 transition-all focus-within:border-cyan-500/50 shadow-2xl">
            <textarea 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent p-8 text-xl outline-none min-h-[150px] resize-none placeholder:text-slate-700"
              placeholder="Describe the chemical or quantum hypothesis..."
            />
            <div className="flex justify-between items-center p-4 border-t border-white/5 bg-white/[0.01]">
              <div className="flex gap-2 ml-4">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
              </div>
              <button 
                onClick={runProtocol} 
                disabled={loading}
                className="bg-cyan-500 text-black px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 flex items-center gap-2 group"
              >
                {loading ? "Analyzing..." : "Execute"} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{opacity: 0, scale: 0.95}} 
              animate={{opacity: 1, scale: 1}} 
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Status Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-amber-500/20 rounded-lg"><Microscope size={18} className="text-amber-500"/></div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Clearance</h3>
                </div>
                <p className="text-2xl font-black text-amber-500 uppercase tracking-tighter">{data.status}</p>
                <p className="text-[9px] text-slate-500 mt-2 font-mono uppercase">Reference: {data.id}</p>
              </div>

              {/* Data Card */}
              <div className="md:col-span-2 bg-cyan-500/[0.03] border border-cyan-500/20 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Terminal size={80}/>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/20 rounded-lg"><Zap size={18} className="text-cyan-400"/></div>
                  <h3 className="text-[10px] font-mono uppercase tracking-widest text-cyan-500">Live Findings</h3>
                </div>
                <div className="space-y-3">
                  {data.findings.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">Secure Terminal // End-to-End Encryption Active</p>
      </footer>
    </div>
  );
}