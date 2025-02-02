import React, { useRef, useEffect } from "react";
import { useGroupData } from "../../store/useGroupStore";
import GroupChatHeader from "./GroupChatHeader";
import { useAuthStore } from "../../store/useAuthStore";
import GroupMessageInput from "./GroupMessageInput";
import { formatMessageTime } from "../../lib/utils";

const GroupContainer = () => {
  const { selectedGroup } = useGroupData();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && selectedGroup) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedGroup]);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <GroupChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedGroup.groupMessages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId._id === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={message.senderId.profilePic || "/avatar.png"}
                  alt={message.senderId.fullName}
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.updatedAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col" ref={messageEndRef}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <GroupMessageInput />
    </div>
  );
};

export default GroupContainer;
