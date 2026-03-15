import { useEffect, useState } from "react";
import { Shield, AlertTriangle, AlertCircle, 
         ShieldCheck, Clock, Cpu, Zap } from "lucide-react";

type LogEntry = {
  id: number;
  text: string;
  level: "critical" | "warning" | "resolved";
  time: string;
  ip: string;
  details: string;
  systems: string;
  action: string;
  userId?: string;
};

const logs: LogEntry[] = [
  { id: 1, text: "Suspicious login — Mumbai, India", level: "critical", time: "2 min ago",
    ip: "103.75.190.8", userId: "449821",
    details: "User ID 449821 logged in from unrecognized device in Mumbai. Previous login was from Chennai 2 hours ago. Velocity check triggered — impossible travel detected by SHIELD AI engine.",
    systems: "Auth Server, Session Manager, Geo-IP Module",
    action: "Force logout all sessions and send 2FA verification email immediately." },
  { id: 2, text: "Mass data export blocked — 500K records", level: "critical", time: "5 min ago",
    ip: "185.220.101.47", userId: "SVC-ACCOUNT-12",
    details: "Automated script attempted to export 500,000 user profile records via admin API. Request blocked after 12,000 records. IP flagged as malicious Tor exit node.",
    systems: "API Gateway, Admin Panel, Rate Limiter",
    action: "Revoke API key, block IP range 185.220.x.x and audit all admin API access logs." },
  { id: 3, text: "API rate limit exceeded — 4.2M calls", level: "warning", time: "8 min ago",
    ip: "91.108.4.201",
    details: "Single API key made 4.2 million calls in 10 minutes — 420x above the 10,000/hour limit. Behavioral pattern matches known industrial scraping toolkit v3.2.",
    systems: "Public API, CDN, Load Balancer",
    action: "Revoke the API key and implement stricter per-key rate limiting with CAPTCHA." },
  { id: 4, text: "Brute force attack mitigated", level: "resolved", time: "12 min ago",
    ip: "45.33.32.156",
    details: "Automated brute force attack targeting admin login was detected and blocked after 847 attempts in 90 seconds. WAF rule triggered and source IP permanently blacklisted.",
    systems: "WAF, Auth Service, IP Blacklist",
    action: "No further action required — IP permanently blocked across all regions." },
  { id: 5, text: "Bot network detected — 1,240 accounts", level: "critical", time: "15 min ago",
    ip: "Multiple",
    details: "ML model identified 1,240 coordinated bot accounts based on posting patterns, login timing, and content similarity scores above 94%. Network actively spreading political misinformation.",
    systems: "ML Detection Engine, Content Moderation, User Service",
    action: "Suspend all flagged accounts and retrain detection model with new signatures." },
  { id: 6, text: "AES-256 key rotation completed", level: "resolved", time: "22 min ago",
    ip: "Internal",
    details: "Scheduled quarterly AES-256 encryption key rotation completed successfully across all Big Data pipelines. New keys distributed to all 34 microservices. Zero downtime achieved.",
    systems: "Key Management Service, Data Pipelines",
    action: "Archive rotation certificate and schedule next rotation in 90 days." },
  { id: 7, text: "Credential stuffing — EU proxy", level: "critical", time: "31 min ago",
    ip: "176.58.x.x",
    details: "Distributed credential stuffing attack using 12,000 unique IPs via EU proxy networks. 23 user accounts compromised before SHIELD AI detection triggered auto-lockout.",
    systems: "Auth Service, Fraud Detection, User Database",
    action: "Lock all 23 compromised accounts and force credential reset via secure email." },
  { id: 8, text: "DDoS mitigated — 2.1 Gbps", level: "resolved", time: "45 min ago",
    ip: "8,000 IPs",
    details: "Volumetric DDoS attack from 8,000 distributed IPs targeting login endpoint. Peak: 2.1 Gbps. Cloudflare mitigation activated automatically within 34 seconds of detection.",
    systems: "CDN, Load Balancer, Firewall, Login Service",
    action: "Review firewall rules and update IP blocklist. Monitor for follow-up Layer 7 attack." },
  { id: 9, text: "Anomalous traffic spike — SEA region", level: "warning", time: "1 hr ago",
    ip: "Multiple",
    details: "Traffic from Southeast Asia increased 340% in 30 minutes. Pattern analysis indicates possible DDoS preparation or coordinated scraping from regional botnet.",
    systems: "CDN, Load Balancer, WAF, Analytics Engine",
    action: "Pre-scale infrastructure and enable geo-rate-limiting for SEA region." },
  { id: 10, text: "Zero-day patch deployed — CVE-2026-1042", level: "resolved", time: "2 hr ago",
    ip: "Internal",
    details: "Critical patch for CVE-2026-1042 deployed across all 34 backend servers. Vulnerability allowed privilege escalation via malformed JWT token. No exploitation detected before patch.",
    systems: "All Backend Services, JWT Auth Module",
    action: "Monitor for exploitation attempts over next 48 hours and confirm patch on all nodes." },
];

const levelConfig = {
  critical: {
    dot: "#ff4444", glow: "0 0 6px #ff444466",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    icon: AlertTriangle, iconColor: "text-red-400",
    border: "border-red-500/40",
  },
  warning: {
    dot: "#ffd700", glow: "0 0 6px #ffd70066",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    icon: AlertCircle, iconColor: "text-yellow-400",
    border: "border-yellow-500/40",
  },
  resolved: {
    dot: "#00ff88", glow: "0 0 6px #00ff8866",
    badge: "bg-green-500/15 text-green-400 border-green-500/30",
    icon: ShieldCheck, iconColor: "text-green-400",
    border: "border-green-500/40",
  },
};

const newEvents = [
  { text: "Phishing campaign detected — EMEA", level: "critical" as const, ip: "Multiple", userId: undefined,
    details: "Fake DIGI ALERT login pages deployed across 12 lookalike domains targeting European users via SMS campaigns.", systems: "Email Gateway, DNS, Auth Service", action: "Issue platform alert and initiate domain takedown requests immediately." },
  { text: "Privilege escalation attempt — Admin panel", level: "critical" as const, ip: "77.88.21.3", userId: "449001",
    details: "Attacker attempted to escalate from user to admin role using known JWT manipulation technique CVE-2025-8821.", systems: "Admin Panel, JWT Service, RBAC Module", action: "Patch JWT validation and audit all admin sessions created in last 24 hours." },
  { text: "DNS tunneling detected — outbound", level: "warning" as const, ip: "Internal", userId: undefined,
    details: "Unusual DNS query patterns from internal server suggest possible data exfiltration via DNS tunneling. 2.3GB of anomalous traffic detected.", systems: "DNS Resolver, Network Monitor", action: "Block suspicious DNS queries and isolate affected server for forensic analysis." },
];

const LogsView = () => {
  const [selected, setSelected] = useState<LogEntry>(logs[0]);
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "resolved">("all");
  const [allLogs, setAllLogs] = useState<LogEntry[]>(logs);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const nextId = useState(11)[0];

  useEffect(() => {
    let id = 11;
    const interval = setInterval(() => {
      const e = newEvents[Math.floor(Math.random() * newEvents.length)];
      const newLog: LogEntry = { ...e, id: id++, time: "just now" };
      setAllLogs(prev => [newLog, ...prev].slice(0, 30));
      setSelected(newLog);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === "all"
    ? allLogs
    : allLogs.filter(l => l.level === filter);

  const counts = {
    critical: allLogs.filter(l => l.level === "critical").length,
    warning: allLogs.filter(l => l.level === "warning").length,
    resolved: allLogs.filter(l => l.level === "resolved").length,
  };

  const cfg = levelConfig[selected.level];
  const Icon = cfg.icon;

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
        <div>
          <h2 className="text-base font-bold text-foreground">Security Logs</h2>
          <p className="text-[11px] text-muted-foreground">
            Real-time incident feed — click any log to inspect
          </p>
        </div>
        {/* Filter tabs */}
        <div className="flex items-center gap-1.5">
          {(["all","critical","warning","resolved"] as const).map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-bold px-3 py-1 rounded-full transition-all border
                ${filter === f
                  ? f === "all" ? "bg-primary/20 text-primary border-primary/40"
                  : f === "critical" ? "bg-red-500/20 text-red-400 border-red-500/40"
                  : f === "warning" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                  : "bg-green-500/20 text-green-400 border-green-500/40"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/30"
                }`}
            >
              {f === "all" ? `All (${allLogs.length})`
                : f === "critical" ? `Critical (${counts.critical})`
                : f === "warning" ? `Warning (${counts.warning})`
                : `Resolved (${counts.resolved})`}
            </button>
          ))}
        </div>
      </div>

      {/* Split panel */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT — Log list */}
        <div className="w-[42%] border-r border-border overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#ff2d78 #111" }}>
          {filtered.map(log => {
            const c = levelConfig[log.level];
            const isActive = selected.id === log.id;
            const isResolved = resolved.has(log.id);
            return (
              <button key={log.id}
                onClick={() => setSelected(log)}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all border-b border-border/50
                  ${isActive
                    ? "bg-card border-l-2 border-l-primary"
                    : "hover:bg-card/60 border-l-2 border-l-transparent"
                  }`}
              >
                <div className="mt-1 shrink-0">
                  <div className="w-2 h-2 rounded-full"
                    style={{ background: isResolved ? "#00ff88" : c.dot,
                      boxShadow: isResolved ? "0 0 6px #00ff8866" : c.glow }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold truncate ${isResolved ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {log.text}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{log.time}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border
                      ${isResolved ? "bg-green-500/15 text-green-400 border-green-500/30" : c.badge}`}>
                      {isResolved ? "resolved" : log.level}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* RIGHT — Detail panel */}
        <div className="flex-1 overflow-y-auto p-5 bg-card/20">

          {/* Level badge + title */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border mb-2 ${cfg.badge}`}>
                <Icon className="w-3 h-3" />
                {selected.level.toUpperCase()}
              </span>
              <h3 className="text-sm font-bold text-foreground leading-tight">
                {selected.text}
              </h3>
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-card rounded-lg p-2.5 border border-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Time</span>
              </div>
              <span className="text-xs text-foreground font-bold">{selected.time}</span>
            </div>
            <div className="bg-card rounded-lg p-2.5 border border-border">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Source IP</span>
              </div>
              <span className="text-xs text-foreground font-mono font-bold">{selected.ip}</span>
            </div>
            {selected.userId && (
              <div className="bg-card rounded-lg p-2.5 border border-border col-span-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">User ID</span>
                </div>
                <span className="text-xs text-foreground font-mono font-bold">{selected.userId}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="mb-3">
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-1.5">
              Incident Details
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed bg-card rounded-lg p-3 border border-border">
              {selected.details}
            </p>
          </div>

          {/* Systems */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Cpu className="w-3 h-3 text-primary" />
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Affected Systems
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selected.systems.split(", ").map(s => (
                <span key={s} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended action */}
          <div className={`rounded-lg p-3 border mb-4 ${cfg.border} bg-card`}>
            <p className="text-[10px] font-bold text-primary mb-1">⚡ Recommended Action</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{selected.action}</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setResolved(prev => new Set(prev).add(selected.id))}
              disabled={resolved.has(selected.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all
                ${resolved.has(selected.id)
                  ? "bg-green-500/10 text-green-400 border border-green-500/30 cursor-default"
                  : "bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30"
                }`}
            >
              {resolved.has(selected.id) ? "✓ Resolved" : "✓ Mark Resolved"}
            </button>
            <button className="flex-1 py-2 rounded-lg text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 transition-all">
              ⚠ Escalate
            </button>
            <button className="px-4 py-2 rounded-lg text-xs font-bold bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 transition-all">
              Export Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsView;
