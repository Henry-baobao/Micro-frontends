import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Menu from "./Menu";

const smallScreen = "@media screen and (max-width: 1080px)";

const Container = styled.div`
  display: flex;
  justify-content: space-around;

  ${smallScreen} {
    flex-direction: column;
    align-items: center;
  }
`;

const MenuColumn = styled.section`
  display: flex;
  max-width: 100%;
  flex-direction: column;

  ${smallScreen} {
    width: 100%;
  }
`;

const AbstractColumn = styled.section`
  max-width: 100%;
  ${smallScreen} {
    order: -1;
  }
`;

const Name = styled.h1`
  font-size: 40px;
  margin: 10px 0 20px;
`;

const Figure = styled.figure`
  margin: 0;
`;

const Img = styled.img`
  width: 500px;
  max-width: 100%;
  margin-bottom: 10px;
`;

const Caption = styled.figcaption`
  width: 500px;
  max-width: 100%;
  font-size: 30px;
`;

const Total = styled.div`
  align-self: flex-end;
  font-size: 30px;
  margin: 40px 0 0;
  ${smallScreen} {
    margin: 0;
  }
`;

const OrderButton = styled.button.attrs({ type: "button" })`
  align-self: flex-end;
  padding: 10px 15px;
  margin-top: 15px;
  border: none;
  font-size: 25px;
  background-color: #e79652;
`;

const initialQuantities = (menu) => {
  //console.log("initial from menu");
  return menu?.length > 0
    ? menu.reduce((acc, menuItem) => {
        return {
          ...acc,
          [menuItem.item]: 0,
        };
      }, {})
    : {};
};

export default function RestaurantDetail(props) {
  const { imageSrc, description, menu, name, imageDescription } = props;

  //lazy initializer, component will initial quantities->render
  const [quantities, setQuantities] = useState(() => initialQuantities(menu));

  //derived state, no-useless-state
  const total =
    Object.keys(quantities).length === 0
      ? 0
      : menu.reduce(
          (acc, menuItem) => acc + quantities[menuItem.item] * menuItem.price,
          0
        );

  //#region if we use this way, component will render->initial quantities->render again
  // const [quantities, setQuantities] = useState({});
  // useEffect(() => {
  //   //console.log("initial quantities: ", menu);
  //   menu?.length > 0 &&
  //     setQuantities(
  //       menu.reduce((acc, menuItem) => {
  //         return {
  //           ...acc,
  //           [menuItem.item]: 0,
  //         };
  //       }, {})
  //     );
  // }, []);
  //#endregion

  const submitOrder = () => {
    alert(`You have ordered these delicious food: \n
    ${JSON.stringify(quantities)}
    `);
  };

  const increase = (count) => (item) => {
    setQuantities((previousState) => ({
      ...previousState,
      [item]: previousState[item] + count,
    }));
  };

  const decrease = (count) => (item) => {
    setQuantities((previousState) => ({
      ...previousState,
      [item]: previousState[item] - count,
    }));
  };

  //console.log("render details: ");
  return (
    <Container>
      <MenuColumn>
        {Object.keys(quantities).length > 0 && (
          <Menu
            menu={menu}
            quantities={quantities}
            increase={increase(1)}
            decrease={decrease(1)}
          />
        )}
        <Total>Total: ${total}</Total>
        <OrderButton onClick={submitOrder}>Order now</OrderButton>
      </MenuColumn>
      <AbstractColumn>
        <Name>{name}</Name>
        <Figure>
          <Img src={imageSrc} alt={imageDescription} />
          <Caption>{description}</Caption>
        </Figure>
      </AbstractColumn>
    </Container>
  );
}
