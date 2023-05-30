import { AuthContext } from "@/context/auth";
import { useGetData } from "@/hooks/fetching";
import Page from "@/layouts/page";
import { useContext } from "react";
import { Container } from "semantic-ui-react";

export default function StatsPage(){
  const { user }: any = useContext(AuthContext);
  const { data, isLoading, isError } = useGetData('/results/'+user?.sub);

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
        {data.map((el:any, i:number)=> <div key={el?.id + i * Math.random()}>#{i+1}. {el?.test?.title} проценты: {el?.percent}%</div>)}
      </Container>
    </Page>
  )
}