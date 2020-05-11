import React from "react";
import styled from "styled-components";
import { FaBomb } from "react-icons/fa";
import { MdFlag, MdHelpOutline } from "react-icons/md";
import { MINE_ACTIVED, MINE_FLAG, MINE_DOUBT } from "../utils";

const Container = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => (props.visited ? "#fff" : "#eee")};
  border: 1px solid #fff;
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: blue;
  font-size: 26px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
  transition: all 0.5s;
`;
export default function MineItem(props) {
  const { item, x, y, handleClick, visited } = props;
  const isVisited = visited[`${x},${y}`] === MINE_ACTIVED;
  const flag = visited[`${x},${y}`] === MINE_FLAG;
  const doubt = visited[`${x},${y}`] === MINE_DOUBT;

  const renderIcon = () => {
    if (flag) {
      return <MdFlag color="red" />;
    } else if (isVisited) {
      if (item === 9) {
        return <FaBomb color="black" />;
      } else if (item > 0) {
        return item;
      } else {
        return "";
      }
    } else if (doubt) {
      return <MdHelpOutline />;
    } else {
      return "";
    }
  };

  return (
    <Container
      status={item}
      onMouseDown={(e) => {
        e.persist();
        handleClick(e, x, y);
      }}
      visited={isVisited}
    >
      {renderIcon()}
    </Container>
  );
}
