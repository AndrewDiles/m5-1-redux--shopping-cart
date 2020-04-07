import React from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { removeItem, removeXItems, addXItems } from '../actions';


const CartItems = ({ children, item, id, title, price }) => {
  // console.log('id: ', id);
  const dispatch = useDispatch();
  let removalQuantity = item.quantity || 0;
  const handleInputReduce = function (event) {
    removalQuantity = event.target.value;
  }
  let additionQuantity = 0;
  const handleInputIncrease = function (event) {
    additionQuantity =  parseInt(event.target.value);
  }
  return (
    <Wrapper>
      <ItemTop>
        <ItemName>
          {item.title}
        </ItemName>
        <button
          onClick={() =>
            dispatch(removeItem({ id, price}))
        }>
          X
        </button>
      </ItemTop>
      <ItemBottom>
        <div>
          Quantity: {item.quantity}
        </div>
        <FlexRow>
          <div>
            Add:
          </div>
          <StyledInput onChange={handleInputIncrease} type='number' min='0'/>
          <StyledButton
            onClick={(e) => {
              dispatch(addXItems({ id, title, price, additionQuantity}))
              e.target.parentNode.children[1].value = 0;
            }
          }>
            +
          </StyledButton>
          </FlexRow>
          <FlexRow>
          <div>
            Remove: 
          </div>
          <StyledInput onChange={handleInputReduce} type='number' min='0' max={item.quantity} placeholder = {item.quantity}/>
          <StyledButton
            onClick={(e) => {
              dispatch(removeXItems({ id, title, price, removalQuantity}))
              e.target.parentNode.children[1].value = item.quantity - e.target.parentNode.children[1].value; 
            }
          }>
            -
          </StyledButton>
        </FlexRow>
        
      </ItemBottom>
      {children}
    </Wrapper>
  );
};
const StyledButton = styled.button`
  color: white;
  background: #ff406e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
const StyledInput = styled.input`
  height: 20px;
  width: 30px;
  margin: 0 5px;
  text-align: center;
`
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
const ItemName = styled.div`
  font-weight: bold;
  font-size: 1.1em;
`
const ItemBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`
const ItemTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: dashed grey; */
  padding: 10px;
`;

export default CartItems;
