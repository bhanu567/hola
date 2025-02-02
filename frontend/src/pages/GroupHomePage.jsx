import { useEffect } from "react";
import { useGroupData } from "../store/useGroupStore";
import GroupSideBar from "../components/group/GroupSideBar";
import GroupContainer from "../components/group/GroupContainer";
import { Send } from "lucide-react";

const GroupHomePage = () => {
  const { getAllGroups, selectedGroup } = useGroupData();

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <GroupSideBar />
            {selectedGroup ? (
              <GroupContainer />
            ) : (
              <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
                <div className="max-w-md text-center space-y-6">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                      <div
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
                      >
                        <Send className="w-8 h-8 text-primary " />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold">नमस्ते</h2>
                  <p className="text-base-content/60">
                    Select a Group from the sidebar to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GroupHomePage;
