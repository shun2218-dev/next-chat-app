import React, { FC, memo, ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePage } from "@/hooks/usePage";
import logo from "/public/logo.svg";
import styles from "@/styles/components/Header.module.scss";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { PageParam } from "@/types/PageParam";

type Props = {
  params: PageParam;
  children: ReactNode;
};

const Header: FC<Props> = memo(function HeaderMemo({ params, children }) {
  const { toStart, toHome } = usePage();

  const pathname = usePathname();
  const { uid } = params;

  // const {
  //   pathname,
  //   query: { uid },
  // } = router;

  const logoNavigate = (authUser: string) => {
    if (authUser) {
      toHome(uid!);
    } else {
      toStart();
    }
  };

  return (
    <>
      {pathname !== "/start" && pathname !== "/" && (
        <header
          className={`${styles.header} ${uid ? styles.login : styles.notLogin}`}
        >
          {/* after log in switch toHome */}
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={67}
            onClick={() => logoNavigate(uid!)}
            className={styles.logo}
            priority
          />
          {children}
        </header>
      )}
    </>
  );
});

export default Header;
