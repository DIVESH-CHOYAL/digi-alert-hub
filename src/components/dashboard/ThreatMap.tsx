import { useEffect, useState, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const threats = [
  { name: "Moscow", coords: [37.6173, 55.7558] as [number, number] },
  { name: "Beijing", coords: [116.4074, 39.9042] as [number, number] },
  { name: "Lagos", coords: [3.3792, 6.5244] as [number, number] },
  { name: "São Paulo", coords: [-46.6333, -23.5505] as [number, number] },
  { name: "Mumbai", coords: [72.8777, 19.076] as [number, number] },
  { name: "Pyongyang", coords: [125.7625, 39.0392] as [number, number] },
  { name: "Tehran", coords: [51.389, 35.6892] as [number, number] },
];

const HQ: [number, number] = [-73.9857, 40.7484]; // NYC

const ThreatMap = memo(() => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(i);
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
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "hsl(0 0% 15%)" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Attack lines */}
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

        {/* Threat dots */}
        {threats.map((t, i) => (
          <Marker key={t.name} coordinates={t.coords}>
            <circle
              r={3}
              fill="hsl(340 100% 59%)"
              opacity={0.9}
            />
            <circle
              r={pulse && i % 2 === 0 ? 10 : 7}
              fill="none"
              stroke="hsl(340 100% 59%)"
              strokeWidth={1}
              opacity={0.3}
              className="animate-pulse-dot"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </Marker>
        ))}

        {/* HQ marker */}
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
    </div>
  );
});

ThreatMap.displayName = "ThreatMap";
export default ThreatMap;
