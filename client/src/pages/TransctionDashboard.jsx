import React, { useEffect, useState } from "react";
import { TextInput, Select, Table } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import TableRowField from "../components/TableRowField";
import { fetchTransactionFromQuery } from "../services/http";
import TransactionStatitics from "../components/TransactionStatitics";
import TransactionBarChart from "../components/TransactionBarChart";
const TransctionDashboard = () => {
  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const tableHeads = [
    "ID",
    "Title",
    "Description",
    "Price",
    "Category",
    "Sold",
    "Image",
  ];

  const location = useLocation();
  const [totalSalePrice,setTotalSalePrice]=useState(0)
  const [totalSold,setTotalSold]=useState(0)
  const [totalNotSold,setTotalNotSold]=useState(0)
  const [dataOfBarChart,setDataOfBarChart]=useState([])
  const [searchFields, setSearchFields] = useState({
    searchTerm: "",
    month: -1,
  });
  const [transactionFields,setTransactionFields]=useState([])
  const navigate = useNavigate();
  const [categoriesFreq,setCategoriesFreq]=useState([])
  const [totalPages,setTotalPages]=useState(1)
  const [currentPage,setCurrentPage]=useState(1)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const monthFromUrl = urlParams.get("month");
    if (searchTermFromUrl){
      setSearchFields({
        ...searchFields,
        searchTerm: searchTermFromUrl,
      });
    }
    if(monthFromUrl){
        setSearchFields({
            ...searchFields,month:monthFromUrl
        })
    }
    const fetchAllTransactions = async () => {
      try {
        urlParams.set('page',currentPage)
        const searchQuery = urlParams.toString();
        const { data } = await fetchTransactionFromQuery(searchQuery);
        setTransactionFields(data.products);
        setTotalPages(data.totalPages)
        setTotalSalePrice(data.totalSale)
        setTotalNotSold(data.totalNotSoldItem)
        setTotalSold(data.totalSoldItem)
        setDataOfBarChart(data.dataOfBarChart)
        setCategoriesFreq(data.categoriesFreq)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllTransactions();
  }, [location.search,currentPage]);
  const handleSelectChange = (e) => {
      const urlParams = new URLSearchParams(location.search);
      setSearchFields({...searchFields,'month':e.target.value})
      urlParams.set("month", e.target.value);
      urlParams.set('searchTerm',searchFields.searchTerm)
      urlParams.set('page',searchFields.month===-1 ? currentPage : 1)
      const searchQuery = urlParams.toString();
      navigate(`/?${searchQuery}`);
    
  };
  const handleChange = (e) => {
    setSearchFields({ ...searchFields, searchTerm: e.target.value })
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchFields.searchTerm);
      urlParams.set('month',searchFields.month)
      urlParams.set('page',currentPage)
      const searchQuery = urlParams.toString();
      return navigate(`/?${searchQuery}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNextPage=()=>{
    if(currentPage<totalPages){
        const urlParams=new URLSearchParams(location.search)
        urlParams.set('page',currentPage)
        setCurrentPage(currentPage+1)
        const searchQuery=urlParams.toString()
        navigate(`/?${searchQuery}`);
    }
  }
  const handlePreviousPage=()=>{
    if(currentPage>1){
      const urlParams=new URLSearchParams(location.search)
        urlParams.set('page',currentPage)
        setCurrentPage(currentPage-1)
        const searchQuery=urlParams.toString()
        navigate(`/?${searchQuery}`);
    }
  }
  return (
    <div className=" flex flex-col">
      <div className="mx-auto my-4 block">
        <div className="flex items-center justify-center w-32 h-32 rounded-full text-black bg-white font-serif font-semibold mx-auto">
          Transaction
          <br />
          Dashboard
        </div>
      </div>
      <div className="mx-10">
        <form className="flex flex-row justify-between" onSubmit={handleSubmit}>
          {/* search */}
          <div>
            <div>
              <TextInput
                placeholder="Search Transaction"
                id="searchTerm"
                value={searchFields.searchTerm}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="max-w-md">
            
            <Select
              id="month"
              value={searchFields.month}
              onChange={handleSelectChange}
            >
              {months.map((month, index) => (
                <option value={index - 1} key={month}>
                  {month}
                </option>
              ))}
            </Select>
          </div>
        </form>
        <div className="mt-4">
          <Table>
            <Table.Head>
              {tableHeads.map((head) => (
                <Table.HeadCell key={head}>{head}</Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {transactionFields.map((transaction) => (
                <TableRowField key={transaction.id} transaction={transaction} />
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div className="flex justify-between mx-10 font-serif font-semibold text-white my-4">
        <div>
            <span>Page No:&nbsp;</span>
            <span>{searchFields.month>-1?(1):(currentPage)}</span>
        </div>
        <div>
            <button onClick={handlePreviousPage} disabled={currentPage===1} className="cursor-pointer">Previous&nbsp;</button>
            <span>-&nbsp;</span>
            <button onClick={handleNextPage} disabled={currentPage===totalPages} className="cursor-pointer">Next</button>
        </div>
        <div>
            <span>Item's On Page:&nbsp;</span>
            <span>{transactionFields.length}</span>
        </div>
      </div>
      {
        currentPage>=totalPages && <span className="text-red-600 mx-10 font-semibold font-serif text-sm">You can't Go to the next page if you have less than 10 Items</span>
      }
      <TransactionStatitics month={searchFields.month} totalSale={totalSalePrice} categoriesFreq={categoriesFreq} totalNotSoldItem={totalNotSold} totalSoldItem={totalSold}/>
      <TransactionBarChart month={searchFields.month} dataOfBarCharts={dataOfBarChart}/>
    </div>
  );
};

export default TransctionDashboard;
