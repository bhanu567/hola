import React from "react";
import { useGroupData } from "../../store/useGroupStore";

const DisplayGroupName = () => {
  const { selectedGroup, setSelectedGroup, allGroupData } = useGroupData();
  

  return (
    <div className="overflow-y-auto w-full py-3">
      {allGroupData?.map((group) => (
        <button
          key={group._id}
          onClick={() => setSelectedGroup(group)}
          className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedGroup?._id === group._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
        >
          <div className="relative mx-auto lg:mx-0">
            <img
              src="/avatar.png"
              alt={group.name}
              className="size-10 object-cover rounded-full"
            />
          </div>

          {/* User info - only visible on larger screens */}
          <div className="hidden lg:block text-left min-w-0">
            <div className="font-medium truncate">{group.name}</div>
            <div className="text-sm text-zinc-400 truncate">
              {group.members.map((member) => `${member.fullName}, `)}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DisplayGroupName;
