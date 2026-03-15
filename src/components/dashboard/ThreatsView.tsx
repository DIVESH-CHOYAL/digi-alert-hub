import { useState } from "react";
import { AlertTriangle, AlertCircle, ShieldCheck, 
         ChevronDown, ChevronRight } from "lucide-react";

const threats = [
  { name: "Unauthorized Access", type: "Credential Stuffing", severity: "Critical",
    origin: "Russia", flag: "🇷🇺", status: "Active", impact: "1.2M records",
    details: "Bot network attempting 40,000 logins/sec using leaked credential database. 1.2M user accounts at risk of full takeover.",
    action: "Force 2FA on all affected accounts and block origin IP range 185.220.x.x immediately." },
  { name: "Data Scraping", type: "Automated Scraping", severity: "Critical",
    origin: "China", flag: "🇨🇳", status: "Active", impact: "500K profiles",
    details: "Distributed scraper harvesting 500K public user profiles via undocumented API endpoints. Data being sold on dark web forums.",
    action: "Rate limit all unauthenticated API calls to 100/hour and implement bot detection on profile endpoints." },
  { name: "API Breach", type: "API Abuse", severity: "High",
    origin: "Nigeria", flag: "🇳🇬", status: "Investigating", impact: "4.2M calls",
    details: "Single API key made 4.2M calls in 10 minutes — 420x above rate limit. Pattern matches known industrial scraping toolkit.",
    action: "Revoke compromised API key and require re-authentication for all developer accounts." },
  { name: "Insider Threat", type: "Privilege Abuse", severity: "High",
    origin: "United States", flag: "🇺🇸", status: "Monitoring", impact: "Admin access",
    details: "Privileged employee downloading bulk user exports at 2AM outside normal work hours. 3,400 records accessed in 5 minutes.",
    action: "Suspend user access pending investigation and forensic audit of data export logs." },
  { name: "Bot Network", type: "Fake Accounts", severity: "Medium",
    origin: "Brazil", flag: "🇧🇷", status: "Mitigated", impact: "1,240 accounts",
    details: "1,240 coordinated bot accounts detected spreading misinformation. Identified via ML behavioral analysis with 94% confidence.",
    action: "Accounts suspended. Retrain detection model with new behavioral signatures." },
  { name: "Phishing Campaign", type: "Phishing", severity: "Critical",
    origin: "Iran", flag: "🇮🇷", status: "Active", impact: "8,000 users",
    details: "Fake DIGI ALERT login pages deployed across 12 lookalike domains targeting users via SMS campaigns in Europe and Asia.",
    action: "Issue platform-wide phishing alert and submit domain takedown requests to registrars immediately." },
  { name: "DDoS Attack", type: "Volumetric Attack", severity: "High",
    origin: "North Korea", flag: "🇰🇵", status: "Blocked", impact: "2.1 Gbps",
    details: "2.1 Gbps volumetric DDoS attack from 8,000 distributed IPs targeting login endpoint. Cloudflare mitigation activated in 34s.",
    action: "Firewall rules updated. Monitor for follow-up Layer 7 attack targeting application logic." },
  { name: "DNS Tunneling", type: "Data Exfiltration", severity: "Medium",
    origin: "India", flag: "🇮🇳", status: "Investigating", impact: "Outbound traffic",
    details: "Unusual DNS query patterns from internal server suggest data exfiltration via DNS tunneling protocol. 2.3GB of anomalous traffic.",
    action: "Block suspicious DNS queries and isolate affected internal server for forensic analysis." },
  { name: "Session Hijacking", type: "Credential Theft", severity: "High",
    origin: "Romania", flag: "🇷🇴", status: "Active", impact: "340 sessions",
    details: "Attacker stealing active session tokens via XSS vulnerability on legacy profile page. 340 active sessions compromised.",
    action: "Invalidate all active sessions for affected users and patch the XSS vulnerability on profile page immediately." },
  { name: "Zero-Day Exploit", type: "CVE-2026-1042", severity: "Critical",
    origin: "China", flag: "🇨🇳", status: "Investigating", impact: "Privilege escalation",
    details: "Newly discovered vulnerability in JWT token validation allows privilege escalation from user to admin role. No patch available yet.",
    action: "Deploy WAF rule to block malformed JWT tokens and notify security team for emergency patch development." },
];

const sevConfig: Record<string, { label: string; dot: string; badge: string; icon: any }> = {
  Critical: { label: "Critical", dot: "#ff4444", badge: "bg-red-500/15 text-red-400 border border-red-500/30", icon: AlertTriangle },
  High:     { label: "High",     dot: "#ff8c00", badge: "bg-orange-500/15 text-orange-400 border border-orange-500/30", icon: AlertCircle },
  Medium:   { label: "Medium",   dot: "#ffd700", badge: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30", icon: AlertCircle },
};

const statusConfig: Record<string, string> = {
  Active:        "bg-red-500/15 text-red-400 border border-red-500/30",
  Investigating: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  Monitoring:    "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  Mitigated:     "bg-green-500/15 text-green-400 border border-green-500/30",
  Blocked:       "bg-green-500/15 text-green-400 border border-green-500/30",
};

const ThreatsView = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">All Threats</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live threat intelligence — click any row for details
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs text-destructive font-bold tracking-widest">
            {threats.filter(t => t.status === "Active").length} ACTIVE
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid gap-2 px-3 mb-2"
        style={{ gridTemplateColumns: "28px 1fr 90px 110px 90px 100px 28px" }}>
        {["#","Threat","Severity","Origin","Impact","Status",""].map((h, i) => (
          <span key={i} className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            {h}
          </span>
        ))}
      </div>

      {/* Threat rows */}
      <div className="space-y-1.5">
        {threats.map((t, i) => {
          const cfg = sevConfig[t.severity];
          const Icon = cfg.icon;
          const isOpen = expanded === i;

          return (
            <div key={t.name}
              className="rounded-lg border border-border overflow-hidden transition-all">
              {/* Main row */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`w-full grid gap-2 items-center px-3 py-2.5 text-left transition-all
                  ${isOpen ? "bg-card border-b border-border" : "bg-card/60 hover:bg-card"}`}
                style={{ gridTemplateColumns: "28px 1fr 90px 110px 90px 100px 28px" }}
              >
                {/* Number */}
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: `${cfg.dot}20`, color: cfg.dot, border: `1px solid ${cfg.dot}40` }}>
                  {i + 1}
                </div>

                {/* Name */}
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground">{t.type}</div>
                </div>

                {/* Severity */}
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full inline-flex items-center gap-1 ${cfg.badge}`}>
                  <Icon className="w-2.5 h-2.5" />
                  {t.severity}
                </span>

                {/* Origin */}
                <span className="text-xs text-muted-foreground">
                  {t.flag} {t.origin}
                </span>

                {/* Impact */}
                <span className="text-xs font-semibold" style={{ color: cfg.dot }}>
                  {t.impact}
                </span>

                {/* Status */}
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full text-center ${statusConfig[t.status]}`}>
                  {t.status}
                </span>

                {/* Chevron */}
                {isOpen
                  ? <ChevronDown className="w-3.5 h-3.5 text-primary" />
                  : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
              </button>

              {/* Expanded details */}
              {isOpen && (
                <div className="bg-card/40 px-4 py-3 space-y-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t.details}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded p-2">
                    <p className="text-[10px] font-bold text-primary mb-0.5">
                      ⚡ Recommended Action
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {t.action}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-primary text-white hover:bg-primary/80 transition-colors">
                      Acknowledge
                    </button>
                    <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-destructive/20 text-red-400 border border-destructive/30 hover:bg-destructive/30 transition-colors">
                      ⚠ Escalate
                    </button>
                    <button className="text-[10px] font-bold px-3 py-1.5 rounded bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-colors">
                      ✓ Mark Resolved
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThreatsView;