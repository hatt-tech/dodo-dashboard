import { gql, useQuery } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";
import { dollarFormatter } from "../utils";

export const ALL_POOLS_QUERY = gql`
  query allPools {
    pairs {
      id
      baseToken {
        id
        symbol
        name
      }
      quoteToken {
        id
        symbol
        name
        totalLiquidity
        tradeVolumeUSD
      }
    }
  }
`;

const Pool = ({ pair }) => (
  <tr>
    <td className="w-10">
      <img src="/images/dodo-token.svg" />
    </td>
    <td className="font-medium">
      {pair.baseToken.symbol}-{pair.quoteToken.symbol}
    </td>
    <td>{dollarFormatter(pair.quoteToken.totalLiquidity)}</td>
    <td>{dollarFormatter(pair.quoteToken.tradeVolumeUSD)}</td>
  </tr>
);

export default function Pools() {
  const { loading, error, data } = useQuery(ALL_POOLS_QUERY);

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading…</div>;

  const { pairs } = data;

  return (
    <table className="table table-auto w-full">
      <thead>
        <tr>
          <tr />
          <th>Name</th>
          <th>Liquidity</th>
          <th>Volume (24hr)</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((pair) => (
          <Pool key={pair.id} pair={pair} />
        ))}
      </tbody>
    </table>
  );
}
