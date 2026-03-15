import { LayoutDashboard, Shield, Users, FileText, Settings } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Shield, label: "Threats" },
  { icon: Users, label: "Users" },
  { icon: FileText, label: "Logs" },
  { icon: Settings, label: "Settings" },
];

const DashboardSidebar = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-16 min-h-screen bg-card border-r border-border flex flex-col items-center py-6 gap-2">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mb-6">
        <Shield className="w-4 h-4 text-primary-foreground" />
      </div>
      {navItems.map((item, i) => {
        const Icon = item.icon;
        const isActive = i === active;
        return (
          <button
            key={item.label}
            onClick={() => setActive(i)}
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
