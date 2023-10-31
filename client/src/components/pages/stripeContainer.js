 import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import PaymentForm from 'paymentForm.js'


 const PUBLIC_KEY=""
 const stripeTestPromise=loadStripe(PUBLIC_KEY)
 
 const stripeContainer = () => {
   return (
     <Elements stripe={stripeTestPromise}>
       <PaymentForm/>
     </Elements>
   )
 }
 
 export default stripeContainer
 