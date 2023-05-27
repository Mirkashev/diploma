export default function parsePathName(pathname: string, query: any){
  if(query == undefined || !Object.keys(query).length) return;

  const dynamicRoutes = pathname.match(/\[[a-z]*\]/g);
  let newPathName = pathname;
  
  dynamicRoutes?.forEach((el)=> {
    newPathName = newPathName.replace(el, query?.[`${el.replace(/\[|\]/g, '')}`])
  })

  return newPathName;
}