import { AuthContext } from "@/context/auth";
import { useGetData } from "@/hooks/fetching";
import Page from "@/layouts/page";
import { useContext } from "react";
import { Card, Container, Icon, Image } from "semantic-ui-react";

export default function ProfilePage(){
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData('/users/'+user?.sub);

  console.log(data);

  if(isLoading) return <div>...Loading</div>

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <Page title='Профиль'>
      <Container as='main' textAlign="center" style={{
        flexGrow: 1,
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '72px',
        position: 'relative'
      }}>
          <Card>
            <Image src={data?.[0]?.url || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{data?.[0]?.surname} {data?.[0]?.firstName}</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                Matthew is a musician living in Nashville.
              </Card.Description>
            </Card.Content>
          </Card>
      </Container>
    </Page>
  )
}