import { useRouter } from "next/router";
import StatsTestComponent from "./test";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import { useGetData } from "@/hooks/fetching";
import StatsExerciseComponent from "./exercise";

const ConnectedStats = ({ statsType }: any) => {
  const router = useRouter();
  const { user }: any = useContext(AuthContext);

  const { data, isLoading, isError } = useGetData(
    `/results${statsType === "exercise" ? "Ex" : ""}/`
  );

  if (isLoading) return <div>...Loading</div>;

  if (isError) return <div>There is some error, try to update page</div>;

  const filterData = (data: any) => {
    return data
      ?.filter(
        ({
          test: {
            topic: { title: topic },
          },
        }: any) => topic.includes(router.query.topic) || !router.query?.topic
      )
      ?.filter(({ user }: any) => {
        if (user?.group?.title) {
          console.log(user.group);
          return (
            user?.group.title.includes(router.query.group) ||
            !router.query?.group
          );
        }
      });
  };

  const filterDataEx = (data: any) => {
    return data
      ?.filter(
        ({
          exercise: {
            topic: { title: topic },
          },
        }: any) => topic.includes(router.query.topic) || !router.query?.topic
      )
      ?.filter(({ user }: any) => {
        if (user?.group?.title) {
          console.log(user.group);
          return (
            user?.group.title.includes(router.query.group) ||
            !router.query?.group
          );
        }
      });
  };

  if (statsType === "exercise") {
    return (
      <StatsExerciseComponent
        data={data}
        filterData={filterDataEx}
        user={user}
        router={router}
      />
    );
  }

  return (
    <StatsTestComponent
      data={data}
      filterData={filterData}
      user={user}
      router={router}
    />
  );
};

export default ConnectedStats;
