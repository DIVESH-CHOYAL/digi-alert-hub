import { LayoutDashboard, Shield, Users, FileText, Settings } from "lucide-react";

export type ViewType = "dashboard" | "threats" | "users" | "logs" | "settings";

const navItems: { icon: typeof LayoutDashboard; label: string; view: ViewType }[] = [
  { icon: LayoutDashboard, label: "Dashboard", view: "dashboard" },
  { icon: Shield, label: "Threats", view: "threats" },
  { icon: Users, label: "Users", view: "users" },
  { icon: FileText, label: "Logs", view: "logs" },
  { icon: Settings, label: "Settings", view: "settings" },
];

const DashboardSidebar = ({ activeView, onViewChange }: { activeView: ViewType; onViewChange: (v: ViewType) => void }) => {
  return (
    <div className="w-16 min-h-screen bg-card border-r border-border flex flex-col items-center py-6 gap-2">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-6">
        <Shield className="w-4 h-4 text-primary-foreground" />
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.view === activeView;
        return (
          <button
            key={item.label}
            onClick={() => onViewChange(item.view)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
            title={item.label}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
