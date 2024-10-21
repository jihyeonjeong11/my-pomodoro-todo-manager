const Tabs: FC = ({ children }) => (
  <nav data-testid="tab">
    <ul>{children}</ul>
  </nav>
);

export default Tabs;
