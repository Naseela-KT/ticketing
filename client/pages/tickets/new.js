import { useState } from 'react';
import useRequest from '@/hooks/use-request';
import Router from 'next/router';

const NewTicket = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: {
            title,
            price,
        },
        onSuccess: () => Router.push('/'),
    });

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        doRequest();
    };

    return (
        <div className='w-full mt-32 flex justify-center items-center flex-col gap-10'>
            <h1 className='text-4xl font-bold text-black'>Create Ticket</h1>
            <form onSubmit={handleSubmit} className='w-full max-w-md'>
                <div className='w-full flex flex-col gap-2'>
                    <label className='text-lg font-medium text-gray-700'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-blue-500'
                        type='text'
                    />
                </div>
                <div className='w-full flex flex-col gap-2 mt-3'>
                    <label className='text-lg font-medium text-gray-700'>Price</label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        onBlur={onBlur}
                        className='border border-gray-300 px-4 py-2 rounded-sm focus:outline-none focus:border-blue-500'
                        type='text'
                    />
                </div>
                {errors && <div className='text-red-500 mt-2'>{errors}</div>}
                <button
                    type='submit'
                    className='mt-5 w-full bg-blue-600 py-2.5 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    Create Ticket
                </button>
            </form>
        </div>
    );
};

export default NewTicket;