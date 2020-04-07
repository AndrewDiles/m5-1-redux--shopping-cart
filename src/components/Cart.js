import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { clearCart } from '../actions';


import CartItems from './CartItems';
import Button from './Button';
import { useSelector } from 'react-redux';
import { getStoreItemArray } from '../reducers';

const Cart = () => {
  const storeItems = useSelector(getStoreItemArray);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  
  // const itemNum = 0;
  let totalPrice = 0;
  if (storeItems.length > 0) {
    let sum = 0;
    storeItems.forEach((item) => {
      // console.log('figuring out price: ', item);
      sum += item.quantity*item.price;
    })
    totalPrice = sum/100;
  }
  // const totalPrice = 14.92;
  let suffix = 'items';
  if (storeItems.length === 1) suffix = 'item';
  else if (storeItems.length < 1) suffix = 'items in your cart';

  // console.log('state looks like> ', state);
  // console.log('storeItems looks like> ', storeItems);
  return (
    <Wrapper1>
      <Wrapper2>
        <CartTop>
          <YourCart>
            Your Cart
            {storeItems.length > 0 ? (
            <ClearButton
            onClick={() =>
              dispatch(clearCart())
            }
            >
              Empty Cart
            </ClearButton>
            ) : (null)
            }
          </YourCart>
          <ItemCount>
            {storeItems.length} {suffix}
          </ItemCount>
          <ItemWrapper
          length = {storeItems.length}
          >
            {storeItems.length > 0 && storeItems.map((item) => {
              return (
              <CartItems
              key = {item.id}
              id = {item.id}
              item = {item}
              title = {item.title}
              price = {item.price}
              />
              )
            })}
          </ItemWrapper>
        </CartTop>

        <CartBase>
          <Total>
            <h4>
              Total: 
            </h4>
            <Bold>
              ${totalPrice}
            </Bold>
          </Total>
          <Button>
            Purchase
          </Button>
        </CartBase>
      </Wrapper2>
    </Wrapper1>
  );
};
const ClearButton = styled.button`
  background-color: maroon;
  color: white;
  border-radius: 12px;
  border: none;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;


`
const ItemWrapper = styled.div`
  border: ${props => props.length > 0 ? 'dashed grey':'none'};
`
const Total = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-right: 100px;
`
const CartTop = styled.div`

`
const Bold = styled.p`
  font-weight: bold;
  margin-left: 5px;
  font-size: 1.2em;
`
const ItemCount = styled.h3`
  padding: 10px;
`

const YourCart = styled.h2`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const CartBase = styled.span`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  white-space: nowrap;
`
const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background-color: purple;
  height: 99vh;
`
const Wrapper1 = styled.div`
  
  color: white;
  height: 100vh;
  /* padding: 20px; */
  /* margin: 0 8px; */
  padding: 0 0 8px 8px;
  border-bottom: 3px dashed #ff406e;
`;

export default Cart;
