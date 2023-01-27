import React, {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useEffect,
  useState,
  useMemo,
} from "react";
import Image from "next/image";
import { useAuthUser } from "@/hooks/useAuthUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Skeleton } from "@mui/material";
import styles from "@/styles/components/Avatar.module.scss";
import Link from "next/link";

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
  const { authUser } = useAuthUser();
  const [url, setUrl] = useState<string | null>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setState) {
      if (e.target.files !== null) {
        setUrl("");
        setState(e.target.files[0]);
      }
    }
  };
  const avatarImageClasses = useMemo(
    () => [styles.avatar, profile && styles.profile].join(" "),
    [profile]
  );

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
              className={[styles.avatar, profile && styles.profile].join(" ")}
              width={60}
              height={60}
            />
          ) : (
            <Skeleton variant="circular" width={size} height={size} />
            // <div>loading...</div>
          )
        ) : state !== undefined && state !== null ? (
          <Image
            src={URL.createObjectURL(state)}
            alt=""
            style={imageStyle}
            className={avatarImageClasses}
            width={60}
            height={60}
          />
        ) : url !== null ? (
          header ? (
            <Link href={`/${authUser?.uid}/profile`}>
              <Image
                src={url}
                alt=""
                style={imageStyle}
                className={avatarImageClasses}
                width={60}
                height={60}
              />
            </Link>
          ) : (
            <Image
              src={url}
              alt=""
              style={imageStyle}
              className={avatarImageClasses}
              width={60}
              height={60}
            />
          )
        ) : (
          <AccountCircleIcon sx={{ width: size, height: size }} />
          // <div>Account Circle</div>
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
