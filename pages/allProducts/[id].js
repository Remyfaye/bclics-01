"use client";
import { menuEmpty } from "@/constants";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDisplay from "@/components/categories/CategoryDisplay";
import Saved from "@/components/saved/Saved";
import Post from "@/components/recommended/post";
import Leftside from "@/components/header/leftside";

const page = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [id, setId] = useState(null);
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(router.isReady);
    const fetchedProducts = menuEmpty.filter((item) => item.category === id);
    const results = menuEmpty.filter((product) =>
      product.name.toLowerCase().includes(id?.toLowerCase())
    );
    if (router.isReady) {
      setId(router.query.id);
      setSearchedProducts(results);
      setProducts(fetchedProducts);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products, router.isReady, router.query.id, id]);
  return (
    <div className=" pr-4 lg:px-20 ">
      <h1 className="mb-[3rem]  border-b-2 w-[50%] mx-auto border-red-300  text-center">
        {id} :nss
      </h1>
      <div className="flex gap-5 ">
        <div className="z-50 max-h-screen">
          <Leftside allProducts />
        </div>

        <div className="lg:mr-1 max-w-5xl mx-auto">
          <div className="grid lg:mr-20 lg:grid-cols-3 grid-cols-2 gap-5 max-w-3xl  mx-auto">
            {products.map((post) => (
              <Post
                allProducts
                key={post.id}
                title={post.name}
                image={post.image}
                price={post.price}
                id={post._id}
                category={post.category}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 m-0 lg:max-w-3xl lg:mr-20 lg:mx-auto">
            {searchedProducts.map((post) => (
              <Post
                allProducts
                key={post.id}
                title={post.name}
                image={post.image}
                price={post.price}
                id={post._id}
                category={post.category}
              />
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <>
          <div className="text-center my-10">loading...</div>
        </>
      )}
    </div>
  );
};

export default page;
