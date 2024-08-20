import { styled } from "styled-components";

const StyledMainWindow = styled.aside`
	background: ${({ theme }) => `${theme.colors.timer.navBackground}`};
	position: absolute;
	inset: 0;
	top: auto;

	border-top-right-radius: 4rem;
	border-top-left-radius: 4rem;
	width: 100vw;
	height: 100vw;
	padding: 50px 25px;

	@media (min-width: 768px) {
		left: auto;
		right: auto;
		width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
		height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
	}

	/* @media (min-width: 992px) {
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  } */
`;

export default StyledMainWindow;
