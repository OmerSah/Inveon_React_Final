import React, { useState } from 'react'
import TopLogin from './TopLogin'
import YourOrder from './YourOrder'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../Common/Input'

const CheckOutTwo = () => {

    const methods = useForm({})

    const onSubmit = methods.handleSubmit(data => {
        console.log(data)
    })

    const fields = [
        'firstName',
        'lastName',
        'phone',
        'email',
        'cardNumber',
        'expiryMonth',
        'expiryYear',
        'cvv'
    ];

    const labels = {
        'firstName':'Adınız',
        'lastName':'Soyadınız',
        'phone':'Telefon',
        'email':'Adresiniz',
        'cardNumber':'Numarası',
        'expiryMonth':'Ayı',
        'expiryYear':'Yılı',
        'cvv':'CVV',
    }
        
    return (
        <>
            <section id="checkout_two" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <TopLogin />
                        <div className="col-lg-12">
                            <div className="checkout_area_two">
                                <FormProvider {...methods}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="checkout_form_area">
                                                <h3>Ödeme Bilgileri</h3>
                                                <form onSubmit={e => e.preventDefault()} noValidate>
                                                    <div className="row">
                                                        {fields.map((data, index) => (
                                                            <Input key={index}
                                                                label={labels[data]}
                                                                type="text"
                                                                id={data}
                                                                name={data}
                                                            />
                                                        ))
                                                        }
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                        <YourOrder />
                                    </div>
                                </FormProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CheckOutTwo