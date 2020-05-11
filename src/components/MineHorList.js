import React from "react";
import styled from "styled-components";
import MineItem from "./MineItem";

const Container = styled.div`
  display: flex;
  height: 40px;
`;

export default function MineHorList(props) {
  const { list, x, handleClick, visited } = props;
  return (
    <Container>
      {list.map((item, idx) => (
        <MineItem
          item={item}
          key={idx}
          x={x}
          y={idx}
          handleClick={handleClick}
          visited={visited}
        />
      ))}
    </Container>
  );
}
