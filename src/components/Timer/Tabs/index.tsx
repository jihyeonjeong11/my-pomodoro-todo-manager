import React from "react";
import { styled } from "styled-components";

const Tabs: FC = ({ children }) => {
  return <StyledTabs>{children}</StyledTabs>;
};

export default Tabs;

const StyledTabs = styled.nav``;
