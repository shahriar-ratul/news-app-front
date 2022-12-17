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

const HomeProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [totalItems, setTotalItems] = useState(100);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);



const fetchData = async (perPage) => {
  const response = await axios
    .get(`/api/posts?page=${page}`)
    .then((res) => {
      setItems(res.data.data.items.articles);
      setTotalPages(10);
      setTotalItems(100);
      setPerPage(10);
      setLoading(false);
    })
    .catch((err) => {
      setError(true);
      setErrorMessage(err.message);
      setLoading(false);
    });
};

  useEffect(() => {
  }, [perPage])




  useEffect(() => {
    fetchData();
  }, []);

  const handlePageClick = async (current) => {
    // console.log(current.selected);

    let page = current.selected + 1;

    try {
      const { data } = await axios.get(`api/posts?page=${page}`);
      // console.log(data);
      setCurrentPage(page);
      setItems(res.data.data.items.articles);
      setLoading(false);
      // scroll to the top
      // window.scrollTo(0, 0)
    } catch {
      setError(true);
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="mt-10 lg:px-4 lg:w-full">
              <TitleBar title="News" />
              {loading ? (
                <div className="flex h-screen">
          <div className="m-auto">
              <ReactLoader height={120} width={120} />
          </div>
        </div>
               
              ) : (
                <div>
                    <div className="mt-10 md:w-full max-w-fit overflow-x-auto">
                    <ReactPaginate
                      disabledClassName={style.disabled}
                      previousLabel="previous"
                      nextLabel="next"
                      breakLabel="..."
                      breakClassName={style.pageNum}
                      breakLinkClassName={style.pageNum}
                      pageCount={totalPages}
                      pageRangeDisplayed={4}
                      marginPagesDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={style.pagination}
                      pageClassName={style.pageNum}
                      pageLinkClassName={style.pageNum}
                      previousClassName={style.pageNum}
                      previousLinkClassName={style.pageNum}
                      nextClassName={style.pageNum}
                      nextLinkClassName={style.pageNum}
                      activeClassName={style.active}
                      forcePage={currentPage}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
                    {items && items.map((item) => (

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
                  <div className="mt-10 md:w-full max-w-fit overflow-x-auto">
                    <ReactPaginate
                      disabledClassName={style.disabled}
                      previousLabel="previous"
                      nextLabel="next"
                      breakLabel="..."
                      breakClassName={style.pageNum}
                      breakLinkClassName={style.pageNum}
                      pageCount={totalPages}
                      pageRangeDisplayed={4}
                      marginPagesDisplayed={2}
                      onPageChange={handlePageClick}
                      containerClassName={style.pagination}
                      pageClassName={style.pageNum}
                      pageLinkClassName={style.pageNum}
                      previousClassName={style.pageNum}
                      previousLinkClassName={style.pageNum}
                      nextClassName={style.pageNum}
                      nextLinkClassName={style.pageNum}
                      activeClassName={style.active}
                      forcePage={currentPage}
                      
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProducts;
