// import { NavigationState } from "@/types/NavigationState";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useTimeout } from "react-use";

// type FlashMessage = {
//   messageState: NavigationState | undefined;
//   flashState: boolean;
//   reset: () => void;
//   flashText: string
// };

export const useFlashMessage = (timeout: number, flashText = "") => {
  // const router = useRouter();
  // const pathname = usePathname();
  // const [flashMessage, setFlashMessage] = useState(false);
  // const [isReady, cancel, reset] = useTimeout(timeout);
  // useEffect(() => {
  //   if (flashText) {
  //     setFlashMessage(true);
  //   } else {
  //     setFlashMessage(false);
  //   }
  // }, [pathname]);
  // return {
  //   messageState: flashparams,
  //   flashState: flashMessage && !isReady(),
  //   reset,
  // } as FlashMessage;
};
