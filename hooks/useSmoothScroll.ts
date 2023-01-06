"use client";
import React, { useRef, RefObject } from "react";

export const useSmoothScroll = (isLastMessage: boolean) => {
  const chatRef = useRef<HTMLUListElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const smoothScroll = (ref: RefObject<HTMLUListElement | HTMLDivElement>) => {
    if (isLastMessage && ref.current) {
      ref.current!.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return {
    chatRef,
    infoRef,
    smoothScroll,
  };
};
