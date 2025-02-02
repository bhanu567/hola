import { X, Share2 } from "lucide-react";
import { useGroupData } from "../../store/useGroupStore";

const GroupChatHeader = () => {
  const { selectedGroup, setSelectedGroup } = useGroupData();
  let pressTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function copyToClipboard() {
    navigator.clipboard
      .writeText(`${location.origin}/${selectedGroup._id}`)
      .then(() => {
        showToast("Link copied!");
      })
      .catch((err) => {
        showToast("Failed to copy!");
      });
  }

  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src="/avatar.png" alt="groupIcon" />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedGroup.name}</h3>
            <p className="text-sm text-base-content/70 truncate">
              {selectedGroup.members.map((member) => `${member.fullName}, `)}
            </p>
          </div>
        </div>
        <div>
        <button
          className={`btn btn-sm mr-4`}
          onClick={() => copyToClipboard()}
          onMouseUp={() => clearTimeout(pressTimer)}
          onMouseLeave={() => clearTimeout(pressTimer)}
          onMouseDown={() => {
            pressTimer = setTimeout(() => {
              copyToClipboard();
            }, 500);
          }}
        >
          <Share2 className="size-5" />
          <span className="hidden sm:inline">Group Link</span>
        </button>
        <div id="toast">Link copied!</div>
        {/* Close button */}
        <button onClick={() => setSelectedGroup(null)}>
          <X />
        </button>
        </div>
      </div>
    </div>
  );
};
export default GroupChatHeader;
