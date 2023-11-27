import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useWeb3 from "src/hooks/web3.hook";

import {
  getRemoveAmount,
  removeLiquidity,
  removeLiquidityBNC,
} from "src/features/pair/poolSendFeatures";

import InputToken from "../AddLiquidity/InputToken";
import LiquidiityBtn from "../LiquidiityBtn";
import PercentBtnWarp from "./PercentBtnWarp";
import { Divstyle, Textstyle, Imgstyle } from "./RemoveLiquidity.styled";
import MyLiquidity from "./PercentBtnWarp/MyLiquidity";
import Price from "./PercentBtnWarp/Price";
import { PairItem } from "src/Interface/Token.interface";
import { getAmountOut } from "src/features/pair/swapSendFeatures";

const RemoveLiquidity: React.FC<{ data: PairItem }> = ({ data }) => {
  const queryClient = useQueryClient();
  const { user, web3, pairContract } = useWeb3(window.ethereum);

  const [percentage, setPercentage] = useState<string>("");
  const [tokens, setTokens] = useState({
    token1: { amount: "", symbol: "" },
    token2: { amount: "", symbol: "" },
  });
  const [token0Math, setToken0Match] = useState<string>("");
  const [token1Math, setToken1Match] = useState<string>("");

  // 0-9까지의 숫자만. 소숫점을 입력할 수 있으나 입력한 뒤에는 무조건 숫자 하나 이상이 들어가야 한다.
  const Ref = /^[0-9]+$/;
  const errMsg = () => {
    return alert("RemoveLiquidity 실패");
  };

  const tryRemoveLiquidity = async () => {
    if (!tokens.token1.amount || !tokens.token2.amount) return;
    if (pairContract) {
      if (percentage != "") {
        let percent = Number(percentage);
        if (data.token0Symbol == "BNC" || data.token1Symbol) {
          console.log("removeLiquidityBNC 실행");
          let tokenAddress =
            data.token0Symbol == "BNC"
              ? data.token1Address
              : data.token0Address;
          const result = await removeLiquidityBNC(
            pairContract,
            tokenAddress,
            percent,
            user.account
          );
          console.log(result);
          if (result == "error") {
            errMsg();
          }
        } else {
          console.log("removeLiquidity 실행");
          const result = await removeLiquidity(
            pairContract,
            data.token0Address,
            data.token1Address,
            percent,
            user.account
          );
          console.log(result);
          if (result == "error") {
            errMsg();
          }
        }
      }
    }
  };

  // ! 현재 페어 심볼과 내가 가진 페어의 양을 테스트하는 함수
  const changeRemoveAmount = (amount0: string, amount1: string) => {
    setTokens({
      token1: {
        amount: amount0,
        symbol: data.token0Symbol,
      },
      token2: {
        amount: amount1,
        symbol: data.token1Symbol,
      },
    });
  };

  const getRemoveAmountData = async (percent: number) => {
    if (pairContract) {
      const { amount0, amount1 } = await getRemoveAmount(
        pairContract,
        data.pairAddress,
        percent,
        user.account
      );
      const amount0Str = web3?.utils.fromWei(amount0, "ether").toString();
      const amount1Str = web3?.utils.fromWei(amount1, "ether").toString();
      if (!amount0Str || !amount1Str) return;
      changeRemoveAmount(amount0Str, amount1Str);
    }
  };

  useEffect(() => {
    let percent = Number(percentage);
    if (percent > 100) setPercentage("100");
    getRemoveAmountData(percent);
    tokenMatch();
  }, [percentage]);

  const tokenMatch = async () => {
    if (!pairContract) return;
    let inputAmount = BigInt(1 * 10 ** 18);
    const { amountOut: amountOut0 } = await getAmountOut(
      pairContract,
      data.pairAddress,
      inputAmount,
      data?.token0Address,
      data?.token1Address
    );
    let amountOut0Str = web3?.utils.fromWei(amountOut0, "ether").toString();
    console.log("??", amountOut0Str);
    if (amountOut0Str) setToken0Match(amountOut0Str);
    const { amountOut: amountOut1 } = await getAmountOut(
      pairContract,
      data.pairAddress,
      inputAmount,
      data?.token1Address,
      data?.token0Address
    );
    let amountOut1Str = web3?.utils.fromWei(amountOut1, "ether").toString();
    console.log("???", amountOut1Str);
    if (amountOut1Str) setToken1Match(amountOut1Str);
  };

  useEffect(() => {
    tokenMatch();
  }, []);

  return (
    <div className={`${Divstyle.flexCol}`}>
      <div className={Textstyle.subText}>Percentage to withdraw:</div>
      <InputToken
        tokenName={""}
        value={percentage}
        setInputAmount={setPercentage}
        regex={Ref}
      />
      <PercentBtnWarp setInputAmount={setPercentage} />
      <img src="/images/downArrow.png" alt="arrow" className={Imgstyle.arrow} />
      <MyLiquidity token1={tokens.token1} token2={tokens.token2} />
      <Price
        token0Match={token0Math}
        token1Match={token1Math}
        token0Symbol={data.token0Symbol}
        token1Symbol={data.token1Symbol}
      />
      <LiquidiityBtn
        tokenName={"Remove Liquidity"}
        clickFn={tryRemoveLiquidity}
      />
    </div>
  );
};

export default RemoveLiquidity;
