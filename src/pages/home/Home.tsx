import './Home.css';
import { useQuery } from "@apollo/client"
import { Transactions_Query } from '../../graphql/queries'
import { TTransaction, TSortedTransaction } from '../../types'
import React, { useEffect, useState } from 'react';



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
      console.log(value)
    })
  })

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
        div.


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
            // <div className="data-daily" key={index} >
            //   <h2 className="data-daily__date">{transaction.date}</h2>

            //   <div className="data-daily__content">
            //     <div className="data-daily__content-id">

            //     </div>
            //     <div className="data-daily__content-data">
            //       <h3>{transaction.title}</h3>
            //       <h4>{transaction.status}</h4>
            //       <h4>{transaction.type}</h4>
            //       <h4>{transaction.description}</h4>
            //     </div>
            //   </div>

            //   <div className="data-daily__content">
            //     <div className="data-daily__content-id">

            //     </div>
            //     <div className="data-daily__content-data">

            //     </div>
            //   </div>
            // </div>
            ))
          }
          {/* <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div>

          <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div>

          <div className="data-daily">
            <h2 className="data-daily__date">12/12/2022</h2>

            <div className="data-daily__content">
              <div className="data-daily__content-id">

              </div>
              <div className="data-daily__content-data">

              </div>
            </div>
          </div> */}
        </section>
      </div>
    </main>
  )
}