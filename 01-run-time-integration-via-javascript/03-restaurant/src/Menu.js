import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-top: 50px;
  font-size: 25px;
`;

const Title = styled.h2`
  font-size: 30px;
`;

const Ol = styled.ol`
  padding: 0;
`;

const Li = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  max-width: 100%;
`;

const Box = styled.span`
  margin-left: 20px;
`;

const Cell = styled.span`
  display: inline-block;
  padding: 0 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border-radius: 12px;
  border: 1px solid black;
  font-size: 18px;
`;

export default function Menu({ menu, quantities, increase, decrease }) {
  //console.log("menu props: ", menu, quantities);
  return (
    <Container>
      <Title>Menu:</Title>
      <Ol>
        {menu?.length > 0 &&
          menu.map((menuItem) => (
            <Li>
              <span>
                <Cell style={{ width: "55px" }}>${menuItem.price}</Cell>
                <Cell>{menuItem.item}</Cell>
              </span>
              <Box>
                <Cell>
                  <Button
                    onClick={() => decrease(menuItem.item)}
                    disabled={quantities[menuItem.item] === 0}
                  >
                    -
                  </Button>
                </Cell>
                <Cell>{quantities[menuItem.item]}</Cell>
                <Cell>
                  <Button onClick={() => increase(menuItem.item)}>+</Button>
                </Cell>
                <Cell>{quantities[menuItem.item] * menuItem.price}</Cell>
              </Box>
            </Li>
          ))}
      </Ol>
    </Container>
  );
}

Menu.propTypes = {
  menu: PropTypes.array.isRequired,
  quantities: PropTypes.object.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};
