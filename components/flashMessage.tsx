import React, { FC } from "react";
// import { Alert, AlertTitle } from "@mui/material";
import { NavigationState } from "@/types/NavigationState";
import styles from "@/styles/components/FlashMessage.module.scss";

const FlashMessage: FC<NavigationState> = ({ status, title, text, strong }) => {
  return (
    <div>Alert</div>
    // <Alert
    //   severity={status}
    //   sx={{
    //     position: "absolute",
    //     top: "127px",
    //     left: "50%",
    //     transform: "translateX(-50%)",
    //     width: "874px",
    //     boxSizing: "border-box",
    //     textAlign: "left",
    //     fontFamily: '"Caveat", cursive',
    //     "@media screen and (max-width: 940px)": {
    //       width: "420px",
    //     },
    //     "@media screen and (max-width:600px)": {
    //       width: "300px",
    //       top: "100px",
    //     },
    //     "@media screen and (max-width:400px)": {
    //       width: "242px",
    //       top: "100px",
    //     },
    //   }}
    // >
    //   <AlertTitle
    //     sx={{
    //       fontFamily: '"Caveat", cursive',
    //       "@media screen and (max-width: 600px)": {
    //         fontSize: "0.6rem",
    //       },
    //     }}
    //   >
    //     {title}
    //   </AlertTitle>
    //   <p className={styles.flashText}>{text}</p>
    //   {strong && <strong>{strong}</strong>}
    // </Alert>
  );
};

export default FlashMessage;
