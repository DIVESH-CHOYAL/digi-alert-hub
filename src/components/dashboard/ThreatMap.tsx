import { useEffect, useState, memo, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const threats = [
  { name: "Moscow", coords: [37.6173, 55.7558] as [number, number], type: "Data Breach", severity: "Critical", minutes: 3 },
  { name: "Beijing", coords: [116.4074, 39.9042] as [number, number], type: "API Abuse", severity: "Critical", minutes: 7 },
  { name: "Lagos", coords: [3.3792, 6.5244] as [number, number], type: "Bot Network", severity: "High", minutes: 12 },
  { name: "São Paulo", coords: [-46.6333, -23.5505] as [number, number], type: "Credential Stuffing", severity: "Medium", minutes: 18 },
  { name: "Mumbai", coords: [72.8777, 19.076] as [number, number], type: "DDoS", severity: "High", minutes: 5 },
  { name: "Pyongyang", coords: [125.7625, 39.0392] as [number, number], type: "Phishing", severity: "Critical", minutes: 2 },
  { name: "Tehran", coords: [51.389, 35.6892] as [number, number], type: "Insider Threat", severity: "High", minutes: 25 },
];

const HQ: [number, number] = [-73.9857, 40.7484];

const sevColors: Record<string, string> = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-yellow-600 text-foreground",
  Medium: "bg-yellow-500/70 text-foreground",
};

const ThreatMap = memo(() => {
  const [pulse, setPulse] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
  }, []);

  const handleMapClick = useCallback(() => {
    setSelected(null);
  }, []);

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
                key={geo.rpiId}
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
              fill="hsl(340 100% 59%)"
              opacity={0.9}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected === i ? null : i);
              }}
            />
            <circle
              r={pulse && i % 2 === 0 ? 10 : 7}
              fill="none"
              stroke="hsl(340 100% 59%)"
              strokeWidth={1}
              opacity={0.3}
              className="animate-pulse-dot"
              style={{ animationDelay: `${i * 0.3}s`, pointerEvents: "none" }}
            />
          </Marker>
        ))}

        <Marker coordinates={HQ}>
          <circle r={5} fill="hsl(340 100% 59%)" />
          <circle r={12} fill="none" stroke="hsl(340 100% 59%)" strokeWidth={1.5} opacity={0.5} className="animate-pulse-dot" />
          <text y={-18} textAnchor="middle" fill="hsl(0 0% 95%)" fontSize={8} fontWeight={600}>
            DIGI ALERT HQ
          </text>
        </Marker>
      </ComposableMap>

      {/* Floating threat card */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm glow-border rounded-lg p-3 max-w-[220px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-destructive animate-blink-live" />
          <span className="text-xs font-semibold text-foreground">Data Breach Attempt</span>
        </div>
        <div className="text-xs text-muted-foreground">Severity: <span className="text-primary font-semibold">Critical</span></div>
        <div className="text-xs text-muted-foreground mt-0.5">Origin: Moscow, RU</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {new Date().toLocaleTimeString("en-US", { hour12: false })} UTC
        </div>
      </div>

      {/* Clicked marker popup */}
      {selected !== null && (
        <div
          className="absolute bg-card/95 backdrop-blur-sm glow-border rounded-lg p-4 max-w-[260px] animate-fade-in z-10"
          style={{
            top: `${30 + selected * 8}%`,
            left: selected < 4 ? "55%" : "20%",
          }}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm font-bold text-foreground mb-1">{threats[selected].name} Threat Detected</p>
          <p className="text-xs text-muted-foreground mb-1.5">Type: <span className="text-foreground">{threats[selected].type}</span></p>
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${sevColors[threats[selected].severity]}`}>
            {threats[selected].severity}
          </span>
          <p className="text-xs text-muted-foreground mt-1.5">{threats[selected].minutes} minutes ago</p>
          <Button
            size="sm"
            className="mt-2 h-7 text-xs bg-primary hover:bg-secondary text-primary-foreground w-full"
            onClick={() => setSelected(null)}
          >
            View Details
          </Button>
        </div>
      )}
    </div>
  );
});

ThreatMap.displayName = "ThreatMap";
export default ThreatMap;
