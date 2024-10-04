https://github.com/toddbluhm/env-cmd#readme
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

make Loading wrapper reusing Window -> done

change of plan.

Write test first! +
make db handler CRUD
-> create a wrapper React.children and handle it there.
AppContainer from DaedalOS

session: {
reorder: 01237...
add, delete, reorder
activeId: id
add, delete, activate, complete.
}

can make a wrapper for timer and tasklist logic to make them interactable

ex) change selected task -> stop timer(useTimerControl) -> save remaining time(useTasklistControl)

responsibilities

1. tab
   change tab
   change initial timer

2. clock
   play tick
   complete task
   start/stop timer

3. tasklist
   taskCRUD
   activate/reactivate task

make refresh handler in Window

complete and connect logic in Window
