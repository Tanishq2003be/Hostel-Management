import React from 'react'
import { CardElement,useElements,useStripe } from '@stripe/react-stripe-js'
import axios from "axios"


const CARD_OPTIONS={
    iconstyle:"solid",
    style:{
        base:{
             iconColor:"#c4f0ff",
             color:"#fff",
             fontWeight:500,
             fontFamily:"Roboto,Open Sans,Seoge UI,sans-serif",
             fontSize:"16px",
             fontSmoothing:"antialiased",
             ":-webkit-autofill":{color:"#fce883"},
             "::placeholder":{color:"#87bbfd"}

        },
        invalid:{
            iconColor:"#ffc7ee",
            color:"#ffc7ee"
        }
    }
} 


const paymentForm = () => {
    const [success,setSuccess]=useState(false);
    const stripe=useStripe()
    const elements=useElements()
    
    
    const handleSubmit=async (e)=>{
        e.preventDefault();

        const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:"card",
            card:elements.getElement(CardElement)
        })
    

    if(!error){
        try {
            const {id}=paymentMethod
            const response=await axios.post("http://localhost:4000/payment",{
                amount:1000,
                id
            })

            if(response.data.success){
                console.log("success");
                setSuccess(true);
            }
        } catch (error) {
            console.log("error",error);
        }
    }else{
        console.log(error.message)
    }
}


  return (
    <>
        {!success?
            <form onSubmit={handleSubmit}>
                <fieldset className='FomrGroup'>
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                </fieldset>
                <button>Pay</button>
            </form>
            :
          <div>
            <h1>You just paid your fees</h1>
          </div>
            } 
    </>
  )
}

export default paymentForm
