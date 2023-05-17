import AdminThemeComponent from "./Сomponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ConnectedAdminTheme= () => {
  const router = useRouter();
  const [theme, setTheme]:any = useState({title: 'loading...'});
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { id } = router.query;

  const [chapter, handleChapter] = useState('theory');
  // прогружать данные с сервера
  useEffect(()=> {
    const getTopicData = async ()=> {
      const response = await fetch(`http://localhost:3030/themes/${id}`, {
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

        console.log(data);
        setTheme(data[0]);

      }else {
        alert('smthing wrong');
      }
    }

    if(id) {
      getTopicData();
      setEditorLoaded(true);
    }
  }, [id])

  return (
    <AdminThemeComponent 
      theme={theme} 
      chapter={chapter} 
      handleChapter={handleChapter} 
      editorLoaded={editorLoaded} 
    />
  )
}
export default ConnectedAdminTheme;