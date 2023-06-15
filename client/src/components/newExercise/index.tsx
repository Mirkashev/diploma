import { useCallback, useContext, useEffect, useState } from "react";

import "reactflow/dist/style.css";
import { useGetData, patchData, postData } from "@/hooks/fetching";
import { useRouter } from "next/router";
import ExerciseAdminComponent from "./admin/Component";
import FlowComponent from "./flow";
import ExerciseComponent from "./user/Component";
import { TitlesContext } from "@/context/titles";

const Exercise = () => {
  const router = useRouter();
  const { id, exercise_id } = router?.query;
  const [rfInstance, setRfInstance]: any = useState();

  const { data, isLoading, isError } = useGetData("/exercises/" + exercise_id);

  const { setTopicTitle, setExerciseTitle } = useContext(TitlesContext);

  useEffect(() => {
    setTopicTitle(data?.theme?.title);
    setExerciseTitle(data?.title);
  }, [data]);

  const send = patchData("/exercises/" + exercise_id);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      send.trigger(
        JSON.stringify({
          ...data,
          content: flow,
        })
      );
    }
  }, [rfInstance, data]);

  const onCheck = useCallback(() => {
    if (!rfInstance) return;

    const flow = rfInstance.toObject();

    const defaultFlow = JSON.parse(data?.exerciseSchema?.content);

    console.log(flow.edges, defaultFlow.edges);

    const trueEdges = flow.edges.filter((edge: any) => {
      const nodeByTarget = rfInstance.getNode(edge.target);
      const nodeBySource = rfInstance.getNode(edge.source);
      if (
        (nodeByTarget.draggable !== false ||
          nodeBySource.draggable !== false) &&
        defaultFlow.edges.find(
          (el: any) =>
            ((nodeBySource.data.trueId === el.source &&
              nodeByTarget.data.trueId === el.target) ||
              (nodeBySource.data.trueId === el.target &&
                nodeByTarget.data.trueId === el.source)) &&
            edge.data.edgeType === el.data.edgeType
        )
      ) {
        return edge;
      }
    });

    console.log(trueEdges);

    rfInstance.setEdges((edges: any) => {
      return edges.map((edge: any) => {
        const condition = !trueEdges.find(
          (el: any) =>
            edge.source === el.source &&
            edge.target === el.target &&
            edge.data.edgeType === el.data.edgeType
        );
        return {
          ...edge,
          data: {
            ...edge.data,
            isWrong: condition,
          },
        };
      });
    });

    rfInstance.setNodes((nodes: any) => {
      return nodes.map((node: any) => {
        if (node.draggable === false) return node;

        const isWrong =
          !(
            trueEdges.find((el: any) => el.target == node.id) ||
            trueEdges.find((el: any) => el.source == node.id)
          ) || !trueEdges.length;

        return {
          ...node,
          data: {
            ...node.data,
            isWrong: isWrong,
          },
        };
      });
    });
  }, [rfInstance, data]);

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  if (!!router?.pathname?.match("/admin")) {
    return (
      <ExerciseAdminComponent data={data} onSave={onSave}>
        <FlowComponent
          data={data}
          setRfInstance={setRfInstance}
          rfInstance={rfInstance}
          onSave={onSave}
        />
      </ExerciseAdminComponent>
    );
  }

  return (
    <ExerciseComponent data={data} onSave={onCheck}>
      <FlowComponent
        data={data}
        setRfInstance={setRfInstance}
        isUser={true}
        rfInstance={rfInstance}
        onSave={onCheck}
      />
    </ExerciseComponent>
  );
};
export default Exercise;
