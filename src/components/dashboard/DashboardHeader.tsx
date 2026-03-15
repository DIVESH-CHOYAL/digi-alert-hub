import { useEffect, useState } from "react";
import { Shield, User } from "lucide-react";

const DashboardHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="text-primary font-bold text-lg tracking-tight">DIGI ALERT</span>
        <span className="text-muted-foreground text-sm">Security Command Center</span>
      </div>

      <div className="text-muted-foreground text-sm font-mono">
        {time.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
        {" · "}
        {time.toLocaleTimeString("en-US", { hour12: false })}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-destructive animate-blink-live" />
          <span className="text-destructive text-xs font-semibold tracking-wide">LIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          <span className="text-green-500 text-xs">SHIELD AI: ACTIVE</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
