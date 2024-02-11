import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios[method](url, { ...body, ...props });

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (error) {
            setErrors(
                <div
                    className='mb-4 flex flex-col items-start justify-start w-full rounded-lg bg-red-100 p-4 text-sm  gap-1'
                    role='alert'
                >
                    <span className='font-medium text-3xl text-red-600'>Oops!</span>
                    <ul className=''>
                        {error?.response?.data?.errors.map((err) => (
                            <li key={err.field}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};