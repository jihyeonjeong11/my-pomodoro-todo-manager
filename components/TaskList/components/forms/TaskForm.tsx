import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { useCallback, useState } from "react";

const TaskForm = () => {
	const {
		tasks: { get: getTasks, set: setTasks },
	} = useTaskWindows(["tasks"]);
	const [text, setText] = useState<string>("");

	const onSubmit = useCallback((e) => {
		console.log("called");
		e.preventDefault();
		setTasks([...getTasks, { title: text }]);
	}, []);

	return (
		<form
			onSubmit={onSubmit}
			onKeyDown={(e) => {
				console.log(e.key);
				e.key === "Enter" && onSubmit(e);
			}}
			role="presentation"
		>
			<input
				onChange={(e) => {
					e.stopPropagation();
					setText(e.target.value);
				}}
				placeholder="What's your task?"
				type="text"
			/>
		</form>
	);
};

export default TaskForm;
