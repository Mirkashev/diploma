import { useEffect, useState } from "react";
import { AdminThemeInterface, ChapterTheoryInterface } from "../interfaces";

import ChapterTheoryComponent from "./Component";
import { ConnectedChapterTheoryType } from "../types";

const sendTheory = async (id: number, data: string)=> {
  // console.log(id, data);
  // return;
  const response = await fetch(`http://localhost:3030/theories`, {
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
    body: JSON.stringify({content: data, themeId: id})
  })

  if(response.ok) {
    alert('Данные сохранены!');
  }else {
    alert('smthing wrong');
  }
}



const ConnectedChapterTheory = ({ theme, editorLoaded }: ConnectedChapterTheoryType)=> {

  const [data, setData] = useState('');

  useEffect(()=> {
    if(theme) {
      setData(theme?.theory?.content);
    }
  }, [theme])


  return (
    <ChapterTheoryComponent 
      theme={theme}
      editorLoaded={editorLoaded}
      sendTheory={sendTheory}
      data={data}
      setData={setData}
    />
  )
}

export default ConnectedChapterTheory;