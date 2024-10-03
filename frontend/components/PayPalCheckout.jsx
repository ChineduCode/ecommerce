import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from "@/utils/context/cart/cartContext";
import axios from 'axios';

function Message({ content }) {
    return <p>{content}</p>;
}

export default function PayPalCheckout({ shippingPrice, grandPrice, session }) {
    const [message, setMessage] = useState("");
    const { state } = useCart();
    const [forceReRender, setForceReRender] = useState(false);

    const initialOptions = {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        "enable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    useEffect(() => {
        if (message) {
            setForceReRender(prev => !prev);
        }
    }, [message]);

    return (
        <div className="paypal-checkout-step">
            <h3>Select a payment method</h3>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    key={forceReRender}
                    style={{
                        shape: "rect",
                        color: 'gold', 
                        layout: "vertical", 
                        label: "paypal",
                    }}
                    createOrder={async () => {
                        setMessage('');
                        try {
                            const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/create`,
                                {
                                    taxPrice: 0,
                                    shippingPrice,
                                    grandPrice
                                },
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${session?.accessToken}`
                                    },
                                }
                            );

                            const orderData = response.data;

                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);

                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error('Error during PayPal API call:', error.response || error.message);
                            setMessage(`Could not initiate PayPal Checkout... ${error.message}`);
                        }
                    }}
                    onApprove={async (data, actions) => {
                        try {
                            const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/${data.orderID}/capture`,
                                {},
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${session.accessToken}`
                                    },
                                }
                            );

                            const orderData = response.data;
                            const errorDetail = orderData?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                await actions.restart();
                            } else if (errorDetail) {
                                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                            } else {
                                const transaction = orderData.purchase_units[0].payments.captures[0];
                                setMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                );
                                console.log("Capture result", orderData, JSON.stringify(orderData, null, 2));
                            }
                        } catch (error) {
                            console.error('Error during PayPal approval:', error.response || error.message);
                            setMessage(`Sorry, your transaction could not be processed... ${error.message}`);
                        }
                    }}
                />
            </PayPalScriptProvider>
            <Message content={message} />
        </div>
    );
}
