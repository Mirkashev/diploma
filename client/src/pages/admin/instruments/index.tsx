import DeleteComponent from "@/components/common/deleteButton";
import TableComponent from "@/components/common/table";
import { useGetData } from "@/hooks/fetching"
import Page from "@/layouts/page";
import { Container, Icon, Table } from "semantic-ui-react";
import EditInstrumentModal from "@/components/common/modal";


export default function InstrumentPage(){
  const { data, isLoading, isError } = useGetData('/instruments');
  console.log(data);

  if(isLoading) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <Page title='Инструменты' isAdmin={true}>
      <Container as='main' style={{
        flexGrow: 1,
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '72px',
        position: 'relative'
      }}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
            <Table.Body>
            {data?.map((el:any, i:number) => 
              <Table.Row key={el.title + i}>
                <Table.Cell>
                  <EditInstrumentModal 
                    route={'/instruments/'+el.id} 
                    getRoute={'/instruments/'+el.id}
                    mutateRoute={'/instruments'}
                    method='PATCH' 
                    modalType='instrument' 
                    title={el.title} 
                    triggerNode={<span style={{cursor:'pointer'}}>{el.title}</span>}
                  />
                </Table.Cell>
                <Table.Cell style={{display:'flex', justifyContent: 'space-between'}}>
                  <EditInstrumentModal 
                    route={'/instruments/'+el.id} 
                    getRoute={'/instruments/'+el.id}
                    mutateRoute={'/instruments'}
                    method='PATCH' 
                    modalType='instrument' 
                    title={el.title} 
                    triggerNode={<Icon style={{cursor:'pointer'}} name='pencil alternate' />}
                  />
                  <DeleteComponent route={'/instruments/'+el.id} mutateRoute={'/instruments'}/>
                </Table.Cell>
              </Table.Row>)}
          </Table.Body>
        </Table>
      </Container>
    </Page>


  )
}