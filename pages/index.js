import Pools, { ALL_POOLS_QUERY } from "../components/Pools";
import { initializeApollo } from "../lib/apolloClient";

const IndexPage = () => (
  <>
    <Pools />
  </>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POOLS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export default IndexPage;
