import { useRouter } from "next/router";
import { Grid, Menu } from "semantic-ui-react";

const SideNav = ({ children, links }: any) => {
  const router = useRouter();
  return (
    <Grid style={{ width: "100%", padding: 0, margin: 0 }}>
      <Grid.Column width={2} style={{ padding: 0, margin: 0 }}>
        <Menu fluid vertical tabular style={{ height: "100%" }}>
          {links?.map((el: any, i: number) => (
            <Menu.Item
              key={"sideNavMenuI" + i}
              active={!!router.pathname.match(el.href) || false}
              onClick={() => router.push(el.href)}
            >
              {el.title}
            </Menu.Item>
          ))}
        </Menu>
      </Grid.Column>

      <Grid.Column
        // stretched
        width={14}
        style={{ padding: 0, margin: 0, paddingLeft: 10 }}
      >
        {children}
      </Grid.Column>
    </Grid>
  );
};

export default SideNav;
