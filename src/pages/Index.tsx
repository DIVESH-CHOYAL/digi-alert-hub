import { useState } from "react";
import DashboardSidebar, { type ViewType } from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ThreatMap from "@/components/dashboard/ThreatMap";
import SummaryTab from "@/components/dashboard/SummaryTab";
import ActivityTab from "@/components/dashboard/ActivityTab";
import RecommendationsTab from "@/components/dashboard/RecommendationsTab";
import ThreatsView from "@/components/dashboard/ThreatsView";
import UsersView from "@/components/dashboard/UsersView";
import LogsView from "@/components/dashboard/LogsView";
import SettingsView from "@/components/dashboard/SettingsView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 flex overflow-hidden">
          {activeView === "dashboard" && (
            <>
              <div className="w-[65%] min-w-0 overflow-hidden relative">
                <ThreatMap />
              </div>
              <div className="w-[35%] border-l border-border overflow-y-auto p-4">
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="w-full bg-muted mb-4">
                    <TabsTrigger value="summary" className="flex-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Summary
                    </TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Activity
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex-1 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      Recommendations
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary"><SummaryTab /></TabsContent>
                  <TabsContent value="activity"><ActivityTab /></TabsContent>
                  <TabsContent value="recommendations"><RecommendationsTab /></TabsContent>
                </Tabs>
              </div>
            </>
          )}
          {activeView === "threats" && <ThreatsView />}
          {activeView === "users" && <UsersView />}
          {activeView === "logs" && <LogsView />}
          {activeView === "settings" && <SettingsView />}
        </div>
      </div>
    </div>
  );
};

export default Index;
