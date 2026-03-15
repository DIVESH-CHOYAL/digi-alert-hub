import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

type Event = {
  id: number;
  text: string;
  level: "critical" | "warning" | "resolved";
  time: string;
  details: string;
  systems: string;
  action: string;
};

const makeDetails = (text: string) => ({
  details: `Incident "${text}" was detected by the SHIELD AI monitoring engine. Automated analysis identified the threat vector and correlated it with known attack patterns from the last 72 hours.`,
  systems: "API Gateway, User Database, Auth Service",
  action: "Enable rate limiting immediately and review access logs",
});

const initialEvents: Event[] = [
  { id: 1, text: "Suspicious login detected — Mumbai", level: "critical", time: "14:32:01", ...makeDetails("Suspicious login detected — Mumbai") },
  { id: 2, text: "Mass data export blocked — US East", level: "critical", time: "14:31:45", ...makeDetails("Mass data export blocked — US East") },
  { id: 3, text: "API rate limit exceeded — 4.2M calls", level: "warning", time: "14:31:22", ...makeDetails("API rate limit exceeded — 4.2M calls") },
  { id: 4, text: "Brute force attempt mitigated", level: "resolved", time: "14:30:58", ...makeDetails("Brute force attempt mitigated") },
  { id: 5, text: "New TLS certificate deployed", level: "resolved", time: "14:30:30", ...makeDetails("New TLS certificate deployed") },
  { id: 6, text: "Anomalous traffic spike — SEA region", level: "warning", time: "14:29:55", ...makeDetails("Anomalous traffic spike — SEA region") },
  { id: 7, text: "Credential stuffing detected — EU proxy", level: "critical", time: "14:29:12", ...makeDetails("Credential stuffing detected — EU proxy") },
  { id: 8, text: "WAF rule updated — XSS patterns", level: "resolved", time: "14:28:44", ...makeDetails("WAF rule updated — XSS patterns") },
  { id: 9, text: "DDoS mitigation activated — Layer 7", level: "warning", time: "14:28:01", ...makeDetails("DDoS mitigation activated — Layer 7") },
  { id: 10, text: "Unauthorized API key usage blocked", level: "critical", time: "14:27:33", ...makeDetails("Unauthorized API key usage blocked") },
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
  const [expanded, setExpanded] = useState<number | null>(null);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(11);

  useEffect(() => {
    const interval = setInterval(() => {
      const text = newEventTexts[Math.floor(Math.random() * newEventTexts.length)];
      const levels: Event["level"][] = ["critical", "warning", "resolved"];
      const level = levels[Math.floor(Math.random() * 3)];
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { hour12: false });
      setEvents((prev) => [{ id: nextId.current++, text, level, time, ...makeDetails(text) }, ...prev].slice(0, 30));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [events]);

  return (
    <div ref={scrollRef} className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
      {events.map((e) => (
        <div key={e.id}>
          <button
            onClick={() => setExpanded(expanded === e.id ? null : e.id)}
            className="w-full flex items-start gap-2 p-2 rounded-md bg-card glow-border text-xs text-left hover:bg-muted/20 transition-colors animate-fade-in"
          >
            <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${levelColor[e.level]}`} />
            <div className="flex-1">
              <p className="text-foreground">{e.text}</p>
              <p className="text-muted-foreground text-[10px] mt-0.5">{e.time} UTC</p>
            </div>
            {expanded === e.id ? (
              <ChevronDown className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
            ) : (
              <ChevronRight className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
            )}
          </button>
          {expanded === e.id && (
            <div className="ml-4 p-2 bg-muted/10 border-l-2 border-primary/30 rounded-b-md text-[11px] space-y-1.5 animate-fade-in">
              <p className="text-muted-foreground">{e.details}</p>
              <p className="text-muted-foreground"><span className="text-foreground font-medium">Affected:</span> {e.systems}</p>
              <p className="text-muted-foreground"><span className="text-foreground font-medium">Action:</span> {e.action}</p>
              <div className="flex gap-2 mt-1">
                <Button
                  size="sm"
                  className="h-6 text-[10px] bg-green-600 hover:bg-green-700 text-foreground"
                  disabled={resolved.has(e.id)}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setResolved((prev) => new Set(prev).add(e.id));
                  }}
                >
                  {resolved.has(e.id) ? "✓ Resolved" : "Mark as Resolved"}
                </Button>
                <Button size="sm" className="h-6 text-[10px] bg-destructive hover:bg-destructive/80 text-destructive-foreground">
                  Escalate
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityTab;
