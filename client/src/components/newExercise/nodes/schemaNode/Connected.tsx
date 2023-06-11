import SchemaNodeCustom from "./elements/custom";
import SchemaNodeDiafragm from "./elements/diafragm";
import SchemaNodeFlowMeter from "./elements/flowMeter";
import SchemaNodeOValve from "./elements/oValve";
import SchemaNodeRelay from "./elements/relay";
import SchemaNodeValve from "./elements/valve";

const SchemaNodeConnected = ({ id, data, isConnectable }: any) => {
  const { label, shemaNodeType, update } = data;

  const onChange = (field: string, value: string) => {
    update(id, {
      [field]: value,
    });
  };

  if (shemaNodeType === "clapan") {
    return (
      <SchemaNodeValve
        data={data}
        isConnectable={isConnectable}
        onChange={onChange}
      />
    );
  }

  if (shemaNodeType === "ovalve") {
    return (
      <SchemaNodeOValve
        data={data}
        isConnectable={isConnectable}
        onChange={onChange}
      />
    );
  }

  if (shemaNodeType === "rele") {
    return (
      <SchemaNodeRelay
        data={data}
        isConnectable={isConnectable}
        onChange={onChange}
      />
    );
  }

  if (shemaNodeType === "diafragm") {
    return (
      <SchemaNodeDiafragm
        data={data}
        isConnectable={isConnectable}
        onChange={onChange}
      />
    );
  }

  if (shemaNodeType === "flowmeter") {
    return (
      <SchemaNodeFlowMeter
        data={data}
        isConnectable={isConnectable}
        onChange={onChange}
      />
    );
  }

  return (
    <SchemaNodeCustom
      data={data}
      isConnectable={isConnectable}
      onChange={onChange}
    />
  );
};

export default SchemaNodeConnected;
