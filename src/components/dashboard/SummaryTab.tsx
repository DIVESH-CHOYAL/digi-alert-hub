import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topThreats = [
  { name: "Unauthorized Access", priority: 10, impact: "Critical" },
  { name: "Data Scraping", priority: 10, impact: "Critical" },
  { name: "API Breach", priority: 9, impact: "High" },
  { name: "Insider Threat", priority: 9, impact: "High" },
  { name: "Bot Network", priority: 8, impact: "Medium" },
];

const SummaryTab = () => {
  const [score, setScore] = useState(743);
  const [threats, setThreats] = useState(650);

  useEffect(() => {
    const s = setInterval(() => {
      setScore((v) => v + (Math.random() > 0.5 ? 2 : -2));
    }, 3000);
    const t = setInterval(() => {
      setThreats((v) => v + 1);
    }, 5000);
    return () => { clearInterval(s); clearInterval(t); };
  }, []);

  return (
    <div className="space-y-4">
      <Card className="bg-card glow-border p-4 text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Exposure Score</p>
        <p className="text-5xl font-bold text-primary tabular-nums">{score}</p>
        <p className="text-xs text-destructive mt-1">+12 from last assessment</p>
        <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-primary/50" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 4px, hsl(340 100% 59% / 0.8) 4px, hsl(340 100% 59% / 0.8) 6px)" }} />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        <MetricCard label="Threat Exposure" value={684} delta={4} up detailType="threats" />
        <MetricCard label="Defense Surface" value={448} delta={3} up={false} detailType="defense" />
        <MetricCard label="Fleet Exposure" value={342} delta={7} up detailType="fleet" />
      </div>

      <Card className="bg-card glow-border p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Active Threats</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-primary tabular-nums">{threats}</span>
          <span className="text-xs text-destructive ml-2">+29 since last scan</span>
        </div>
      </Card>

      <Card className="bg-card glow-border p-3 space-y-3">
        <ProgressRow label="Techniques" count={354} pct={30} />
        <ProgressRow label="Software" count={100} pct={45} />
      </Card>

      <Card className="bg-card glow-border p-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Top 5 Threats</p>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left pb-1.5 font-medium">Name</th>
              <th className="text-center pb-1.5 font-medium">Priority</th>
              <th className="text-right pb-1.5 font-medium">Impact</th>
            </tr>
          </thead>
          <tbody>
            {topThreats.map((t) => (
              <tr key={t.name} className="border-b border-border/50 last:border-0">
                <td className="py-1.5 text-foreground">{t.name}</td>
                <td className="py-1.5 text-center text-primary font-semibold">◆ {t.priority}</td>
                <td className={`py-1.5 text-right ${t.impact === "Critical" ? "text-destructive" : t.impact === "High" ? "text-yellow-500" : "text-muted-foreground"}`}>{t.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

type DetailType = "threats" | "defense" | "fleet";

const MetricCard = ({ label, value, delta, up, detailType }: { label: string; value: number; delta: number; up: boolean; detailType: DetailType }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Card
        className="bg-card glow-border glow-border-hover p-3 transition-all duration-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-bold text-foreground tabular-nums">{value}</p>
        <div className={`flex items-center gap-0.5 text-xs ${up ? "text-destructive" : "text-green-500"}`}>
          {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          <span>{up ? "↑" : "↓"}{delta}</span>
          <ChevronDown className={`w-3 h-3 ml-auto text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </Card>
      {open && (
        <div className="mt-1 p-2 bg-card glow-border rounded-md text-[10px] space-y-1.5 animate-fade-in">
          {detailType === "threats" && (
            <>
              <DetailBar label="Credential Attacks" pct={72} />
              <DetailBar label="API Abuse" pct={58} />
              <DetailBar label="Bot Traffic" pct={41} />
            </>
          )}
          {detailType === "defense" && (
            <>
              <DetailBar label="Perimeter" pct={85} />
              <DetailBar label="Application" pct={62} />
              <DetailBar label="Data Layer" pct={44} />
            </>
          )}
          {detailType === "fleet" && (
            <div className="space-y-1">
              {["Config drift detected", "New endpoint added", "Patch deployed", "Agent offline", "Scan completed"].map((e, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{e}</span>
                  <span className="ml-auto text-muted-foreground">{i + 1}h ago</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const DetailBar = ({ label, pct }: { label: string; pct: number }) => (
  <div>
    <div className="flex justify-between text-muted-foreground mb-0.5">
      <span>{label}</span>
      <span className="text-primary">{pct}%</span>
    </div>
    <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
      <div className="h-full rounded-full bg-primary/70" style={{ width: `${pct}%` }} />
    </div>
  </div>
);

const ProgressRow = ({ label, count, pct }: { label: string; count: number; pct: number }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-muted-foreground">{label}: <span className="text-foreground font-medium">{count}</span> detected</span>
      <span className="text-primary">{pct}%</span>
    </div>
    <Progress value={pct} className="h-1.5 bg-muted [&>div]:bg-primary" />
  </div>
);

export default SummaryTab;
