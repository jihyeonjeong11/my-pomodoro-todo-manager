import type React from "react";
import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import TaskForm from "./components/forms/TaskForm";
import { StyledInnerList } from "@/components/TaskList/styled/StyledList";

// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
	const {
		tasks: { get, set },
	} = useTaskWindows(["tasks"]);

	return (
		<StyledInnerList>
			<TaskForm />
			{get.map((i) => {
				return <div>{i.title}</div>;
			})}
		</StyledInnerList>
	);
};

export default TaskList;
