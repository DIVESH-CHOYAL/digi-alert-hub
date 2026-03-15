import { useEffect, useRef, useState } from "react";

type Event = { id: number; text: string; level: "critical" | "warning" | "resolved"; time: string };

const initialEvents: Event[] = [
  { id: 1, text: "Suspicious login detected — Mumbai", level: "critical", time: "14:32:01" },
  { id: 2, text: "Mass data export blocked — US East", level: "critical", time: "14:31:45" },
  { id: 3, text: "API rate limit exceeded — 4.2M calls", level: "warning", time: "14:31:22" },
  { id: 4, text: "Brute force attempt mitigated", level: "resolved", time: "14:30:58" },
  { id: 5, text: "New TLS certificate deployed", level: "resolved", time: "14:30:30" },
  { id: 6, text: "Anomalous traffic spike — SEA region", level: "warning", time: "14:29:55" },
  { id: 7, text: "Credential stuffing detected — EU proxy", level: "critical", time: "14:29:12" },
  { id: 8, text: "WAF rule updated — XSS patterns", level: "resolved", time: "14:28:44" },
  { id: 9, text: "DDoS mitigation activated — Layer 7", level: "warning", time: "14:28:01" },
  { id: 10, text: "Unauthorized API key usage blocked", level: "critical", time: "14:27:33" },
];

const newEventTexts = [
  "Phishing campaign detected — EMEA",
  "Malware signature updated — v4.2.1",
  "Geo-blocked access attempt — CN",
  "Session hijacking prevented",
  "Privilege escalation attempt — Admin panel",
  "DNS tunneling detected",
  "Zero-day exploit scan initiated",
];

const levelColor = { critical: "bg-destructive", warning: "bg-yellow-500", resolved: "bg-green-500" };

const ActivityTab = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(11);

  useEffect(() => {
    const interval = setInterval(() => {
      const text = newEventTexts[Math.floor(Math.random() * newEventTexts.length)];
      const levels: Event["level"][] = ["critical", "warning", "resolved"];
      const level = levels[Math.floor(Math.random() * 3)];
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour12: false });
      setEvents((prev) => [{ id: nextId.current++, text, level, time }, ...prev].slice(0, 30));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [events]);

  return (
    <div ref={scrollRef} className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
      {events.map((e) => (
        <div key={e.id} className="flex items-start gap-2 p-2 rounded-md bg-card glow-border text-xs animate-fade-in">
          <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${levelColor[e.level]}`} />
          <div className="flex-1">
            <p className="text-foreground">{e.text}</p>
            <p className="text-muted-foreground text-[10px] mt-0.5">{e.time} UTC</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTab;
