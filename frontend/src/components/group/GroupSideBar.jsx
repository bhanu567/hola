import { useState } from "react";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";
import { Plus } from "lucide-react";
import { useGroupData } from "../../store/useGroupStore";
import DisplayGroupName from "./DisplayGroupName";

const GroupSideBar = () => {
  const [toggleButton, setToggleButton] = useState(false);
  const { isGroupDataLoading, createGroup } = useGroupData();
  const [groupName, setGroupName] = useState("");

  if (isGroupDataLoading) return <SidebarSkeleton />;
  function createNewGroup() {
    createGroup(groupName);
    setGroupName("");
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b w-full pb-0">
        <button
          style={{ display: "ruby" }}
          className={`w-1/2 py-5 ${!toggleButton ? "border-b-2" : ""}`}
          onClick={() => setToggleButton(false)}
        >
          <svg
            className="w-5 h-5 mb-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 19"
          >
            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
          </svg>
        </button>
        <button
          style={{ display: "ruby" }}
          className={`w-1/2 py-5 ${toggleButton ? "border-b-2" : ""}`}
          onClick={() => setToggleButton(true)}
        >
          <Plus className="size-6"></Plus>
        </button>
      </div>
      {toggleButton ? (
        <div className="overflow-y-auto w-full py-3 flex flex-col justify-center">
          <input
            type="text"
            placeholder="Enter Group Name..."
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="px-2 py-1.5 border-2 rounded-md mx-6 mt-10"
          />
          <button
            className="btn btn-sm px-6 py-2 my-4 mx-auto"
            onClick={createNewGroup}
          >
            Create New Group
          </button>
        </div>
      ) : (
        <DisplayGroupName />
      )}
    </aside>
  );
};
export default GroupSideBar;
