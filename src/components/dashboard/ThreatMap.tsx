import { useEffect, useState, memo, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { X, AlertTriangle, Clock, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const threats = [
  {
    name: "Moscow",
    coords: [37.6173, 55.7558] as [number, number],
    type: "Data Breach",
    severity: "Critical",
    minutes: 3,
    details: "1.2M user records exposed via unsecured API endpoint. Attacker exfiltrating profile data in bulk.",
    systems: "API Gateway, User Database",
    action: "Revoke API keys and enable emergency rate limiting immediately.",
    ip: "185.220.101.47",
  },
  {
    name: "Beijing",
    coords: [116.4074, 39.9042] as [number, number],
    type: "API Abuse",
    severity: "Critical",
    minutes: 7,
    details: "Scraping 500K user profiles through public API endpoints using distributed bot network.",
    systems: "Public API, CDN Layer",
    action: "Block IP range and enforce stricter API authentication.",
    ip: "103.224.182.21",
  },
  {
    name: "Lagos",
    coords: [3.3792, 6.5244] as [number, number],
    type: "Bot Network",
    severity: "High",
    minutes: 12,
    details: "1,240 fake accounts detected spreading coordinated misinformation across platform.",
    systems: "ML Detection Engine, Content Moderation",
    action: "Suspend flagged accounts and retrain detection model.",
    ip: "41.203.64.110",
  },
  {
    name: "São Paulo",
    coords: [-46.6333, -23.5505] as [number, number],
    type: "Credential Stuffing",
    severity: "Medium",
    minutes: 18,
    details: "Bot attempting 8,000 logins/min using leaked credential database from dark web.",
    systems: "Authentication Service",
    action: "Enable CAPTCHA and force 2FA for affected accounts.",
    ip: "177.71.207.33",
  },
  {
    name: "Mumbai",
    coords: [72.8777, 19.076] as [number, number],
    type: "DDoS Attack",
    severity: "High",
    minutes: 5,
    details: "2.1 Gbps volumetric attack targeting login endpoint. Cloudflare mitigation active.",
    systems: "Load Balancer, Firewall, CDN",
    action: "Activate DDoS protection tier 3 and update blocklist.",
    ip: "103.75.190.8",
  },
  {
    name: "Pyongyang",
    coords: [125.7625, 39.0392] as [number, number],
    type: "Phishing Campaign",
    severity: "Critical",
    minutes: 2,
    details: "Fake DIGI ALERT login pages targeting 8,000 users via SMS and email campaigns.",
    systems: "Email Gateway, DNS",
    action: "Issue platform-wide phishing alert and take down spoofed domains.",
    ip: "175.45.176.3",
  },
  {
    name: "Tehran",
    coords: [51.389, 35.6892] as [number, number],
    type: "Insider Threat",
    severity: "High",
    minutes: 25,
    details: "Privileged user downloading bulk data exports outside normal working hours.",
    systems: "Admin Panel, Data Export Service",
    action: "Suspend user access and initiate forensic audit.",
    ip: "91.108.4.201",
  },
];

const HQ: [number, number] = [-73.9857, 40.7484];

const sevColors: Record<string, { bg: string; text: string; dot: string }> = {
  Critical: { bg: "bg-red-500/20", text: "text-red-400", dot: "#ff4444" },
  High: { bg: "bg-orange-500/20", text: "text-orange-400", dot: "#ff8c00" },
  Medium: { bg: "bg-yellow-500/20", text: "text-yellow-400", dot: "#ffd700" },
};

const ThreatMap = memo(() => {
  const [pulse, setPulse] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [latestThreat, setLatestThreat] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
  }, []);

  // Rotate the floating card through threats
  useEffect(() => {
    const i = setInterval(() => {
      setLatestThreat((t) => (t + 1) % threats.length);
    }, 4000);
    return () => clearInterval(i);
  }, []);

  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

  const current = threats[latestThreat];

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 140, center: [20, 20] }}
        className="w-full h-full"
        style={{ background: "transparent" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="hsl(0 0% 12%)"
                stroke="hsl(340 30% 20%)"
                strokeWidth={0.4}
                onClick={handleMapClick}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "hsl(0 0% 15%)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {threats.map((t) => (
          <Line
            key={t.name}
            from={t.coords}
            to={HQ}
            stroke="hsl(340 100% 59%)"
            strokeWidth={1}
            strokeLinecap="round"
            className="animate-dash"
            style={{ opacity: 0.4 }}
          />
        ))}

        {threats.map((t, i) => (
          <Marker key={t.name} coordinates={t.coords}>
            <circle
              r={3}
              fill={sevColors[t.severity].dot}
              opacity={0.9}
              style={{
                cursor: "pointer",
                filter: `drop-shadow(0 0 4px ${sevColors[t.severity].dot})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected === i ? null : i);
              }}
            />
            <circle
              r={pulse && i % 2 === 0 ? 10 : 7}
              fill="none"
              stroke={sevColors[t.severity].dot}
              strokeWidth={1}
              opacity={0.3}
              style={{ animationDelay: `${i * 0.3}s`, pointerEvents: "none" }}
            />
          </Marker>
        ))}

        <Marker coordinates={HQ}>
          <circle r={5} fill="hsl(340 100% 59%)" />
          <circle
            r={12}
            fill="none"
            stroke="hsl(340 100% 59%)"
            strokeWidth={1.5}
            opacity={0.5}
            className="animate-pulse-dot"
          />
          <text y={-18} textAnchor="middle" fill="hsl(0 0% 95%)" fontSize={8} fontWeight={600}>
            DIGI ALERT HQ
          </text>
        </Marker>
      </ComposableMap>

      {/* Rotating floating threat card */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm glow-border rounded-lg p-3 max-w-[230px]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-destructive animate-blink-live" />
          <span className="text-xs font-bold text-foreground">
            {current.type} Detected
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Severity:{" "}
          <span className={`font-semibold ${sevColors[current.severity].text}`}>
            {current.severity}
          </span>
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          Origin: {current.name}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          IP: {current.ip}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {current.minutes} min ago ·{" "}
          {new Date().toLocaleTimeString("en-US", { hour12: false })} UTC
        </div>
      </div>

      {/* Clicked marker popup */}
      {selected !== null && (
        <div
          className="absolute bg-card/95 backdrop-blur-sm glow-border rounded-lg p-4 max-w-[270px] z-10"
          style={{
            top: `${20 + selected * 7}%`,
            left: selected < 4 ? "52%" : "18%",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle
                className="w-3.5 h-3.5"
                style={{ color: sevColors[threats[selected].severity].dot }}
              />
              <p className="text-sm font-bold text-foreground">
                {threats[selected].name}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-muted-foreground hover:text-foreground ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Type + Severity */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-muted-foreground">
              {threats[selected].type}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sevColors[threats[selected].severity].bg} ${sevColors[threats[selected].severity].text}`}
            >
              {threats[selected].severity}
            </span>
          </div>

          {/* Details */}
          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
            {threats[selected].details}
          </p>

          {/* Systems */}
          <div className="flex items-center gap-1.5 mb-1">
            <Wifi className="w-3 h-3 text-primary" />
            <span className="text-[10px] text-muted-foreground">
              <span className="text-primary font-semibold">Systems: </span>
              {threats[selected].systems}
            </span>
          </div>

          {/* Time + IP */}
          <div className="flex items-center gap-1.5 mb-3">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">
              {threats[selected].minutes} min ago · IP: {threats[selected].ip}
            </span>
          </div>

          {/* Recommended action */}
          <div className="bg-primary/10 border border-primary/20 rounded p-2 mb-3">
            <p className="text-[10px] text-primary font-semibold mb-0.5">
              ⚡ Recommended Action
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              {threats[selected].action}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="h-7 text-xs bg-primary hover:bg-primary/80 text-primary-foreground flex-1"
              onClick={() => setSelected(null)}
            >
              ✓ Acknowledge
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs border-destructive text-destructive hover:bg-destructive/10 flex-1"
              onClick={() => setSelected(null)}
            >
              ⚠ Escalate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

ThreatMap.displayName = "ThreatMap";
export default ThreatMap;