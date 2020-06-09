import React, { FunctionComponent } from "react";

const CenterDiv: FunctionComponent = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default CenterDiv;
