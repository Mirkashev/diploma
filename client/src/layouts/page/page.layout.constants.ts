

const userButtons = [
  { title:'Темы', href:'/user/topics' },
  { title:'ЛК', href:'/user/profile' },
  { title:'Статистика', href:'/user/stats' },
]

const teacherButtons = [
  { title:'ЛК', href:'/user/profile' },
  { title:'Статистика', href:'/teacher/stats' },
  { title:'Пользователи', href: '/teacher/users' },
  { title:'Группы', href: '/teacher/groups' },
  { title:'Темы пользв.', href:'/user/topics' },

]

const adminButtons = [
  { title:'Темы', href:'/admin/topics' },
  { title:'Пользователи', href:'/admin/users' },
  { title:'Группы', href:'/admin/groups' },
  { title:'Статистика', href:'/admin/stats' },
  { title:'Темы пользв.', href:'/user/topics' },

]

const buttons:any = {
  'admin': adminButtons,
  'student': userButtons,
  'teacher': teacherButtons
}

export default buttons;