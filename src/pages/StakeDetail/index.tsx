import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import {
  DataItem,
  DataArray,
  EarlyInfo,
} from "../../Interface/Token.interface";
import Container from "../../components/container";
import Card from "../../components/Card";
import { Divstyles } from "./StakeDetail.style";
import TokenName from "src/components/TokenName";
import { useNavigate } from "react-router-dom";
import VolumeCotainer from "src/contents/StakeDetail/VolumeCotainer";
import EarlyCard from "src/contents/StakeDetail/EarlyCard";
import { EarlyArray } from "../../Interface/Token.interface";
import StakeCard from "src/contents/StakeDetail/StakeCard";
import { getTime } from "src/features/getTime";
import MyInfoCard from "src/contents/StakeDetail/MyInfoCard";

const StakeDetail = () => {
  const [lptokens, setLptokens] = useState<DataArray | null>(null);
  const [selectToken, setSelectTokens] = useState<DataItem | null>(null);
  const [withdrawal, setWithdrawal] = useState<EarlyArray | null>(null);
  const params = useParams<{ id: string }>();

  const queryClient = useQueryClient();
  // const data = queryClient.getQueryData<DataArray>("lpTokens");

  const nav = useNavigate();

  useEffect(() => {
    const getLptokens = async () => {
      const data = await queryClient.getQueryData<DataArray>("lpTokens");
      // console.log("❗️data", data);
      setLptokens(data ? data : null);
      // console.log("@@lptokens", lptokens);
    };
    getLptokens();
  }, [lptokens]);
  // console.log("LpTokens", data);

  // console.log("params", params.id);

  useEffect(() => {
    if (lptokens) {
      const find = async () => {
        const select = await lptokens.find((el: DataItem) => {
          // console.log("el", el);
          return el.tokenCA == params.id;
        });
        // console.log("선택", select);
        setSelectTokens(select ? select : null);
        console.log("⭐️⭐️⭐️selectToken", selectToken);
      };
      find();
    }
  }, [lptokens, params.id, selectToken]);

  useEffect(() => {
    // ! Early 더미 값. 나중에 정보 받아오면 지우자!
    const EarlyData = [
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 34,
        reword: 0.034,
        time: 1700123200,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 1,
        reword: 0.001,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
      {
        LPtoken: 11,
        reword: 0.011,
        time: 1700132400,
        symbol: selectToken?.tokenSymbol || "",
      },
    ];
    if (EarlyData) {
      const editData = EarlyData.map((el, index) => {
        const date = getTime(el.time);

        return {
          LPtoken: el.LPtoken,
          reword: el.reword,
          time: date,
          symbol: el.symbol,
        };
      });
      console.log("???????", editData);
      setWithdrawal(editData);
    }
  }, [selectToken]);

  return (
    <>
      {selectToken && (
        <TokenName
          tokenImg={selectToken.tokenImg}
          tokenName={selectToken.tokenName}
          tokenSymbol={selectToken.tokenSymbol}
          onClick={() => {
            console.log("click????");
            nav(-1);
          }}
        />
      )}
      <Container>
        <div className={Divstyles.flexRow}>
          <div className={Divstyles.flexCol}>
            {selectToken && (
              <VolumeCotainer
                totalvolum={selectToken?.totalStaked}
                endTime={getTime(selectToken.endTime)}
                startTime={getTime(selectToken.startTime)}
              />
            )}
            <div className="w-full mobile:hidden flex justify-center">
              {withdrawal && <EarlyCard data={withdrawal} />}
            </div>
            <div className="w-full pc:hidden flex justify-center">
              <MyInfoCard />
            </div>
          </div>
          <div className={Divstyles.flexCol}>
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            {selectToken && <StakeCard timestamp={selectToken.endTime} />}
            {/* // ! h 비율 맞추기 위해서 임시로 지정해놓은 고정 값! 차트 사이즈 확인하고 수정할 것! */}
            <div className="w-full mobile:hidden flex justify-center">
              <MyInfoCard />
            </div>
            <div className="pc:hidden w-full flex justify-center">
              {withdrawal && <EarlyCard data={withdrawal} />}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default StakeDetail;
