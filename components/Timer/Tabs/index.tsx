import { StyledNav } from "../styled/StyledTimer";

const Tabs: FC = ({ children }) => (
  <StyledNav data-testid="tab">{children}</StyledNav>
);

export default Tabs;
