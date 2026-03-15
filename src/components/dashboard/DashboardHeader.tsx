import { useEffect, useState } from "react";
import { Shield, User, Zap } from "lucide-react";

const DashboardHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary fill-primary" />
          <span className="text-primary font-bold text-lg tracking-tight">
            DIGI ALERT
          </span>
        </div>
        <span className="text-muted-foreground text-xs">|</span>
        <span className="text-muted-foreground text-xs tracking-wide uppercase">
          Big Data Security Command Center
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-white text-sm font-mono font-bold">
          {time.toLocaleTimeString("en-US", { hour12: false })}
        </div>
        <div className="text-muted-foreground text-xs font-mono">
          {time.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-destructive/10 px-2 py-1 rounded">
          <span className="w-2 h-2 rounded-full bg-destructive animate-blink-live" />
          <span className="text-destructive text-xs font-bold tracking-widest">
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500 text-xs font-semibold">
            SHIELD AI v2.4 — ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-white text-xs font-semibold">Divesh Choyal</div>
            <div className="text-muted-foreground text-xs">Security Consultant</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
