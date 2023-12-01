import Container from "src/components/container";
import { Divstyle } from "./poolpair.styled";
import AddRemoveLiquidity from "src/contents/poolpair/Liquidity";
import CardTitle from "src/components/Card/CardTitle";
import Card from "../../components/Card";
import Pairname from "../../components/Pairname";
import DepositeCard from "src/contents/poolpair/DepositeCard";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  DataArray,
  UnclaimedFeeData,
  UserLiquidity,
} from "src/Interface/Token.interface";
import useWeb3 from "src/hooks/web3.hook";
import { useParams } from "react-router-dom";
import { PairItem } from "src/Interface/Token.interface";
import { getEachPool } from "src/features/data/dataGetEachPool";
import UnclaimedFeesCard from "src/contents/poolpair/UnclaimedFeesCard";
import { getUnclaimedFee } from "src/features/data/dataGetUnclaimedFee";
import { poolGetUserLiquidity } from "src/features/pair/pairpoolGetUserLiquidity";
import LoadingIndicator from "src/components/LoadingIndicator";

const MyPoolpair: React.FC = () => {
  const { web3, user, dataContract, pairContract } = useWeb3(null);
  const { id } = useParams();
  const [pool, setPool] = useState<PairItem>();
  const [fee, setFee] = useState<UnclaimedFeeData>();
  const [userLiquidity, setUserLiquidity] = useState<UserLiquidity>();

  useEffect(() => {
    if (!pairContract || !dataContract || !id || user.account == "" || !web3)
      return;
    const getData = async () => {
      const pool = await getEachPool({
        pairContract,
        dataContract,
        pairAddress: id,
        userAddress: user.account,
        web3,
      });
      console.log("pool 테스트", pool);
      setPool(pool);

      const fee = await getUnclaimedFee({
        dataContract,
        userAddress: user.account,
        pairAddress: id,
        web3,
      });
      console.log("fee", fee);
      setFee(fee);

      const userLiquidity = await poolGetUserLiquidity({
        pairContract,
        userAddress: user.account,
        pairAddress: id,
        web3,
      });
      console.log("userlp", userLiquidity);
      setUserLiquidity(userLiquidity);
    };
    getData();
  }, [dataContract, user, id]);

  if (!pool || !fee || !userLiquidity) {
    return <LoadingIndicator/>;
  }

  return (
    <>
      <Pairname data={pool} />
      <Container>
        <div className={Divstyle.flexRow}>
          <div className={Divstyle.flexCol}>
            <DepositeCard pool={pool} userLiquidity={userLiquidity} />
            <UnclaimedFeesCard pool={pool} fee={fee} />
          </div>
          <AddRemoveLiquidity data={pool} />
        </div>
      </Container>
    </>
  );
};

export default MyPoolpair;
