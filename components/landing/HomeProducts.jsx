/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import TitleBar from "./TitleBar";
import ReactPaginate from "react-paginate";
import style from "./paginate.module.css";
import ReactLoader from "../loader/ReactLoader";
import  findKey  from "lodash/findKey";
import  isNull  from "lodash/isNull";
import createPostStore from "@/Store/postStore";

const HomeProducts = () => {

  const posts = createPostStore((state) => state.posts);

  // console.log(posts);
  

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="mt-10 lg:px-4 lg:w-full">
              <TitleBar title="News" />
          
                <div>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
                    {posts.length > 0 && posts.map((item) => (

                    <Card
                      src={item.urlToImage}
                      author={item.author}
                      title={item.title}
                      description={item.description}
                      slug={item.title}
                      key={item.title}
                    />
                    ))}
                  </div>
                  
                </div>
  
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProducts;
