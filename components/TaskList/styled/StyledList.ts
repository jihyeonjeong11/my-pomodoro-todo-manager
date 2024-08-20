import { styled } from "styled-components";

export const StyledList = styled.section`
	margin-top: 1.5rem;
	text-align: center;
	color: white;
	justify-content: center;
	align-items: center;
	display: flex;

	form {
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;

		label {
			font-size: 1.5rem;
			color: ${({ theme }) => `${theme.colors.timer.text}`};
		}

		input {
			text-align: center;
		}
	}
`;

export const StyledInnerList = styled(StyledList)`
	label {
		font-size: 2rem;
		color: ${({ theme }) => `${theme.colors.timer.text}`};
	}
`;
