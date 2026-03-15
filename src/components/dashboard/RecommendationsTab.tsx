import { ShieldCheck, Lock, Eye, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

const RecommendationsTab = () => {
  const [statuses, setStatuses] = useState<Record<number, "idle" | "applying" | "applied">>({});
  const { toast } = useToast();

  const handleApply = (index: number) => {
    setStatuses((prev) => ({ ...prev, [index]: "applying" }));
    setTimeout(() => {
      setStatuses((prev) => ({ ...prev, [index]: "applied" }));
      toast({
        title: "Fix applied successfully",
        description: "SHIELD Framework updated",
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">SHIELD AI Framework</p>
      {recommendations.map((r, i) => {
        const Icon = r.icon;
        const status = statuses[i] || "idle";
        return (
          <Card key={r.title} className="bg-card glow-border glow-border-hover p-4 transition-all duration-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                <Button
                  size="sm"
                  disabled={status !== "idle"}
                  onClick={() => handleApply(i)}
                  className={`mt-3 h-7 text-xs ${
                    status === "applied"
                      ? "bg-green-600 hover:bg-green-600 text-foreground"
                      : "bg-primary hover:bg-secondary text-primary-foreground"
                  }`}
                >
                  {status === "applying" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                  {status === "idle" && "Apply Fix"}
                  {status === "applying" && "Applying..."}
                  {status === "applied" && "✓ Applied"}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default RecommendationsTab;
