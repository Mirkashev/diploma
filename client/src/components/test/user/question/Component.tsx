const UserTestQuestionComponent = ({question}: any)=> {
  return(
    <div>
      <div>
        <span>{question?.title}</span>
        <input style={{display:'none'}} type='text' name='question' value={question?.id} readOnly/>
      </div>
      <div>
        {question?.answers?.map((el: any)=> {
          return(
          <div key={el.id} style={{display:'flex', alignItems:'center'}}>
            <input name='answer-true' type='checkbox'/>
            <input style={{display:'none'}} type='text' name='answer' value={el.id} readOnly/>
            <span style={{marginRight:'10px'}}>{el.title}</span>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserTestQuestionComponent;
