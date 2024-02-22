import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SaleApp_API } from '../Config'
import sweetAlert from 'sweetalert2'

function Revenue() {
  const [revenue, setRevenue] = useState();
    const header = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllSalesData = async () => {
        try {
            const salesList = await axios.get(SaleApp_API + "/getallsales",header)
            let Count = 0;
            for(let i = 0; i < salesList.data.Result.length; i++) {
              Count = Count + salesList.data.Result[i].Amount
            }
            setRevenue(Count);
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
        <p className="text-center mt-5 fs-2" style={{fontFamily: 'Noto Sans, sans-serif'}}>TODAY'S REVENUE IS <strong>{revenue}</strong></p>
    </div>
  )
}

export default Revenue
