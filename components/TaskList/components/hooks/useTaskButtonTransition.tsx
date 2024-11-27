import { type Sizes } from "@/types/global";
import { type AnimationScope, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "styled-components";

const useTaskListButtonAnimation = (
  showAddForm: boolean,
  scope: AnimationScope<any>,
  formScope: AnimationScope<HTMLDivElement>,
  animate: any,
) => {
  const { sizes } = useTheme() as { sizes: Sizes };
  const [animateScope, animateForm] = useAnimate();

  useEffect(() => {
    const runAnimation = async (show: boolean) => {
      const formRef = formScope?.current;

      if (show && formRef) {
        const formHeight =
          formRef.getBoundingClientRect().height ||
          sizes.taskForm.taskFormHeight;
        await animate(
          scope.current,
          {
            height: 32 + formHeight + sizes.taskForm.taskFormPadding, // 2rem + formHeight + padding
            justifyContent: "flex-start",
          },
          { duration: 0.1 },
        );
        await animateForm(formScope.current, { opacity: 1 }, { duration: 0.2 });
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
        await animateForm(formScope.current, { opacity: 0 }, { duration: 0.2 });
      }
    };

    runAnimation(showAddForm);
  }, [
    showAddForm,
    animateScope,
    animateForm,
    scope,
    formScope,
    animate,
    sizes.taskForm.taskFormHeight,
    sizes.taskForm.taskFormPadding,
  ]);

  return { animateScope, animateForm };
};

export default useTaskListButtonAnimation;
