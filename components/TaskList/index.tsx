import type React from 'react';
import { useState } from 'react';
import { useTaskWindows } from '@/components/contexts/TaskwindowContext';
import dynamic from 'next/dynamic';

const WindowLoader = dynamic(
  () => import('@/components/common/components/WindowLoader')
);
// make useResizeObserver hook for 768px disable dragging or else!
const TaskList: React.FC = () => {
  const {
    taskWindows: { get: getTaskWindows, set: setTaskWindows },
  } = useTaskWindows(['taskWindows']);

  console.log(getTaskWindows);

  const setMainTaskWindow = () => {
    setTaskWindows({ ...getTaskWindows, main: {} });
  };

  const [tasks, setTasks] = useState<{ title: string }[]>([]);
  const [text, setText] = useState<string>('');
  return (
    <>
      <button type="button" onClick={setMainTaskWindow}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTasks([{ title: text }]);
          }}
        >
          <label htmlFor={tasks[0]?.title}>
            {tasks.length > 0 ? tasks[0].title : 'Type your tasks!'}
          </label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </form>
      </button>
      <WindowLoader />
    </>
  );
};

export default TaskList;
