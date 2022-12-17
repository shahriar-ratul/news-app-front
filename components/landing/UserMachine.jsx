import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import TitleBar from "./TitleBar";
import ReactPaginate from "react-paginate";
import style from "./paginate.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ReactLoader from "../loader/ReactLoader";
import createLanguageStore from "@/Store/languageStore";
import findKey  from "lodash/findKey";

const UserMachine = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const token = Cookies.get("token");


  const [machineTitles, setMachineTitles] = useState([]);
  const values = createLanguageStore((state) => state.languages)

  useEffect(() => {
    if (values.length > 0) {
      setMachineTitles(values[findKey(values, { key: 'user_fav_machine' })])
    }
  }, [values])

  useEffect(() => {
    if(!token){
        router.push('/login')
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const fetchData = async () => {
      const response = await axios
        .get(`/api/user/fav/machine`)
        .then((res) => {
        //   console.log(res.data.data.machines);
          setCurrentPage(res.data.meta.current_page -1);
          setItems(res.data.data.machines);
          setTotalPages(res.data.meta.last_page);
          setTotalItems(res.data.meta.total);
          setPerPage(res.data.meta.per_page);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.message);
          setLoading(false);
        });
    };
    fetchData();
  }, [router, token]);

  const handlePageClick = async (current) => {
    // console.log(current.selected);

    let page = current.selected + 1;

    try {
      const { data } = await axios.get(`api/user/fav/machine?page=${page}`);
      // console.log(data);
      setCurrentPage(data.meta.current_page -1);
      setItems(data.data.machines);
      setTotalPages(data.meta.last_page);
      setTotalItems(data.meta.total);
      setPerPage(data.meta.per_page);
      setLoading(false);
      // scroll to the top
      // window.scrollTo(0, 0)
    } catch {
      setError(true);
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };

  // console.log(currentPage);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="lg:flex lg:-mx-2">
            <div className="mt-10 lg:px-4 lg:w-full">
            <TitleBar title={ machineTitles.value ? machineTitles.value : machineTitles.value_en} />
              {loading ? (
                <div className="flex h-screen">
          <div className="m-auto">
              <ReactLoader height={120} width={120} />
          </div>
        </div>
              ) : (
                items.length > 0 ? (
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
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
                    {items.length > 0 && items.map((item) => (

                    <Card
                      src={item.image}
                      category={item.category.label}
                      sold={item.status === "sold" ? true : false}
                      price={item.price}
                      name={item.title}
                      id={item.ref_no}
                      manufacturer={item.manufacturer.label}
                      status={item.status}
                      year={item.year_of_installation}
                      key={item.id}
                      slug={item.slug}
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
                ) : (
                  <div className="flex h-fit">
                    <div className="m-auto">
                      <h1 className="text-3xl font-bold text-center">
                        No machine found
                      </h1>
                    </div>
                  </div>
                )

              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserMachine;
