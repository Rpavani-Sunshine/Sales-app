import React, { useState, useEffect } from 'react'
import './Topsales.css'
import axios from 'axios'
import { SaleApp_API } from '../Config'
import sweetAlert from 'sweetalert2'

function Topsales() {
    const [allSales, setAllSales] = useState([])
    const header = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllSalesData = async () => {
        try {
            const salesList = await axios.get(SaleApp_API + "/getallsales",header)
            setAllSales(salesList.data.Result)
        } catch (error) {
            sweetAlert.fire({
                icon: "error",
                title: error.response.data.error_msg
            })
        }
    }

    useEffect(() => {
        getAllSalesData()
    }, []);

    return (
        <div className='container'>
            <h1 className='topsales-mobile text-center mt-5'>TOP 5 SALES</h1>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sales Id:</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Sale Amount</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {
                        allSales.sort((a,b)=>b.Quantity - a.Quantity).slice(0,5).map((sales,index) => {
                            return (
                                <tr key={sales._id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{sales._id}</td>
                                    <td>{sales.Product_Name}</td>
                                    <td>{sales. Quantity}</td>
                                    <td>{sales. Amount}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Topsales