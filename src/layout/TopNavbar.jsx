import { useState } from "react";

export const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="w-96">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500 text-slate-900 dark:text-slate-100"
            placeholder="Search medicines, orders, or customers..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="cursor-pointer size-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-all relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className="cursor-pointer size-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/20 hover:text-primary transition-all">
          <span className="material-symbols-outlined">chat_bubble</span>
        </button>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <button className="bg-amber-500 hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20 cursor-pointer">
          <span className="material-symbols-outlined text-lg">add</span>
          New Sale
        </button>
      </div>
    </header>
  );
};
