import { type Sizes } from "@/types/global";
import { type AnimationScope } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "styled-components";

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

      if (show && formRef) {
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
  }, [
    showAddForm,
    formAnimate,
    scope,
    formScope,
    animate,
    sizes.taskForm.taskFormHeight,
    sizes.taskForm.taskFormPadding,
  ]);
};

export default useTaskListButtonTransition;
