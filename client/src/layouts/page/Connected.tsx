import { useRouter } from "next/router";
import Page from "./Component";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/auth";

const ConnectedPageLayout = ({ children, title }: any) => {
  const router = useRouter();
  const { user }: any = useContext(AuthContext);

  useEffect(() => {
    if (
      user != undefined &&
      router.isReady &&
      !!router.pathname.match("/admin") &&
      user?.role !== "admin"
    ) {
      router.push("/user/topics");
    }
  }, [user?.role]);

  if (!user?.role) return <div>...loading</div>;

  return (
    <Page title={title} user={user}>
      {children}
    </Page>
  );
};

export default ConnectedPageLayout;
