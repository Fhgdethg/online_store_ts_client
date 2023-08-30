import React from "react";

import SCGlobalInput from "./SCGlobalInput";

import {IGlobalInputProps} from "./GlobalInputTypes";

const GlobalInput: React.FC<IGlobalInputProps> = ({inputProps, error = null}) => {
  return (
    <SCGlobalInput>
      <input {...inputProps}/>
      {error && <p>{error}</p>}
    </SCGlobalInput>
  );
};

export default GlobalInput;