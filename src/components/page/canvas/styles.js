import styled from "styled-components";

export const Main = styled.div`
  canvas {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
  }
`;
