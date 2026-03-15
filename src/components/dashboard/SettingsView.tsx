import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

const SettingsView = () => {
  const [zeroTrust, setZeroTrust] = useState(true);
  const [aiMonitoring, setAiMonitoring] = useState(true);
  const [autoBlock, setAutoBlock] = useState(false);

  return (
    <div className="p-6 overflow-y-auto h-full max-w-xl">
      <h2 className="text-lg font-bold text-foreground mb-4">Settings</h2>
      <Card className="bg-card glow-border p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Zero Trust</p>
            <p className="text-xs text-muted-foreground">Enforce identity verification for all access</p>
          </div>
          <Switch checked={zeroTrust} onCheckedChange={setZeroTrust} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">AI Monitoring</p>
            <p className="text-xs text-muted-foreground">SHIELD AI behavioral analysis engine</p>
          </div>
          <Switch checked={aiMonitoring} onCheckedChange={setAiMonitoring} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Auto-Block</p>
            <p className="text-xs text-muted-foreground">Automatically block detected threats</p>
          </div>
          <Switch checked={autoBlock} onCheckedChange={setAutoBlock} />
        </div>
      </Card>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <Shield className="w-3.5 h-3.5 text-green-500" />
        <span>SHIELD Framework Version: 2.4.1</span>
      </div>
    </div>
  );
};

export default SettingsView;
