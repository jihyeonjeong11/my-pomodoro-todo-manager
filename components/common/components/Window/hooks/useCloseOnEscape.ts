import { useCallback } from "react";

const useCloseOnEscape = (
	id: string,
	closeWithTransition: any
): {
	onKeyDownCapture: React.KeyboardEventHandler<HTMLElement>;
} => ({
	onKeyDownCapture: useCallback<React.KeyboardEventHandler<HTMLElement>>(({ key }) => key === "Escape" && closeWithTransition(), [id, closeWithTransition]),
});

export default useCloseOnEscape;
