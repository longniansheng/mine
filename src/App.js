import React from "react";
import styled from "styled-components";
import MineHorList from "./components/MineHorList";
import { useMineHooks, useContextMenuHooks } from "./hooks";

const Contaienr = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const {
    data: { mines, visited, gameOver },
    handleClick,
  } = useMineHooks();
  useContextMenuHooks();
  return (
    <>
      <Contaienr>
        {mines.map((item, idx) => {
          return (
            <MineHorList
              key={idx}
              list={item}
              x={idx}
              handleClick={handleClick}
              visited={visited}
            />
          );
        })}
      </Contaienr>
    </>
  );
}

export default App;
