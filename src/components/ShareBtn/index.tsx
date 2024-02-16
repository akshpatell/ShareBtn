"use client";
import React from "react";
import useShare from "@/lib/hooks/useShare";
import { toast } from "react-toastify";
import Styles from "./sharebtn.module.css";

type ShareProps = {
  url: string;
};
const ShareBtn = ({ url }: ShareProps) => {
  const { share, isSupported, isReady, isShared } = useShare({
    onSuccess: () => {
      toast.success("Sharing successful!");
    },
    onError: (error) => {
      toast.error("Error sharing:", error);
    },
    fallback: () => {
      toast.success("Fallback sharing method used.");
    },
  });

  const handleClick = () => {
    if (isSupported && isReady) {
      share({
        title: "Example Title",
        text: "Example Text",
        url: `${url}`,
      });
    } else {
      toast.error("Sharing not supported or ready.");
    }
  };

  return (
    <div className={Styles.main}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!isSupported || isShared}
        className="text-2xl px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-white hover:text-blue-900 hover:border-2 hover:border-blue-900"
      >
        Share
      </button>
    </div>
  );
};

export default ShareBtn;
