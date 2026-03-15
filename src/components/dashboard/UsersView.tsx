import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const users = [
  { username: "d4rk_ph0enix", location: "Mumbai, IN", risk: 94 },
  { username: "ghost_admin", location: "Moscow, RU", risk: 88 },
  { username: "scraper_bot_x", location: "Lagos, NG", risk: 82 },
  { username: "shadow_user_91", location: "São Paulo, BR", risk: 76 },
  { username: "anon_proxy_7", location: "Tehran, IR", risk: 71 },
  { username: "null_byte", location: "Beijing, CN", risk: 69 },
];

const UsersView = () => {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const handleFlag = (username: string) => {
    setFlagged((prev) => new Set(prev).add(username));
  };

  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-lg font-bold text-foreground mb-4">Suspicious Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <Card key={u.username} className="bg-card glow-border glow-border-hover p-4 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{u.username}</p>
                <p className="text-xs text-muted-foreground">{u.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Risk Score</p>
                <p className="text-xl font-bold text-primary">{u.risk}</p>
              </div>
              <Button
                size="sm"
                disabled={flagged.has(u.username)}
                onClick={() => handleFlag(u.username)}
                className={`h-8 text-xs ${flagged.has(u.username) ? "bg-destructive/20 text-destructive" : "bg-primary hover:bg-secondary text-primary-foreground"}`}
              >
                {flagged.has(u.username) ? "⚑ Flagged" : "Flag User"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersView;
