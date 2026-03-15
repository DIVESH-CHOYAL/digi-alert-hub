import { Card } from "@/components/ui/card";

const threats = [
  { name: "Unauthorized Access", type: "Credential Stuffing", severity: "Critical", origin: "Russia", status: "Active" },
  { name: "Data Scraping", type: "Scraping", severity: "Critical", origin: "China", status: "Active" },
  { name: "API Breach", type: "API Abuse", severity: "High", origin: "Nigeria", status: "Investigating" },
  { name: "Insider Threat", type: "Insider Threat", severity: "High", origin: "United States", status: "Monitoring" },
  { name: "Bot Network", type: "Bot Network", severity: "Medium", origin: "Brazil", status: "Mitigated" },
  { name: "Phishing Campaign", type: "Phishing", severity: "Critical", origin: "Iran", status: "Active" },
  { name: "DDoS Attack", type: "DDoS", severity: "High", origin: "North Korea", status: "Blocked" },
  { name: "DNS Tunneling", type: "Data Breach", severity: "Medium", origin: "India", status: "Investigating" },
  { name: "Session Hijacking", type: "Credential Stuffing", severity: "High", origin: "Romania", status: "Active" },
  { name: "Zero-Day Exploit", type: "API Abuse", severity: "Critical", origin: "China", status: "Investigating" },
];

const sevColor: Record<string, string> = {
  Critical: "text-destructive",
  High: "text-yellow-500",
  Medium: "text-muted-foreground",
};

const statusColor: Record<string, string> = {
  Active: "text-destructive",
  Investigating: "text-yellow-500",
  Monitoring: "text-blue-400",
  Mitigated: "text-green-500",
  Blocked: "text-green-500",
};

const ThreatsView = () => (
  <div className="p-6 overflow-y-auto h-full">
    <h2 className="text-lg font-bold text-foreground mb-4">All Threats</h2>
    <Card className="bg-card glow-border p-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left pb-2 font-medium">Name</th>
            <th className="text-left pb-2 font-medium">Type</th>
            <th className="text-left pb-2 font-medium">Severity</th>
            <th className="text-left pb-2 font-medium">Origin Country</th>
            <th className="text-left pb-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((t) => (
            <tr key={t.name} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
              <td className="py-2.5 text-foreground font-medium">{t.name}</td>
              <td className="py-2.5 text-muted-foreground">{t.type}</td>
              <td className={`py-2.5 font-semibold ${sevColor[t.severity]}`}>{t.severity}</td>
              <td className="py-2.5 text-muted-foreground">{t.origin}</td>
              <td className={`py-2.5 font-semibold ${statusColor[t.status]}`}>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

export default ThreatsView;
