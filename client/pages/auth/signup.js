import { useState } from 'react';
import Router from 'next/router';

import useRequest from '@/hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    };

    return (
        <form onSubmit={onSubmit} className='w-full h-screen bg-black flex justify-center items-center'>
            <div className='w-1/3 flex flex-col items-center bg-gray-50 p-10 gap-5 rounded-2xl shadow-lg'>
                <h1 className='text-4xl'>Sign Up</h1>
                <div className='flex flex-col w-full gap-2'>
                    <label className='text-3xl font-normal'>Email Address</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='px-4 py-2 border-2 border-gray-300 rounded-md '
                        type='text'
                    />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label className='text-3xl font-normal'>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='px-4 py-2 border-2 border-gray-300 rounded-md '
                        type='password'
                    />
                </div>
                {errors}
                <button className='w-full py-4 bg-blue-400 rounded-lg text-white font-bold'>Sign Up</button>
            </div>
        </form>
    );
};