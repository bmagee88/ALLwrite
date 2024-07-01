import React from "react";
import { TruncatedTextProps } from "../interfaces/truncate-text.interface";

const TruncateTextContext = React.createContext<TruncatedTextProps | undefined>(undefined);

export default TruncateTextContext;
