import SideNav from "@/components/common/nav/left-side";
import { useGetData, usePatchDataM } from "@/hooks/fetching";
import Page from "@/layouts/page";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Dropdown, Form, Icon, Modal, Table } from "semantic-ui-react";
import { mutate } from "swr";
// import AddGroupModal from '@/components/common/modal'

function AddToGroupModal(){
  const router = useRouter();

  const { group_id } = router.query;
  const [open, setOpen] = useState(false);
  const [selectedUser, setUser]:any = useState({});
  // добавить роут где group_id === null
  const { data, isLoading, isError, mutate } = useGetData('/users/nogroup');
  console.log(data);

  if(isLoading) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>


  const submit = async (e: any)=> {
    const send = usePatchDataM('/users/'+selectedUser.id, '/groups/'+group_id)

    e.preventDefault();
    
    const res = await send.trigger(JSON.stringify({...selectedUser, groupId: group_id}));

    if(res) {
      setOpen(false);
      mutate();
    }

  }

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button style={{borderRadius:0}}>{'Добавить пользователя'}</Button>}
      size="mini"
    >
      <Form style={{padding:'20px'}} onSubmit={submit}>
        <Form.Field>
          <Dropdown 
            placeholder="Выберите пользователя"
            id="role"
            name='role'
            type='text'
            selection 
            // defaultValue={userData?.role === 'teacher' ? 'teacher' : 'student'}
            options={data?.map((el: any)=> (
              {
                key: el.id, 
                text: "логин: " + el.login + "; фамилия: " + el?.surname, 
                value: Math.random() + "val" + el.login, 
                onClick: ()=> setUser(el)}
              ))} 
          />
        </Form.Field>
        <Form.Field>
          <Button type="submit">Добавить</Button>
        </Form.Field>
      </Form>
    </Modal>
  )
}

export default function PageGroup(){
  const router = useRouter();

  const { group_id } = router.query;

  const { data, isLoading, isError } = useGetData('/groups/'+group_id);


  const removeFromGroup = async (el: any)=> {
    const patchUser = usePatchDataM('/users/'+el.id, '/groups/'+group_id);
    el.groupId = null;

    await patchUser.trigger(JSON.stringify(el));

    mutate('/users/nogroup');
  }

  if(isLoading) return <div>...Loading</div>;

  if(isError) return <div>There is some error, try to update page</div>

  return (
    <Page title={'Редактировать пользователей'}>
      <Container as='main' style={{
        flexGrow: 1,
        maxWidth: '720px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '72px',
        position: 'relative'
      }} >
        <SideNav pageType='adminUsers'>
          <div style={{display:'flex', justifyContent:"space-between"}}>
            <Button onClick={()=> router.back()}>Назад</Button>
            <AddToGroupModal/>
          </div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Логин</Table.HeaderCell>
                <Table.HeaderCell>Фамиля</Table.HeaderCell>
                <Table.HeaderCell>Имя</Table.HeaderCell>
                <Table.HeaderCell>Отчество</Table.HeaderCell>
                <Table.HeaderCell style={{width:'5%'}}>Настройки</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data?.users?.map((el: any, i: any) => 
                <Table.Row key={i + Math.random()}>
                  <Table.Cell>
                    <span>{el.login}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{el?.surname || 'Не указана'}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{el?.firstName || 'Не указана'}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{el?.lastName || 'Не указана'}</span>
                  </Table.Cell>
                  <Table.Cell style={{display:'flex', justifyContent: 'center'}}>
                    <Icon style={{cursor:'pointer'}} onClick={()=>removeFromGroup(el)} name='trash alternate'/>
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </SideNav>
      </Container>
    </Page>

  )
}