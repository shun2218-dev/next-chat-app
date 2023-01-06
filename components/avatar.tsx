import React, {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useEffect,
  useState,
} from "react";
import { useAuthUser } from "@/atoms/useAuthUser";
import { usePage } from "hooks/usePage";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { Skeleton } from "@mui/material";
import styles from "@/styles/components/Avatar.module.scss";
import Image from "next/image";

type Props = {
  size?: number;
  state?: File | null;
  setState?: Dispatch<SetStateAction<File | null>>;
  header?: boolean;
  chat?: boolean;
  storageRef?: string;
  profile?: boolean;
};

const Avatar: FC<Props> = ({
  size = 60,
  state,
  setState,
  header = false,
  chat = false,
  storageRef,
  profile = false,
}) => {
  const { toProfile } = usePage();
  const authUser = useAuthUser();
  const [url, setUrl] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      if (e.target.files !== null) {
        setUrl("");
        setState(e.target.files[0]);
      }
    }
  };

  useEffect(() => {
    if (storageRef) {
      setUrl(storageRef);
    }
  }, [storageRef]);

  useEffect(() => {
    if (authUser?.photoURL) {
      setUrl(authUser.photoURL);
    }
  }, [authUser]);

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover",
  } as CSSProperties;

  const AvatarImage = () => {
    return (
      <div className={styles.container}>
        {chat ? (
          storageRef ? (
            <Image
              src={storageRef}
              alt=""
              style={imageStyle}
              className={`${styles.avatar} ${profile && styles.profile}`}
              width={60}
              height={60}
            />
          ) : (
            // <Skeleton variant="circular" width={size} height={size} />
            <div>loading...</div>
          )
        ) : state !== undefined && state !== null ? (
          <Image
            src={URL.createObjectURL(state)}
            alt=""
            style={imageStyle}
            className={`${styles.avatar} ${profile && styles.profile}`}
            width={60}
            height={60}
          />
        ) : url !== null ? (
          <Image
            src={url}
            alt=""
            style={imageStyle}
            className={`${styles.avatar} ${profile && styles.profile}`}
            onClick={() => header && toProfile(authUser?.uid!)}
            width={60}
            height={60}
          />
        ) : (
          // <AccountCircleIcon sx={{ width: size, height: size }} />
          <div>Account Circle</div>
        )}
      </div>
    );
  };

  return (
    <div>
      <label htmlFor="avatar">
        <AvatarImage />
      </label>
      {!header && !chat && (
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="avatar"
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Avatar;
