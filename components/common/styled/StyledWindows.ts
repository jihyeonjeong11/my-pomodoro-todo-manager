import { styled } from "styled-components";

const StyledMainWindow = styled.aside`
	background-color: white;
	position: absolute;
	inset: 0;
	top: auto;

	border-top-right-radius: 4rem;
	border-top-left-radius: 4rem;
	width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
	height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};

	@media (min-width: 768px) {
		left: 50%;
		transform: translateX(-50%);
	}

	/* @media (min-width: 992px) {
    width: ${({ theme }) => `${theme.sizes.pcWindow.width}px`};
    height: ${({ theme }) => `${theme.sizes.pcWindow.height}px`};
  } */
`;

export default StyledMainWindow;
