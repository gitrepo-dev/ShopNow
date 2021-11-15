import Head from 'next/head'
import Banner from '../components/Banner'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Discount from '../components/Discount'
import Posts from '../components/Posts'

export default function Home({ catalogs, products }) {

  return (
    <>
      <Head>
        <title>amz</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Categories catalog={catalogs} />
      <Products products={products} />
      <Discount />
      <Posts />
    </>
  )
}

// categories
export async function getStaticProps() {

  const [catalogs, products] = await Promise.all([

    // get product by categories
    fetch(`https://fakestoreapi.com/products?limit=3`).then(res => res.json()),

    // get product by categories
    fetch(`https://fakestoreapi.com/products?limit=8`).then(res => res.json()),

  ]);

  return {
    props: {
      catalogs,
      products
    }
  };

}
