import DeleteComponent from "../../deleteButton";

const ComponentRowSettings = ({ modal, route, mutateRoute }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
        width: "7%",
      }}
    >
      {modal}
      <DeleteComponent route={route} mutateRoute={mutateRoute} />
    </div>
  );
};

export default ComponentRowSettings;
