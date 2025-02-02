import React, { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const JoinGroup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function joinGroup() {
      try {
        const res = await axiosInstance.get(`/group/join${location.pathname}`);

        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        navigate("/groups", { replace: true });
      }
    }
    joinGroup();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
};

export default JoinGroup;
