import GroupMessage from "../models/group.model.js";

const createNewGroup = async (req, res) => {
  try {
    const newGroupMessage = new GroupMessage({
      name: req.body?.groupName,
      members: [req.user._id],
      groupMessages: [
        {
          text: "Welcome to the Group!!!",
          senderId: req.user._id,
        },
      ],
    });
    const newlyCreatedGroup = await newGroupMessage.save();

    const groupData = await newlyCreatedGroup.populate({
      path: "groupMessages.senderId",
      select: "-password -__v -updatedAt", // Exclude password, __v and updatedAt
    });
    // const responseToSend = newlyCreatedGroupInfo.groupMessages.filter(
    //   (data) => ({
    //     message: data.message,
    //     created: data.createdAt,
    //     senderId: {
    //       _id: data.senderId._id,
    //       email: data.senderId.email,
    //       profilePic: data.senderId.profilePic,
    //       fullName: data.senderId.fullName,
    //     },
    //   })
    // );
    res.status(201).json({
      success: true,
      messsage: "Group Created Successfully!!!",
      groupData,
    });
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const joinGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { _id } = req.user;

    const addNewMember = await GroupMessage.findOneAndUpdate(
      { _id: groupId, members: { $ne: _id } }, //here didn't find that's why returning null
      { $push: { members: _id } },
      { new: true }
    );

    if (!addNewMember) {
      res.status(401).json({
        success: false,
        message: "You are already a member of the Group!!!",
        addNewMember,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "You have successfully joined the Group!!!",
        addNewMember,
      });
    }
    // const addNewMember = await GroupMessage.updateOne(
    //   {
    //     _id: groupId,
    //     members: { $ne: _id },
    //   },
    //   { $push: { members: _id } }
    // );
    // {
    //     "success": true,
    //     "message": "You have successfully joined the Group!!!",
    //     "addNewMember": {
    //         "acknowledged": true,
    //         "modifiedCount": 1,
    //         "upsertedId": null,
    //         "upsertedCount": 0,
    //         "matchedCount": 1
    //     }
    // }
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const groupChat = await GroupMessage.findById(groupId);
    if (!groupChat) {
      return res
        .status(404)
        .json({ message: "Group not found", success: false });
    } else {
      res.status(201).json({
        groupChat,
        success: true,
      });
    }
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await GroupMessage.find({ members: userId });
    if (!groups) {
      res.status(404).json({
        success: false,
        message: "You haven't Joined any Group till yet!!!",
      });
    } else {
      for (let group of groups) {
        group = await group.populate({
          path: "groupMessages.senderId",
          select: "-password -__v -updatedAt", // Exclude password, __v and updatedAt
        });
        group = await group.populate({
          path: "members",
          select: "-password -__v -updatedAt -createdAt", // Exclude password, __v, updatedAt and createdAt
        });
      }
      res.status(201).json({ success: true, groups });
    }
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ error: error.message, success: false });
  }
};

const removeMembersFromGroup = async (req, res) => {
  try {
    const group = await GroupMessage.findByIdAndUpdate(
      req.params.groupId, ////here found that's why returning groupMessages
      { $pull: { members: req.user._id } }, // Remove member from array
      { new: true }
    );
    if (!group) {
      return res
        .status(404)
        .json({ message: "Group not found", success: false });
    } else {
      res.status(201).json({ message: "Member removed", success: true, group });
    }
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ error: error.message });
  }
};
const sendMessageToGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const updatedGroupMesssage = await GroupMessage.findOneAndUpdate(
      { _id: groupId }, // Find the group chat by its ID
      {
        $push: {
          groupMessages: req.body,
        },
      },
      { new: true } // Option to return the updated document
    );
    res.json({
      success: true,
      message: "message Added Successfully!!!",
      updatedGroupMesssage,
    });
    // const groupChat = await GroupMessage.findById(groupId);

    // if (groupChat) {
    //   // Add a new message to the groupMessages array
    //   groupChat.groupMessages.push(req.message);
    //   // Save the updated group chat
    //   const updatedGroupMesssage = await groupChat.save();
    // }

    // const receiverSocketGroupId=getReceiverGroupId(groupId);
    // if (receiverSocketGroupId) {
    //   io.broadcast.to(receiverSocketGroupId).emit("newMessage", newMessage);
    // }
  } catch (error) {
    console.log("Error in joinGroup controller", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export {
  getMessages,
  joinGroup,
  createNewGroup,
  getAllGroups,
  removeMembersFromGroup,
  sendMessageToGroup,
};
