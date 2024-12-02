# 1. Summary

- 라이브러리 자체가 방대하므로 여기서는 유즈 케이스에 맞게 사용한 부분만 기록함.
- 더 많은 기능들이 있으므로 계속해서 사용하면서 기록해나갈 예정

# 2. Motive

- 리액트 앱에 웹 애니메이션을 적용하는데 가장 편한 라이브러리이므로 사용함.

# 3. My use-cases

## 3-1. Basic Motion Props

- 기본적으로 motion.div의 props를 hook으로 구현하는 것에 초점을 둠
- 나중에는 해당 useTransitionHook을 switch로 하는것이 더 코드정리에 도움이 되지 않을까 싶음.

```
// TaskItem.tsx
const motionProps = useTaskItemTransition();
return (
    <motion.div onClick={onClickActive} {...motionProps}></motion.div>
)
```

```
//useTaskItemTransition
import { type MotionProps } from "framer-motion";

const useTaskItemTransition = (): MotionProps => {
  const variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };
  return variants;
};

export default useTaskItemTransition;

```

## 3-2. AnimatePresence

- exit 애니메이션을 구현하기 위해 사용.
- 3-1 exit animation prop은 해당 AnimatePresence wrapper가 있어야 동작함.

```
// taskList/index.tsx
<AnimatePresence>
    {getTasks.map((t) => (
        <Reorder.Item
        data-testid={`task-${t.id}`}
        key={`task-${t.id}`}
        value={t}>
            <TaskItem
            task={t}
            getSelectedTask={getSelectedTask}
            onClickDelete={onClickDelete(t)}
            onClickComplete={onClickComplete(t)}
            onClickActive={onClickActive(t)}
            />
        </Reorder.Item>
    ))}
</AnimatePresence>
```

## 3-3. Reorder

- 3-2에서 구현된 map으로 리스트 엘리먼트의 순서를 바꿀때 애니메이션을 넣어줌.
- axis="y" y축으로 순서 번경 values=values map 어레이 onReorder={onReorder} setState 펑션 혹은 추가적인 콜백이 있을때 사용
- 해당 부분은 애니메이션만을 지원하는 것으로, 추가적인 기능을 구현하기 위해서 [DnD Kit](https://docs.dndkit.com/) 사용을 권장함.
- 여기서는 추가적인 기능을 사용하지 않았으므로 해당 Reorder만으로 구현하였음.

```


// tasklist/index.tsx

  const onReorder = useCallback(
    (newOrderedTasks: TaskType[]) => {
      setTask(newOrderedTasks);
      putOrPostOrder(newOrderedTasks);
    },
    [putOrPostOrder, setTask],
  );

  return (
     <Reorder.Group axis="y" values={getTasks} onReorder={onReorder}>
        <AnimatePresence>
          {getTasks.map((t) => (
            <Reorder.Item
              data-testid={`task-${t.id}`}
              key={`task-${t.id}`}
              value={t}
            >
              <TaskItem
                task={t}
                getSelectedTask={getSelectedTask}
                onClickDelete={onClickDelete(t)}
                onClickComplete={onClickComplete(t)}
                onClickActive={onClickActive(t)}
              />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
  )


```

## 3-2. useAnimate

- animate 펑션을 scoped된 엘리먼트 하나 혹은 다수에 직접 트리거하기 위해 사용.
- 아래를 보면 상위 div와 form에 걸린 scope를 하나의 펑션에서 불러와서 사용하는 중.
- 기존 initial & exit에 더해 실행조건을 유저가 직접 트리거하기 위해 사용함. automatic cleanup이 되어있어 cleanup은 신경쓸 필요가 없다고 한다.

```
// TaskListController.tsx

const TaskListController = () => {
  const [showAddForm, flipTaskButton] = useToggle(false);

  const [scope, animate] = useAnimate();
  const [formScope] = useAnimate<HTMLDivElement>();
  useTaskListButtonTransition(showAddForm, scope, formScope, animate);

  return (
    <div ref={scope} className="motion-button">
      <button
        data-testid="tasklist-button"
        onClick={flipTaskButton}
        type="button"
        title="Click this for add new task"
      >
        <h3>Add New task</h3>
      </button>
      <div style={{ opacity: 0 }} ref={formScope}>
        {showAddForm && <TaskForm />}
      </div>
    </div>
  );
};
```

- 해당 코드에서 useAnimate는 taskForm이라는 tasklist를 컨트롤하는 맨 상위 div와 formScope라는 form 엘리먼트를 가져가고, 맨 상위 div에서 animate를 실행시킴. showAddForm의 변화로 애니메이션 조건이 설정되었음.
- 애니메이션 코드는 useTaskListButtonTransition 훅에 저장되어 있음.

```

// useTaskListButtonTransition.ts

const useTaskListButtonTransition = (
  showAddForm: boolean,
  scope: AnimationScope<HTMLDivElement>,
  formScope: AnimationScope<HTMLDivElement>,
  animate: any,
  formAnimate: any,
) => {
  const { sizes } = useTheme() as { sizes: Sizes };

  useEffect(() => {
    const runAnimation = async (show: boolean) => {
      const buttonRef = scope?.current;
      const formRef = formScope?.current;

      if (show) {
        const formHeight =
          formRef.getBoundingClientRect().height ||
          sizes.taskForm.taskFormHeight;
        await animate(
          buttonRef,
          {
            height: 32 + formHeight + sizes.taskForm.taskFormPadding, // 2rem + formHeight + padding
            justifyContent: "flex-start",
          },
          { duration: 0.1 },
        );
        await formAnimate(formRef, { opacity: 1 }, { duration: 0.2 });
        await window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      } else {
        await animate(
          scope.current,
          { height: "2rem", justifyContent: "center", marginBottom: 0 },
          { duration: 0.3 },
        );
        await formAnimate(formScope.current, { opacity: 0 }, { duration: 0.2 });
      }
    };

    runAnimation(showAddForm);
  })
  ....
};

```

- form이 열리고 닫히는 boolean 값이 따라 애니메이션 실행
- 열릴 시 -> 계산된 px만큼 버튼의 크기를 늘림, form 표현, 스크롤이벤트
- 닫힐 시 -> 폼 숨김, 고정된 taskButton의 크기로 줄어듬.

# 4. References

[framer-motion quickstart](https://motion.dev/docs/react-quick-start)
[framer-motion animatepresence](https://motion.dev/docs/react-animate-presence)
[framer-motion Reorder](https://motion.dev/docs/react-reorder)
[framer-motion useAnimate](https://motion.dev/docs/react-use-animate)
