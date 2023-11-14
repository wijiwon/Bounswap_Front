import React from "react";
import { useNavigate } from "react-router-dom";
import { DataArray } from "src/Interface/ReactNode.interface";
import Card from "src/components/Card";
import CardTitle from "src/components/Card/CardTitle";

const StakeDashboard: React.FC<{ data: DataArray }> = ({ data }) => {
  const nav = useNavigate();
  return (
    <div className="flex justify-center w-full">
      <Card>
        <table className="w-full text-deepBlack">
          <thead>
            <tr className="border-t-2 border-b-2 h-[50px] text-[18px] ">
              <th>Token name</th>
              <th className="mobile:hidden">Total staked</th>
              <th>Volume(24H)</th>
              <th className="stakDash:hidden">APR(30D)</th>
              <th className="mobile:hidden">Your tokens</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr
                className="border-t-2 border-b-2 cursor-pointer hover:bg-opercityBlack rounded-full "
                onClick={(e) => {
                  nav(`/stake/${data.tokenCA}`);
                }}
              >
                <td>
                  <div className="flex justify-start items-center pl-5 ">
                    <div className="w-[50px] h-[50px] rounded-full">
                      <img
                        src={data.tokenImg}
                        alt="Logo"
                        className="w-full rounded-full "
                      />
                    </div>
                    <div>
                      <div className="ml-2">
                        <span className="stakDash:hidden">
                          {data.tokenName}
                        </span>
                        <span className="stakDash:hidden"> / </span>
                        <span>{data.tokenSymbol}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="mobile:hidden">{data.totalStaked}</td>
                <td>{data.volume}</td>
                <td className="stakDash:hidden">{data.APR}</td>
                <td className="mobile:hidden">{data.your}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default StakeDashboard;
