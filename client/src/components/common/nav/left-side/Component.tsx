import { Container, Grid } from "semantic-ui-react";
import MenuComponent from "./menu";

export default function SideNav({children, pageType}: any) {
  return (
    <Container as='main' style={{
      flexGrow: 1,
      maxWidth: '720px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      // marginTop: '72px',
      position: 'relative'
    }} >
    <Grid style={{width:'100%'}}>
      <Grid.Column width={4}>
        <MenuComponent pageType={pageType}/>
      </Grid.Column>
      <Grid.Column width={12}>
        {children}
      </Grid.Column>
    </Grid>
    </Container>
  )
}