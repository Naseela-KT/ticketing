import useRequest from '@/hooks/use-request';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TicketShow = ({ ticket }) => {
    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => {
            console.log(order);
            router.push(`/orders/${order.id}`);
        },
    });

    return (
        <div class='w-full max-w-sm mx-auto mt-16 rounded-lg border border-gray-200 bg-white shadow p-4'>
            <div class='px-5 pb-5'>
                <h5 class='text-xl font-semibold tracking-tight text-gray-900'>{ticket.title}</h5>
                <div class='flex items-center justify-between'>
                    <span class='text-3xl font-bold text-gray-900'>${ticket.price}</span>
                    <button
                        onClick={() => doRequest()}
                        class='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

TicketShow.getInitialProps = async (context, client) => {
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`);
    return { ticket: data };
};

export default TicketShow;