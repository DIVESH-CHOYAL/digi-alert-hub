import { ShieldCheck, Lock, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const recommendations = [
  {
    icon: ShieldCheck,
    title: "Enable Zero-Trust Access",
    desc: "Enforce identity verification for every user and device attempting to access resources.",
  },
  {
    icon: Lock,
    title: "Rotate API Keys",
    desc: "48 API keys are older than 90 days. Rotate immediately to reduce attack surface.",
  },
  {
    icon: Eye,
    title: "Deploy Behavioral Analytics",
    desc: "Detect anomalous user behavior patterns using SHIELD AI machine learning models.",
  },
];

const RecommendationsTab = () => (
  <div className="space-y-3">
    <p className="text-xs text-muted-foreground uppercase tracking-wider">SHIELD AI Framework</p>
    {recommendations.map((r) => {
      const Icon = r.icon;
      return (
        <Card key={r.title} className="bg-card glow-border glow-border-hover p-4 transition-all duration-300">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{r.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
              <Button size="sm" className="mt-3 h-7 text-xs bg-primary hover:bg-secondary text-primary-foreground">
                Apply Fix
              </Button>
            </div>
          </div>
        </Card>
      );
    })}
  </div>
);

export default RecommendationsTab;
