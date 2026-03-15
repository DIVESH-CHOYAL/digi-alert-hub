import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, AlertTriangle, 
         ShieldCheck, AlertCircle } from "lucide-react";

type Event = {
  id: number;
  text: string;
  level: "critical" | "warning" | "resolved";
  time: string;
  details: string;
  systems: string;
  action: string;
};

const initialEvents: Event[] = [
  {
    id: 1, level: "critical",
    text: "Suspicious login detected — Mumbai, India",
    time: "2 min ago",
    details: "User ID 449821 logged in from an unrecognized device in Mumbai. Previous login was from Chennai 2 hours ago. Velocity check triggered — impossible travel detected.",
    systems: "Auth Server, User Database, Session Manager",
    action: "Force logout all sessions and send 2FA verification email immediately.",
  },
  {
    id: 2, level: "critical",
    text: "Mass data export attempt blocked — 500K records",
    time: "5 min ago",
    details: "An automated script attempted to export 500,000 user profile records via the admin API. Request was rate-limited after 12,000 records. IP flagged as malicious.",
    systems: "API Gateway, Admin Panel, Rate Limiter",
    action: "Revoke API key, block IP range 185.220.x.x and audit all admin API access logs.",
  },
  {
    id: 3, level: "warning",
    text: "API rate limit exceeded — 4.2M calls in 10 min",
    time: "8 min ago",
    details: "A single API key made 4.2 million calls in 10 minutes, exceeding the 10,000/hour limit by 420x. Behavioral pattern matches known scraping bot signatures.",
    systems: "Public API, CDN, Load Balancer",
    action: "Revoke the API key and implement stricter per-key rate limiting with CAPTCHA challenge.",
  },
  {
    id: 4, level: "warning",
    text: "New device login — Lagos, Nigeria",
    time: "12 min ago",
    details: "User account accessed from a new geographic location for the first time. Account has no prior activity from West Africa. Risk score elevated to 78/100.",
    systems: "Authentication Service, Geo-IP Module",
    action: "Send 2FA challenge to registered email and notify user of suspicious activity.",
  },
  {
    id: 5, level: "critical",
    text: "Bot network detected — 1,240 fake accounts",
    time: "15 min ago",
    details: "ML model identified 1,240 accounts as coordinated bots based on posting patterns, login timing, and content similarity scores above 94%. Network spreading misinformation.",
    systems: "ML Detection Engine, Content Moderation, User Service",
    action: "Suspend all flagged accounts pending manual review. Retrain detection model with new patterns.",
  },
  {
    id: 6, level: "resolved",
    text: "AES-256 encryption key rotation completed",
    time: "22 min ago",
    details: "Scheduled quarterly encryption key rotation completed successfully across all Big Data pipelines. New keys distributed to all microservices. Zero downtime achieved.",
    systems: "Key Management Service, Data Pipelines, Microservices",
    action: "No action needed — archive rotation certificate and schedule next rotation in 90 days.",
  },
  {
    id: 7, level: "warning",
    text: "Unusual data access pattern — User ID 449821",
    time: "31 min ago",
    details: "User accessed 3,400 profiles in 5 minutes — 50x above normal browsing behavior. Access pattern consistent with data harvesting. No export attempted yet.",
    systems: "Analytics Engine, User Database, Access Logger",
    action: "Throttle user access to 10 profile views/minute and flag account for security review.",
  },
  {
    id: 8, level: "critical",
    text: "DDoS attack mitigated — 2.1 Gbps volumetric",
    time: "45 min ago",
    details: "Volumetric DDoS attack from 8,000 distributed IPs targeting the login endpoint. Peak traffic: 2.1 Gbps. Cloudflare mitigation activated automatically within 34 seconds.",
    systems: "CDN, Load Balancer, Firewall, Login Service",
    action: "Review firewall rules and update IP blocklist. Monitor for follow-up layer 7 attack.",
  },
  {
    id: 9, level: "resolved",
    text: "GDPR compliance audit passed — Q1 2026",
    time: "1 hr ago",
    details: "Quarterly GDPR compliance audit completed by external auditor. All 47 data handling procedures met regulatory requirements. Two minor recommendations noted for next quarter.",
    systems: "Data Governance Module, Privacy Engine",
    action: "Archive audit report and implement 2 minor recommendations by next quarter.",
  },
  {
    id: 10, level: "resolved",
    text: "Zero-day patch deployed — CVE-2026-1042",
    time: "2 hr ago",
    details: "Critical patch for CVE-2026-1042 deployed across all 34 backend servers. Vulnerability allowed privilege escalation via malformed JWT token. No exploitation detected before patch.",
    systems: "All Backend Services, JWT Auth Module",
    action: "Monitor for exploitation attempts over next 48 hours. Confirm patch on all nodes.",
  },
];

const newEventTexts = [
  { text: "Phishing campaign targeting DIGI ALERT users — EMEA", level: "critical" as const,
    details: "Fake DIGI ALERT login pages deployed across 12 domains targeting European users via SMS phishing.", systems: "Email Gateway, DNS, User Auth", action: "Issue platform alert and initiate domain takedown requests." },
  { text: "Malware signature database updated — v4.2.1", level: "resolved" as const,
    details: "SHIELD AI threat database updated with 847 new malware signatures from latest threat intelligence feed.", systems: "Threat Intelligence Module", action: "No action needed — automatic update successful." },
  { text: "Geo-blocked access attempt — North Korea", level: "warning" as const,
    details: "403 access attempts from North Korean IP ranges blocked by geo-restriction policy in last 10 minutes.", systems: "Geo-IP Firewall, Access Control", action: "Review geo-block policy and update regional rules." },
  { text: "Privilege escalation attempt — Admin panel", level: "critical" as const,
    details: "Attacker attempted to escalate from user to admin role using known JWT manipulation technique CVE-2025-8821.", systems: "Admin Panel, JWT Service, RBAC Module", action: "Patch JWT validation immediately and audit all admin sessions." },
  { text: "DNS tunneling detected — outbound traffic", level: "warning" as const,
    details: "Unusual DNS query patterns detected from internal server. Possible data exfiltration via DNS tunneling protocol.", systems: "DNS Resolver, Network Monitor", action: "Block suspicious DNS queries and isolate affected server." },
];

const levelConfig = {
  critical: {
    dot: "bg-red-500",
    glow: "shadow-red-500/30",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    badge: "bg-red-500/20 text-red-400",
    border: "border-red-500/30",
  },
  warning: {
    dot: "bg-yellow-500",
    glow: "shadow-yellow-500/30",
    icon: AlertCircle,
    iconColor: "text-yellow-400",
    badge: "bg-yellow-500/20 text-yellow-400",
    border: "border-yellow-500/30",
  },
  resolved: {
    dot: "bg-green-500",
    glow: "shadow-green-500/30",
    icon: ShieldCheck,
    iconColor: "text-green-400",
    badge: "bg-green-500/20 text-green-400",
    border: "border-green-500/30",
  },
};

const ActivityTab = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(11);

  // Auto-generate new events
  useEffect(() => {
    const interval = setInterval(() => {
      const template = newEventTexts[Math.floor(Math.random() * newEventTexts.length)];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} UTC`;
      setEvents((prev) => [{
        id: nextId.current++,
        text: template.text,
        level: template.level,
        time: "just now",
        details: template.details,
        systems: template.systems,
        action: template.action,
      }, ...prev].slice(0, 30));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to top on new event
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [events.length]);

  return (
    <div
      ref={scrollRef}
      className="space-y-1.5 max-h-[calc(100vh-200px)] overflow-y-auto pr-1"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#ff2d78 #111" }}
    >
      {events.map((e) => {
        const cfg = levelConfig[e.level];
        const Icon = cfg.icon;
        const isExpanded = expanded === e.id;
        const isResolved = resolved.has(e.id);

        return (
          <div key={e.id} className="animate-fade-in">
            {/* Main row */}
            <button
              onClick={() => setExpanded(isExpanded ? null : e.id)}
              className={`w-full flex items-start gap-2.5 p-2.5 rounded-t-md text-xs text-left transition-all
                ${isExpanded
                  ? `bg-card border border-b-0 ${cfg.border}`
                  : "bg-card/60 border border-transparent hover:border-border hover:bg-card"
                }`}
            >
              {/* Colored dot */}
              <div className="mt-0.5 shrink-0 flex flex-col items-center gap-0.5">
                <span className={`w-2 h-2 rounded-full ${isResolved ? "bg-green-500" : cfg.dot} shadow-sm ${cfg.glow}`} />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${isResolved ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {e.text}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-muted-foreground text-[10px]">{e.time}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${isResolved ? "bg-green-500/20 text-green-400" : cfg.badge}`}>
                    {isResolved ? "resolved" : e.level}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              {isExpanded
                ? <ChevronDown className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
              }
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className={`border border-t-0 ${cfg.border} rounded-b-md bg-card/40 p-3 space-y-2.5`}>

                {/* Details */}
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {e.details}
                </p>

                {/* Systems */}
                <div className="flex gap-1.5 items-start">
                  <Icon className={`w-3 h-3 mt-0.5 shrink-0 ${cfg.iconColor}`} />
                  <div>
                    <span className="text-[10px] font-semibold text-foreground">Affected Systems: </span>
                    <span className="text-[10px] text-muted-foreground">{e.systems}</span>
                  </div>
                </div>

                {/* Recommended action */}
                <div className={`rounded p-2 border ${cfg.border} bg-card/60`}>
                  <p className="text-[10px] font-semibold text-primary mb-0.5">
                    ⚡ Recommended Action
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {e.action}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-0.5">
                  <Button
                    size="sm"
                    className="h-6 text-[10px] bg-green-600 hover:bg-green-700 text-white flex-1"
                    disabled={isResolved}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setResolved((prev) => new Set(prev).add(e.id));
                      setExpanded(null);
                    }}
                  >
                    {isResolved ? "✓ Resolved" : "Mark as Resolved"}
                  </Button>
                  <Button
                    size="sm"
                    className="h-6 text-[10px] bg-destructive hover:bg-destructive/80 text-white flex-1"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    ⚠ Escalate
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTab;