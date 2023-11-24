import React from "react";
import { InputTokenProps } from "src/Interface/Token.interface";
import { Divstyle } from "./LiquidityBtn.style";

const LiquidityBtn: React.FC<InputTokenProps> = ({ tokenName, onClick }) => {
  return <div onClick={onClick} className={Divstyle.btn}>{tokenName}</div>;
};

export default LiquidityBtn;
