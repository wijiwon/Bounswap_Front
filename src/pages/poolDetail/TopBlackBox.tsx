import React from "react";
import ChartDiv from "../../components/Card/Chart";
import PairCoinsBox from "../../contents/Deposite/PairCoinsBox";
import AddRemoveLiquidity from "../../contents/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import DivCard from "src/components/Card";
import Container from "src/components/container";

const TopBlackBox = () => {
  return (
    <Container>
      <div className="flex items-start flex-row justify-center">
        <div>
          <DivCard>
            <CardTitle>Liquidity</CardTitle>
            <ChartDiv></ChartDiv>
          </DivCard>
          <DivCard>
            <CardTitle>Deposit Balance</CardTitle>
            <PairCoinsBox></PairCoinsBox>
          </DivCard>
        </div>
        <AddRemoveLiquidity />
      </div>
    </Container>
  );
};

export default TopBlackBox;
