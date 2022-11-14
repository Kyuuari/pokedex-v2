import React from "react";

type Props = {
  poketype: string;
  children?: JSX.Element;
};

const TypeTag = ({ children, poketype }: Props) => {
  return <div className="badge badge-md">{poketype}</div>;
};

export default TypeTag;
