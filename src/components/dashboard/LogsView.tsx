import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

type LogEntry = {
  id: number;
  text: string;
  level: "critical" | "warning" | "resolved";
  time: string;
  details: string;
  systems: string;
  action: string;
};

const logs: LogEntry[] = [
  { id: 1, text: "Suspicious login detected — Mumbai", level: "critical", time: "14:32:01", details: "Multiple failed login attempts from IP 103.21.x.x followed by successful authentication using leaked credentials. Session originated from a known proxy network.", systems: "Auth Service, User Database", action: "Force password reset and enable MFA immediately" },
  { id: 2, text: "Mass data export blocked — US East", level: "critical", time: "14:31:45", details: "A service account attempted to export 2.4M user records via the admin API. The request was flagged by anomaly detection and blocked.", systems: "Admin API, Data Pipeline", action: "Revoke service account token and audit all recent exports" },
  { id: 3, text: "API rate limit exceeded — 4.2M calls", level: "warning", time: "14:31:22", details: "Single API key generated 4.2M requests in 15 minutes, exceeding the 500K/hr threshold. Traffic pattern suggests automated scraping.", systems: "API Gateway, Rate Limiter", action: "Enable rate limiting immediately and rotate API key" },
  { id: 4, text: "Brute force attempt mitigated", level: "resolved", time: "14:30:58", details: "Automated brute force attack targeting admin panel login was detected and blocked after 847 attempts. Source IP has been blacklisted.", systems: "WAF, Auth Service", action: "No further action required — IP permanently blocked" },
  { id: 5, text: "New TLS certificate deployed", level: "resolved", time: "14:30:30", details: "TLS certificate for api.digialert.io renewed successfully. SHA-256 fingerprint verified against pinned certificate store.", systems: "Certificate Manager, CDN", action: "Monitor certificate expiry dashboard for upcoming renewals" },
  { id: 6, text: "Anomalous traffic spike — SEA region", level: "warning", time: "14:29:55", details: "Traffic from Southeast Asia increased 340% in the last 30 minutes. Pattern analysis indicates possible DDoS preparation.", systems: "CDN, Load Balancer, WAF", action: "Pre-scale infrastructure and enable geo-blocking if attack materializes" },
  { id: 7, text: "Credential stuffing detected — EU proxy", level: "critical", time: "14:29:12", details: "Distributed credential stuffing attack using 12K unique IPs via EU proxy networks. 23 accounts compromised before detection.", systems: "Auth Service, User Database, Fraud Detection", action: "Lock compromised accounts and force credential reset" },
  { id: 8, text: "WAF rule updated — XSS patterns", level: "resolved", time: "14:28:44", details: "New XSS attack patterns identified in the wild have been added to the WAF ruleset. 14 new signatures deployed.", systems: "WAF, Security Rules Engine", action: "Review false positive rates over next 24 hours" },
  { id: 9, text: "DDoS mitigation activated — Layer 7", level: "warning", time: "14:28:01", details: "Layer 7 DDoS attack detected targeting /api/feed endpoint. Traffic volume: 850K req/s. Mitigation engaged with challenge-response.", systems: "DDoS Shield, API Gateway, CDN", action: "Monitor mitigation effectiveness and escalate if volume exceeds 2M req/s" },
  { id: 10, text: "Unauthorized API key usage blocked", level: "critical", time: "14:27:33", details: "Revoked API key was used from an unauthorized IP. The key was part of a batch compromised in last week's incident.", systems: "API Gateway, Key Management", action: "Complete audit of all API keys issued in the last 30 days" },
];

const levelColor = { critical: "bg-destructive", warning: "bg-yellow-500", resolved: "bg-green-500" };

const LogsView = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">Security Logs</h2>
      <div className="space-y-1">
        {logs.map((log) => (
          <div key={log.id}>
            <button
              onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              className="w-full flex items-start gap-3 p-3 rounded-md bg-card glow-border text-left hover:bg-muted/20 transition-colors"
            >
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${levelColor[log.level]}`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">{log.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{log.time} UTC</p>
              </div>
              {expanded === log.id ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 shrink-0" />
              )}
            </button>
            {expanded === log.id && (
              <div className="ml-5 p-3 bg-muted/10 border-l-2 border-primary/30 rounded-b-md text-xs space-y-2 animate-fade-in">
                <p className="text-muted-foreground">{log.details}</p>
                <p className="text-muted-foreground"><span className="text-foreground font-medium">Affected Systems:</span> {log.systems}</p>
                <p className="text-muted-foreground"><span className="text-foreground font-medium">Recommended:</span> {log.action}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsView;
