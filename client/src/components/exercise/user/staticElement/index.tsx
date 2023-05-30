export default function StaticElement({ xP, yP, width, height}: any) {
  return (
    <div style={{
      width: width,
      height: height,
      border: '1px solid rgb(0, 0, 0)',
      position: 'absolute',
      zIndex: 1,
      margin: '0px',
      transform: `translate(${xP}px, ${yP}px)`,
    }}>

    </div>
  )
}