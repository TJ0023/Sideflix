import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import { GetStaticProps } from 'next'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import Membership from '../components/Membership'

interface Props{
    products: Product[]
}

function account({products}: Props) {
    console.log(products)
    const {user, logout} = useAuth()
    const subscription = useSubscription(user)
  return (
    <div>
        <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`bg-[#141414]`}>
      <Link href="/">
          <img
            src="./logo-png/sideflix.png"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
        </header>

        <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
            <div>
               <h1 className='text-3xl md:text-4xl'>Account</h1>
               <div className="-ml-0.5 flex items-center gap-x-1.5">
               <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
               </div>

            </div>

             <Membership/>

    

            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
                <h4>Plan Details</h4>
                {/* Find the current Plan */}
                <div className="col-span-2 font-medium">
                  {products.filter((product)=>product.id === subscription?.product)[0]?.name}
                </div>
                <p  className="cursor-pointer text-blue-500 hover:underline md:text-right" >Change Plan</p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
        </main>
    </div>
  )
}

export default account

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    })
      .then((res) => res)
      .catch((error) => console.log(error.message))
  
    return {
      props: {
        products,
      },
    }
  }