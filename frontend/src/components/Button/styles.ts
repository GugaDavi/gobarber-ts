import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background-color: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0px;
  padding: 16px;
  color: #312e38;
  width: 100%;
  margin-top: 16px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#ff9000")};
  }
`;
