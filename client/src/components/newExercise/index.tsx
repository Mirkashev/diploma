import { useCallback } from 'react';
import ReactFlow, { addEdge, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import { Container } from 'semantic-ui-react';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, style:{ width: 'calc(100% - 1px)', height: 'calc(100% - 1px)' }, draggable: false, selectable: false },
  { id: '2', position: { x: 0, y: 0 }, data: { label: '2' }, expandParent: false, parentNode:'1', extent:'parent', width:'100px', style:{ width: '100px', height: '100px' } },
  { id: '3', position: { x: 0, y: 100 }, data: { label: '3' }, expandParent: false, parentNode:'1', extent:'parent', width:'100px', style:{ width: '100px', height: '100px' } },
];

const initialEdges = [{ id: 'e2-3', source: '2', target: '2' }];

const Exercise = ()=> {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <Container style={{height:'calc(100vh - 140px)', marginTop:'60px'}}>
      <div className='test' style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes} 
          edges={edges} 
          panOnDrag={false}
          maxZoom={1}
          minZoom={1}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          translateExtent={[[-0, -0], [1125, 795]]}
          // nodeExtent={[[-550, -425], [400, 375]]}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          // fitView={true}
        />
      </div>
    </Container>
  )

}
export default Exercise;