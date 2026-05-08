/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Archive, 
  Box, 
  ChevronUp, 
  Database, 
  FileText, 
  History, 
  Menu, 
  QrCode, 
  Settings, 
  TrendingUp,
  Wrench,
  RefreshCcw,
  Package
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto gap-8">
      
      {/* Top Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-on-surface pb-2 gap-4">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-tighter uppercase">Archive-00-Sys</h1>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold tracking-widest uppercase">
          <a href="#" className="border-b-2 border-on-surface pb-1">Index</a>
          <a href="#" className="text-secondary hover:text-on-surface transition-colors">Rankings</a>
          <a href="#" className="text-secondary hover:text-on-surface transition-colors">Writing</a>
          <a href="#" className="text-secondary hover:text-on-surface transition-colors">Projects</a>
          <a href="#" className="text-secondary hover:text-on-surface transition-colors">Search</a>
          <a href="#" className="text-secondary hover:text-on-surface transition-colors">About</a>
        </nav>
        <div className="hidden md:block">
          <QrCode className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      <main className="flex flex-col gap-8">
        
        {/* Institutional Header Card */}
        <section className="border-1px p-5 relative flex flex-col md:flex-row gap-6">
          <div className="absolute top-4 right-4 text-[11px] font-bold text-secondary tracking-widest">
            ID: ARCH-9920-BX
          </div>
          
          <div className="w-20 h-20 border-1px bg-on-surface/10 relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-halftone-pattern" />
            <Archive className="w-10 h-10 relative z-10" />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Bureau of Absurdist Records</h2>
            <p className="text-sm mt-1 tracking-tight">AN ARCHIVE OF THINGS RANKED, THINGS WRITTEN, AND THINGS MADE</p>
            <p className="text-[10px] text-secondary mt-1">個人のアーカイブ</p>
            
            <div className="flex gap-2 mt-4">
              <span className="border-1px border-accent-rust text-accent-rust text-[11px] font-bold px-2 py-0.5 tracking-widest uppercase">
                [ Status: Declassified ]
              </span>
              <span className="border-1px text-on-surface text-[11px] font-bold px-2 py-0.5 tracking-widest uppercase">
                [ Clearance: Level 1 ]
              </span>
            </div>
          </div>
        </section>

        {/* 3-Column Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-1px divide-y md:divide-y-0 md:divide-x border-on-surface">
          
          {/* Rankings */}
          <section className="flex flex-col">
            <div className="bg-on-surface/5 border-b border-on-surface p-3 flex justify-between items-center relative overflow-hidden">
               <div className="absolute inset-0 bg-halftone-pattern opacity-5" />
               <h3 className="font-bold uppercase text-lg relative z-10">Rankings</h3>
               <span className="text-[11px] font-bold text-secondary relative z-10">[ 042 Entries ]</span>
            </div>
            <div className="flex flex-col p-2 gap-1">
              <ArchiveItem id="RNK-0042" date="2026.05.07" title="The Top 17 Fabrics" />
              <ArchiveItem id="RNK-0041" date="2026.04.22" title="Worst Smells to Wake Up To" />
              <ArchiveItem id="RNK-0040" date="2026.03.15" title="Best Chairs for Staring" />
              <ArchiveItem id="RNK-0039" date="2026.02.01" title="Ranking Every Cloud Shape" border={false} />
            </div>
          </section>

          {/* Writing */}
          <section className="flex flex-col">
            <div className="bg-on-surface/5 border-b border-on-surface p-3 flex justify-between items-center relative overflow-hidden">
               <div className="absolute inset-0 bg-halftone-pattern opacity-5" />
               <h3 className="font-bold uppercase text-lg relative z-10">Writing</h3>
               <span className="text-[11px] font-bold text-secondary relative z-10">[ 118 Entries ]</span>
            </div>
            <div className="flex flex-col p-2 gap-1">
              <ArchiveItem id="WRT-0118" date="2026.05.02" title="A Defense of the Spork" />
              <ArchiveItem id="WRT-0117" date="2026.04.18" title="Why do we apologize to inanimate objects?" />
              <ArchiveItem id="WRT-0116" date="2026.03.30" title="The Tension of Waiting for Water to Boil" />
              <ArchiveItem id="WRT-0115" date="2026.02.14" title="Romancing the Error Code" />
              <ArchiveItem id="WRT-0114" date="2026.01.22" title="Notes on a Dust Mote" border={false} />
            </div>
          </section>

          {/* Projects */}
          <section className="flex flex-col">
            <div className="bg-on-surface/5 border-b border-on-surface p-3 flex justify-between items-center relative overflow-hidden">
               <div className="absolute inset-0 bg-halftone-pattern opacity-5" />
               <h3 className="font-bold uppercase text-lg relative z-10">Projects</h3>
               <span className="text-[11px] font-bold text-secondary relative z-10">[ 012 Entries ]</span>
            </div>
            <div className="flex flex-col p-2 gap-1">
              <ArchiveItem id="PRJ-0012" date="2026.04.05" title="The Infinite Scroll Generator" />
              <ArchiveItem id="PRJ-0011" date="2025.11.20" title="A Button That Does Nothing" />
              <ArchiveItem id="PRJ-0010" date="2025.08.12" title="Museum of Forgotten Passwords" border={false} />
            </div>
          </section>

        </div>

        {/* Recent Activity Ledger */}
        <section className="mt-4">
          <div className="flex items-center gap-4 mb-3">
             <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase shrink-0">Recent Activity</h3>
             <div className="h-px bg-on-surface w-full" />
          </div>
          <div className="border-1px flex flex-col">
            <ActivityItem 
              date="2026.05.07" 
              id="RNK-0042" 
              desc="Published: The Top 17 Fabrics" 
              icon={<ChevronUp size={14} />} 
            />
            <ActivityItem 
              date="2026.05.02" 
              id="WRT-0118" 
              desc="Published: A Defense of the Spork" 
              icon={<ChevronUp size={14} />} 
            />
            <ActivityItem 
              date="2026.04.28" 
              id="SYS-992" 
              desc="Archive Maintenance: Index Rebuild" 
              icon={<Wrench size={14} />} 
              isLast={false}
            />
            <ActivityItem 
              date="2026.04.22" 
              id="RNK-0041" 
              desc="Published: Worst Smells to Wake Up To" 
              icon={<ChevronUp size={14} />} 
            />
            <ActivityItem 
              date="2026.04.18" 
              id="WRT-0117" 
              desc="Published: Why do we apologize to inanimate objects?" 
              icon={<ChevronUp size={14} />} 
            />
            <ActivityItem 
              date="2026.04.10" 
              id="SYS-991" 
              desc="Update: Font Rendering Protocol" 
              icon={<RefreshCcw size={14} />} 
            />
            <ActivityItem 
              date="2026.04.05" 
              id="PRJ-0012" 
              desc="Deployed: The Infinite Scroll Generator" 
              icon={<Package size={14} />} 
            />
            <ActivityItem 
              date="2026.03.30" 
              id="WRT-0116" 
              desc="Published: The Tension of Waiting for Water to Boil" 
              icon={<ChevronUp size={14} />} 
              isLast={true}
            />
          </div>
        </section>

      </main>

      {/* Institutional Footer */}
      <footer className="mt-8 pt-8 border-t border-on-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 text-[11px] font-bold tracking-widest leading-relaxed">
        <div className="flex flex-col gap-1">
          <div className="uppercase">Est. 2026 / Rev. 4.0.1 / Document-Class: Unrestricted [ 奥付 ]</div>
          <div className="text-secondary uppercase">Bureau of Absurdist Records</div>
        </div>
        <nav className="flex gap-4 uppercase">
          <a href="#" className="underline decoration-2 underline-offset-4">Index</a>
          <a href="#" className="text-secondary hover:text-on-surface hover:underline decoration-2 underline-offset-4">Logs</a>
          <a href="#" className="text-secondary hover:text-on-surface hover:underline decoration-2 underline-offset-4">Protocols</a>
          <a href="#" className="text-secondary hover:text-on-surface hover:underline decoration-2 underline-offset-4">Encrypted</a>
        </nav>
      </footer>

    </div>
  );
}

function ArchiveItem({ id, date, title, border = true }: { id: string, date: string, title: string, border?: boolean }) {
  return (
    <div className={`flex flex-col p-2 hover-invert cursor-pointer border-on-surface ${border ? 'border-b border-dashed' : ''}`}>
      <div className="flex justify-between items-center text-[11px] font-bold tracking-widest text-secondary group-hover:text-surface">
        <span>{id}</span>
        <span>{date}</span>
      </div>
      <h4 className="uppercase text-sm mt-1 truncate">{title}</h4>
    </div>
  );
}

function ActivityItem({ date, id, desc, icon, isLast = false }: { date: string, id: string, desc: string, icon: React.ReactNode, isLast?: boolean }) {
  return (
    <div className={`grid grid-cols-[100px_100px_1fr_40px] items-center p-2.5 hover-invert cursor-pointer border-on-surface transition-all ${!isLast ? 'border-b' : ''}`}>
      <span className="text-[11px] font-bold tracking-widest">{date}</span>
      <span className="text-[11px] font-bold tracking-widest text-secondary">{id}</span>
      <span className="text-sm uppercase truncate">{desc}</span>
      <div className="flex justify-end">{icon}</div>
    </div>
  );
}

