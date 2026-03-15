import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ThreatMap from "@/components/dashboard/ThreatMap";
import SummaryTab from "@/components/dashboard/SummaryTab";
import ActivityTab from "@/components/dashboard/ActivityTab";
import RecommendationsTab from "@/components/dashboard/RecommendationsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <div className="flex-1 flex overflow-hidden">
          {/* Map area */}
          <div className="w-[65%] min-w-0 overflow-hidden relative">
            <ThreatMap />
          </div>

          {/* Right panel */}
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
        </div>
      </div>
    </div>
  );
};

export default Index;
