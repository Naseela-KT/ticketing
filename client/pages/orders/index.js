const OrderIndex = ({ orders }) => {
  return (
      <ul className='divide-y divide-gray-300'>
          {orders.map((order) => (
              <li key={order.id} className='py-3'>
                  <div className='flex items-center justify-between'>
                      <div className='text-lg font-semibold'>{order.ticket.title}</div>
                      <div className={`text-${order.status === 'complete' ? 'blue' : 'red'}-500 font-bold`}>
                          {order.status}
                      </div>
                  </div>
              </li>
          ))}
      </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;