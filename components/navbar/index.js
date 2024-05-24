"use client";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Elementthree from "./elementthree";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import ShoppingCart from "./shoppingcart";
import { cartState } from "../../atom/cartAtom";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { menuEmpty } from "@/constants";
import Search from "./search";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [searchParams, setSearchParams] = useState("");

  // useEffect(() => {
  //   // console.log(router.isReady);
  //   if (router.isReady) {
  //     setSearchParams(router.query);
  //   } else {
  //     // setLoading(true);
  //   }
  // }, []);

  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  // React Recoil
  const [cart, setCart] = useRecoilState(cartState);
  const [results, setResults] = useState([]);

  const getSearchedProduct = async () => {
    // if (!query) {
    //     return res.status(400).json({ message: 'Query parameter is required' });
    // }

    const results = menuEmpty.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchedProducts(results);
  };

  const onSearch = () => {
    const delayBounceFn = setTimeout(() => {
      let newUrl = "";
      console.log(searchParams);
      // alert(searchParams);
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams,
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams,
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayBounceFn);
  };

  return (
    <section className="fixed w-full z-50 ">
      <div className="bg-white align-middle">
        <div className="md:max-w-7xl mx-auto items-center flex py-3 flex-row justify-between space-x-2 ">
          <span className="flex space-x-2">
            <Elementthree />
            <h1
              // src="/jumia.png"
              className="h-[40px] mt-1 cursor-pointer  text-3xl"
              // alt="logo"
              onClick={() => router.push("/")}
            >
              bclics
            </h1>
          </span>

          <div className="hidden lg:flex">
            <Search />
          </div>

          <span className="hidden md:inline">
            {session ? (
              <>
                <PermIdentityIcon className="h-10 my-auto" />
                <span className="my-auto  cursor-pointer" onClick={signOut}>
                  HI, {session.user.name}
                </span>
                <HelpOutlineIcon /> <span className="my-auto"> HELP</span>
              </>
            ) : (
              <button
                onClick={signIn}
                className=" text-primary border px-4 py-2 rounded-lg hover:text-white hover:bg-primary border-primary "
              >
                LOGIN / SIGN UP
              </button>
            )}
          </span>

          <div className="flex gap-2 items-center lg:hidden">
            <Search />

            <ShoppingCart items={cart.length} />
          </div>
          <div className="hidden lg:flex">
            <ShoppingCart items={cart.length} />
          </div>
        </div>
      </div>
    </section>
  );
}
