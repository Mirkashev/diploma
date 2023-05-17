import Page from "@/layouts/page";
import AdminThemesComponent from "./Сomponent";
import { useEffect, useState } from "react";
import AddModal from '@/components/common/modal/title/Component'

const save = async (data: string)=> {
  const response = await fetch('http://localhost:3030/themes', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({title: data})
  })

  if(!response.ok) {
    alert('smthing wrong');
  }
}

const ConnectedAdminThemes = () => {
  // get themes list by fetch /admin/url
  const [themes, setThemes] = useState([]);
  const [data, setData] = useState('');
  useEffect(()=> {
    const getThemes = async ()=> {
      const response = await fetch('http://localhost:3030/themes', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
    
      if(response.ok) {
        const data = await response.json();
        setThemes(data);

      }else {
        alert('smthing wrong');
      }
    }

    getThemes();
    
  }, [])

  return (
    <Page title={'Редактировать темы'} isAdmin={true}>
      <AdminThemesComponent themes={themes}>
        <AddModal title={'Добавить тему'} data={data} setData={setData} save={save}/>
      </AdminThemesComponent>
    </Page>
  )
}
export default ConnectedAdminThemes;