import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "../utils/requests";
import { Movie } from "../typings";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import useSubscription from "../hooks/useSubscription";
import useList from "../hooks/useList";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  anime: Movie[];
  popular: Movie[];
  upcoming: Movie[];
  products: Product[];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  anime,
  popular,
  upcoming,
  products,
}: Props) => {
  console.log(netflixOriginals);

  // const {logout, loading} = useAuth();

  //spencer
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);
  const movie = useRecoilValue(movieState)
  const list = useList(user?.uid);


  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  //original code
  // if (loading) return "Loading";

  return (
    <div className="overflow-x-hidden scrollbar-hide relative h-screen bg-gradient-to-b from-yellow-900/15 to-{#010511] lg:h-[100vh]">
      <Head>
        <title>Sideflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Semantics help just for readability*/}
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />

        <section>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Upcoming" movies={upcoming} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
          <Row title="Documentaries" movies={documentaries} />

          {/* My List/Saved Shows */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Anime" movies={anime} />
        </section>
      </main>

      {showModal && <Modal />}

      <footer className="flex justify-center align-baseline gap-2">
        <h1 className="font-semibold pt-1">Powered by</h1>
        <img
         src="./logo-png/tmdb.svg"
         width={60}
         height={60}
        />
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    anime,
    popular,
    upcoming,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchAnime).then((res) => res.json()),
    fetch(requests.fetchPopular).then((res) => res.json()),
    fetch(requests.fetchUpcoming).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      anime: anime.results,
      popular: popular.results,
      upcoming: upcoming.results,
      products,
    },
  };
};
