import { useState } from "react";
import { User, Flag, ShieldAlert, Eye } from "lucide-react";

const users = [
  { name: "d4rk_ph0enix", loc: "Mumbai, IN", flag: "🇮🇳", score: 94,
    type: "Bot Account", joined: "Jan 2026", posts: 12400,
    details: "Account exhibits non-human posting patterns — 340 posts/hour at 3AM. Profile picture is AI-generated. Associated with 3 banned accounts.",
    activity: "Mass following 2,000 accounts/day, bulk liking posts with political content." },
  { name: "ghost_admin", loc: "Moscow, RU", flag: "🇷🇺", score: 88,
    type: "Credential Theft", joined: "Dec 2025", posts: 4,
    details: "Account logged in from 14 different countries in 48 hours. Password reset 6 times this month. Likely credential-stuffing victim turned attacker.",
    activity: "Accessing admin-level API endpoints not visible in the normal UI." },
  { name: "scraper_bot_x", loc: "Lagos, NG", flag: "🇳🇬", score: 82,
    type: "Data Scraper", joined: "Feb 2026", posts: 0,
    details: "Account has never posted but has visited 89,000 user profiles in 2 weeks. Browser fingerprint matches known scraping toolkit.",
    activity: "Systematically scraping email addresses and phone numbers from public profiles." },
  { name: "shadow_user_91", loc: "São Paulo, BR", flag: "🇧🇷", score: 76,
    type: "Phishing", joined: "Mar 2026", posts: 156,
    details: "Account sending direct messages containing fake DIGI ALERT login links to users with large followings. 2,300 phishing messages sent.",
    activity: "Targeting verified accounts and public figures with personalized phishing messages." },
  { name: "anon_proxy_7", loc: "Tehran, IR", flag: "🇮🇷", score: 71,
    type: "VPN Abuse", joined: "Jan 2026", posts: 890,
    details: "All logins routed through residential proxies across 8 countries. Geo-location inconsistencies flagged by SHIELD AI anomaly engine.",
    activity: "Evading geo-restrictions to access content blocked in region." },
  { name: "null_byte", loc: "Beijing, CN", flag: "🇨🇳", score: 69,
    type: "API Abuse", joined: "Feb 2026", posts: 23,
    details: "API key associated with this account made 2.1M automated requests in 72 hours. Requests target user relationship graph endpoints.",
    activity: "Mapping social connections of high-profile users for intelligence gathering." },
];

const scoreConfig = (score: number) => {
  if (score >= 85) return { color: "#ff4444", label: "Critical Risk", bg: "bg-red-500/10 border-red-500/30" };
  if (score >= 75) return { color: "#ff8c00", label: "High Risk", bg: "bg-orange-500/10 border-orange-500/30" };
  return { color: "#ffd700", label: "Medium Risk", bg: "bg-yellow-500/10 border-yellow-500/30" };
};

const UsersView = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());

  return (
    <div className="p-6 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">Suspicious Users</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            AI-detected risk profiles — click any card to investigate
          </p>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full">
          <ShieldAlert className="w-3 h-3 text-yellow-400" />
          <span className="text-xs text-yellow-400 font-bold">6 FLAGGED</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3">
        {users.map((u, i) => {
          const cfg = scoreConfig(u.score);
          const isOpen = expanded === i;
          const isFlagged = flagged.has(i);

          return (
            <div key={u.name}
              className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer
                ${isOpen
                  ? `border-primary/50 bg-card`
                  : `border-border bg-card/60 hover:border-primary/30 hover:bg-card`
                }`}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              {/* Card top */}
              <div className="p-3">
                {/* Risk type badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${cfg.bg}`}
                    style={{ color: cfg.color }}>
                    {u.type}
                  </span>
                  {isFlagged && (
                    <span className="text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded-full">
                      FLAGGED
                    </span>
                  )}
                </div>

                {/* Avatar + name */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${cfg.color}20`, border: `1.5px solid ${cfg.color}50` }}>
                    <User className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{u.name}</div>
                    <div className="text-[10px] text-muted-foreground">{u.flag} {u.loc}</div>
                  </div>
                </div>

                {/* Risk score bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-muted-foreground">Risk Score</span>
                    <span className="text-[10px] font-bold" style={{ color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full">
                    <div className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${u.score}%`, background: cfg.color }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xl font-black" style={{ color: cfg.color }}>
                      {u.score}
                    </span>
                    <span className="text-[10px] text-muted-foreground self-end mb-0.5">/ 100</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  <div className="bg-muted/30 rounded p-1.5 text-center">
                    <div className="text-[10px] text-muted-foreground">Posts</div>
                    <div className="text-xs font-bold text-foreground">{u.posts.toLocaleString()}</div>
                  </div>
                  <div className="bg-muted/30 rounded p-1.5 text-center">
                    <div className="text-[10px] text-muted-foreground">Joined</div>
                    <div className="text-xs font-bold text-foreground">{u.joined}</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlagged(prev => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      });
                    }}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-[10px] font-bold transition-all
                      ${isFlagged
                        ? "bg-red-500/20 text-red-400 border border-red-500/40"
                        : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
                      }`}
                  >
                    <Flag className="w-2.5 h-2.5" />
                    {isFlagged ? "Flagged" : "Flag User"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(isOpen ? null : i); }}
                    className="px-2 py-1.5 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Eye className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isOpen && (
                <div className="border-t border-border px-3 pb-3 pt-2.5 bg-card/40 space-y-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {u.details}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded p-2">
                    <p className="text-[9px] font-bold text-primary mb-0.5">
                      ⚡ Suspicious Activity
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      {u.activity}
                    </p>
                  </div>
                  <button
                    className="w-full text-[10px] font-bold py-1.5 rounded bg-destructive/20 text-red-400 border border-destructive/30 hover:bg-destructive/30 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🚫 Suspend Account
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersView;
