import './Home.css';
import { useQuery, useLazyQuery, gql } from "@apollo/client"
import { Transactions_Query } from '../../graphql/queries'
import { TTransaction, TSortedTransaction, IFilter } from '../../types'
import { filters } from '../../constants'
import React, { useEffect, useState } from 'react';
import { stringify } from 'querystring';



export default function Home(): JSX.Element{
  const { data, loading, error } = useQuery(Transactions_Query)
  


  const [ groupedTransaction, setGroupedTransactions ] = useState([{date: '', data: []}])

  useEffect(()=>{
    if(data && data.allTransactions && loading == false){
      let res = data.allTransactions.reduce((ac:any,a:any) => {
        let key = a.date.split('/');
        key = `${key[0]}-${key[1]}-${key[2]}`;
        ac[key] = (ac[key] || []).concat(a);
        return ac;
        },{})
        res = Object.entries(res).map(([k,v]) => ({[k]:v}))
        setGroupedTransactions(res);
    }
  }, [data])

  groupedTransaction.forEach((entity: any)=>{
    const values  = Object.values(entity)["0"] as {}[]
    Object.values(values).forEach((value: any)=>{
      // console.log(value)
    })
  })


  /*====================================================*/
  /*=============================*/
  /* Handler For Pupular Filters */
  /*=============================*/
  const [ filter, setFilter ] = useState<{
    crieteria: string,
    value: string
  }>({
    crieteria: "type",
    value: "credit"
  })

  let Filter_Query = gql`
  query {
    allTransactions(filter: {
        ${filter.crieteria}: "${filter.value}"
    }) {
      status
      title
      description
      type
      amount
      currency
      date
    }
  }
  `
  const [ getSortedData, {loading: loadingState, data: actualData} ] = useLazyQuery(Filter_Query)



  const handleFilter = (receivedFilter: IFilter):void =>{
   
    console.log(receivedFilter)
    
    setFilter({ crieteria: receivedFilter.parameter.toLowerCase(), value: receivedFilter.value})
    
    getSortedData();

    console.log(filter);
    console.log(actualData)

    if(actualData && actualData.allTransactions){

      setTimeout(() => {
        let res = actualData.allTransactions.reduce((ac:any,a:any) => {
          let key = a.date.split('/');
          key = `${key[0]}-${key[1]}-${key[2]}`;
          ac[key] = (ac[key] || []).concat(a);
          return ac;
          },{})
          res = Object.entries(res).map(([k,v]) => ({[k]:v}))
          setGroupedTransactions(res);
         
      }, 10);
      console.log("i'm running")
    }
    
  
  }
 
 
  return(
    <main className="page">
      <div className="page__container">

        {/*===================*/}
        {/* Searchbar Section */}
        {/*===================*/}
        <form action="" className="page__search-form">
          <input type="text" />
          <button type="submit" >Search</button>
        </form>


        {/*================*/}
        {/* Filter Section */}
        {/*================*/}
        <section className="filter-section">
          <h2 className="centralize" >Popular Filters</h2>
          <div className="filter-section__filter-container">
            <div className="filter-section__filter-row">
            {
              filters.map((filter: IFilter, index: number)=>(
                <div key={index} onClick={()=>handleFilter(filter)} className="filter-section__filter-item">
                  <h3><span>{filter.parameter}</span>: <span>{filter.value}</span></h3>
                </div>
              ))
            }
            </div> 
          </div>
        </section>


        {/*=========================*/}
        {/* Transactin Data Section */}
        {/*=========================*/}
        <section className="data">
          {
            groupedTransaction && groupedTransaction.map((transaction: any, index: number)=>(      
              <div key={index} >
                <h2 className="data-daily__date" >{Object.keys(transaction)}</h2>
                {
                  Object.values(Object.values(transaction)[0] as {}[]).map((entity:any, innerIndex: number)=>(
                    <div key={innerIndex} className="data-daily__content">
                      <div className="data-daily__content-id">
                        <h2>{(innerIndex + 1)}</h2>
                      </div>
                      <div className="data-daily__content-data">
                        <h3><span>Title</span> - {entity.title}</h3>
                        <h4><span>Description</span> - {entity.description}</h4>
                        <h4><span>Amount</span> - {entity.amount}</h4>
                        <h4><span>Currency</span> - {entity.currency}</h4>
                        <h4><span>Status</span> - {entity.status}</h4>
                        <h4><span>Transaction type</span> - {entity.type}</h4>                    
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </section>
      </div>
    </main>
  )
}