import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { useContext } from "react";
import { Button, Container, Dropdown, Icon } from "semantic-ui-react";

export default function Nav() {
  const { logout, user }: any = useContext(AuthContext);

  return (
    <header style={{ zIndex: 2 }}>
      <nav
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          borderBottom: "1px solid rgb(199 199 199)",
          height: "60px",
          background: "#fff",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/">
            <b style={{ color: "#000" }}>Education-service</b>
          </Link>
          <div>
            <span>User: {user?.login}</span>
            <Button
              onClick={() => logout()}
              style={{ marginLeft: 15 }}
              icon="sign out"
            />
          </div>
        </Container>
      </nav>
    </header>
  );
}
