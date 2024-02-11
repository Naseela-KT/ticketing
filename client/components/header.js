import Link from 'next/link';

export default ({ currentUser }) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser && { label: 'Sell Tickets', href: '/tickets/new' },
        currentUser && { label: 'My orders', href: '/orders' },
        currentUser && { label: 'Sign Out', href: '/auth/signout' },
    ]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }) => {
            return (
                <li key={href}>
                    <Link href={href}>{label}</Link>
                </li>
            );
        });

    return (
        <nav className='bg-green-50 px-5 flex justify-between py-4'>
            <Link className='font-bold text-xl' href='/'>
                Ticketing
            </Link>

            <div className='flex justify-end'>
                <ul className='flex items-center gap-5'>{links}</ul>
            </div>
        </nav>
    );
};