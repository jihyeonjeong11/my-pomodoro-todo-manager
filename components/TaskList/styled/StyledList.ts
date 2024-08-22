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
	form {
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background: #e0e0e0;
		border: 1px solid;
		border-radius: 1rem;
		padding: 2rem;

		label {
			font-size: 1rem;
			color: ${({ theme }) => `${theme.colors.timer.navBackground}`};
		}

		input {
			border: none;
			background: none;
			box-sizing: border-box;
			text-align: left;
			font-size: 2rem;
		}
	}
`;
