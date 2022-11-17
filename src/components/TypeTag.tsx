import React, { useState } from "react";

type Props = {
  poketype: string;
  children?: JSX.Element;
};

const TypeTag = ({ children, poketype }: Props) => {
  const [type, setType] = useState(poketype);

  return <div className={"badge badge-md" + " " + poketype}>{type}</div>;
};

export default TypeTag;
