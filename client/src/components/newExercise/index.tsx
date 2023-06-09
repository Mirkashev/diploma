import { useCallback, useState } from "react";

import "reactflow/dist/style.css";
import {
  useGetData,
  usePatchData,
  usePatchDataM,
  usePostData,
} from "@/hooks/fetching";
import { useRouter } from "next/router";
import ExerciseAdminComponent from "./admin/Component";
import FlowComponent from "./flow";
import ExerciseComponent from "./user/Component";

const Exercise = () => {
  const router = useRouter();
  const { id, exercise_id } = router?.query;
  const [rfInstance, setRfInstance]: any = useState();

  const { data, isLoading, isError } = useGetData("/exercises/" + exercise_id);

  const send = usePatchDataM("/exercises/" + exercise_id);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      send.trigger(
        JSON.stringify({
          ...data,
          exerciseSchema: { exerciseId: exercise_id, content: flow },
        })
      );
    }
  }, [rfInstance, data]);

  const onCheck = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      console.log(flow.edges);
      // localStorage.setItem('tempFlow', JSON.stringify( flow));
      // const interElems = flow.nodes.filter(
      //   (el: any) => el.data.checked === "true"
      // );
      // const srcIds = flow.edges
      //   .map((el: any) => {
      //     if (!!interElems.find((elem: any) => elem.id === el.target)) {
      //       return { sId: el.source, tId: el.target, eType: el.data.edgeType };
      //     }
      //   })
      //   .filter((el: any) => el != undefined);

      // console.log(srcIds);

      // далее удалить из content элементы по id и их связи
      // сгенерировать инструменты и в нужные инструменты засунуть ids, в остальные зарандомить числа по дате
    }
  }, [rfInstance]);

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  if (!!router?.pathname?.match("/admin")) {
    return (
      <ExerciseAdminComponent data={data} onSave={onSave}>
        <FlowComponent
          data={data}
          setRfInstance={setRfInstance}
          rfInstance={rfInstance}
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
      />
    </ExerciseComponent>
  );
};
export default Exercise;
