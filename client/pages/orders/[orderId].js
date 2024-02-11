import useRequest from '@/hooks/use-request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
    const router = useRouter();

    const [timeLeft, setTimeLeft] = useState(0);

    const { doRequest, errors } = useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id,
        },
        onSuccess: (payment) => router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, [order]);

    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }

    return (
        <div className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg text-center'>
            <p className='text-gray-700 mb-4'>Time left to pay: {timeLeft} seconds</p>
            <StripeCheckout
                token={({ id }) => doRequest({ token: id })}
                stripeKey='pk_test_51LoRfJSCVWH1zSTBE4YegRI4ExjzE9LcCLk1zgGrPqXvwVpkqX2WPCqEUpUUF78ZcfN0KwT4Q61V4dglrJB3MvQK00cw7bBRRi'
                amount={order.ticket.price * 100}
                email={currentUser.email}
            />
            {errors && <div className='text-red-500 mt-4'>{errors}</div>}
        </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order: data };
};

export default OrderShow;