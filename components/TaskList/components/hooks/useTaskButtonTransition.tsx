import { type AnimationScope, useAnimate } from "framer-motion";
import { useEffect } from "react";
import {
  DEFAULT_TASKFORM_HEIGHT,
  TASKFORM_PADDING,
} from "@/components/Timer/constants";

const useTaskListButtonAnimation = (
  showAddForm: boolean,
  scope: AnimationScope<any>,
  formScope: AnimationScope<HTMLDivElement>,
  animate: any
) => {
  const [animateScope, animateForm] = useAnimate();

  useEffect(() => {
    const runAnimation = async (show: boolean) => {
      const formRef = formScope?.current;

      if (show && formRef) {
        const formHeight =
          formRef.getBoundingClientRect().height || DEFAULT_TASKFORM_HEIGHT;
        await animate(
          scope.current,
          {
            height: 32 + formHeight + TASKFORM_PADDING, // 2rem + formHeight + padding
            justifyContent: "flex-start",
          },
          { duration: 0.1 }
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
          { duration: 0.3 }
        );
        await animateForm(formScope.current, { opacity: 0 }, { duration: 0.2 });
      }
    };

    runAnimation(showAddForm);
  }, [showAddForm, animateScope, animateForm, scope, formScope, animate]);

  return { animateScope, animateForm };
};

export default useTaskListButtonAnimation;
