import React, { useState } from 'react'
import './Addsales.css'
import { SaleApp_API } from '../Config'
import axios from 'axios'
import sweetAlert from 'sweetalert2'
function Addsales() {
    const [sales, setSales] = useState({
        prod_name: '',
        quantity: 0,
        amount: 0
    });
    const header = {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    // Submit Functionality
    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(sales.prod_name!=='' && sales.quantity!==0 && sales.amount!==0){
                const resp=await axios.post(SaleApp_API+'/addsales',sales,header)
                if(resp.status===200){
                    sweetAlert.fire({
                        icon: "success",
                        title: resp.data.Success_Mssg
                    })
                }
                else{
                    sweetAlert.fire({
                        icon: "error",
                        title: resp.response.data.error_msg
                    })
                }
            }
            else{
                sweetAlert.fire({
                    icon: "error",
                    title:"All Fields are Required"
                })
            }
        } catch (error) {
            sweetAlert.fire({
                icon: "error",
                title: error.response.data.error_msg
            })
        }
    }
    return (
        <div className='container'>
            <h1 className='text-center mt-5'>ADD SALE ENTRY</h1>
            <div className="addsale-mobile shadow-sm p-3 mt-3 w-75 m-auto .bg-light-subtle">
                <form onSubmit={HandleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="prod_name" className="form-label">Product Name</label>
                        <input type="text" className="form-control shadow-sm fs-5 py-2" id="prod_name" name="prod_name" value={sales.prod_name} onChange={(e)=>setSales({...sales,prod_name : e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" className="form-control shadow-sm fs-5 py-2" id="quantity" name="quantity" value={sales.quantity} onChange={(e)=>setSales({...sales,quantity : e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control shadow-sm fs-5 py-2" id="amount" name="amount" value={sales.amount} onChange={(e)=>setSales({...sales,amount : e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Addsales