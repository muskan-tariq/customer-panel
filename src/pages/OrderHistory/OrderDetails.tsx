import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate= useNavigate();
  const { orders } = useCart();

  // Find the specific order
  const order = orders.find(o => o.id === orderId);
  
  console.log('OrderDetails - orderId:', orderId);
  console.log('OrderDetails - orders:', orders);
  console.log('OrderDetails - found order:', order);

  return (
    // Rest of the component
  );
};

export default OrderDetails;