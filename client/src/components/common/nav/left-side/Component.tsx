import { Container, Grid } from "semantic-ui-react";
import MenuComponent from "./menu";

export default function SideNav({children, pageType}: any) {
  return (
    <Container as='main' style={{
      flexGrow: 1,
      // maxWidth: '720px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // marginTop: '72px',
      position: 'relative'
    }} >
    <Grid style={{width:'100%', position:'relative'}}>
      <Grid.Column width={4} style={{paddingLeft:'0px'}}>
        <MenuComponent pageType={pageType}/>
      </Grid.Column>
      <Grid.Column width={12} style={{paddingRight:'0px', paddingLeft: '0px'}}>
        {children}
      </Grid.Column>
    </Grid>
    </Container>
  )
}