import React from 'react'
import Header from "../components/Header";
import Row3 from '../components/Row3';
import useList from "../hooks/useList";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import Plans from "../components/Plans";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "../lib/stripe";
import Modal from "../components/Modal";
import { modalState, movieState } from "../atoms/modalAtom";
import { useRecoilValue } from "recoil";


interface Props {
  products: Product[];
}

const myList = ({products,}: Props) => {
  console.log(products);

  const { loading, user } = useAuth();
  const list = useList(user?.uid);
  const subscription = useSubscription(user);
  const showModal = useRecoilValue(modalState);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div className="overflow-x-hidden scrollbar-hide relative  h-screen bg-gradient-to-b from-yellow-900/15 to-{#010511] lg:h-[100vh]">
      <Header/>

      <main className="relative w-full  lg:space-y-24 lg:pl-16 pt-[12vh] px-[70px]">

      <section>

      <Row3 title="My List" movies={list}/>

  
      </section>

      </main>
      {showModal && <Modal />}


 
    </div>
  )
};

export default myList;


export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
  .then((res) => res)
  .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
}
}