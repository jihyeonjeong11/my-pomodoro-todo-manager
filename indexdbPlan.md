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

make refresh handler in Window done

complete and connect logic appContainer done

finding rooms for refactoring...

2. seperate db logic from component to custom hook useIndexedDBControl

done

TaskForm
TaskItem
useTimerControl

1. find out useFastContext principle comparing with SOLID.

understood

```

// when components uses change of value, call context from parents and pass them.

export function FormDrivenTextInput( { label = '', value, onChange = (v) => {}}: Readonly<Props> ) {
  console.log(`Prop Driven ${label} input rendering`)
  return (
    <div className="field">
      {label ? <label>{label} : </label> : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
// when component is only presesntational, call directly.

export function SelfDrivenDisplayContainer() {
  console.log(`Self Driven Display Rendering`)
  return (
    <div className="container">
      <h4>'Self Driven' Display (NO RE-RENDERS - only children re-render on field changes)</h4>
        <SelfDrivenDisplay fieldName="first" label="First Name" />
        <SelfDrivenDisplay fieldName="last" label="Last Name" />
    </div>
  );
};


export function SelfDrivenDisplay({ fieldName = "", label }: Readonly<Props>) {
  console.log(`Self Driven ${label} display rendering`)
  const value = useAppFastContextFields([fieldName]);
  return (
    <div className="value">
      {label ? <label>{label} : </label> : null}
      <input value={value[fieldName].get as string} readOnly style={{backgroundColor: "#eee", cursor: 'auto', border: 0}}/>
    </div>
  );
};

pass what context you will use from parents and use it in children


### gpt answer

This code showcases a component structure that aligns with SOLID principles, particularly focusing on Single Responsibility Principle (SRP) and Dependency Inversion Principle (DIP).

Let's break it down:

1. Single Responsibility Principle (SRP):
SRP states that a class or function should have only one reason to change, i.e., it should be focused on one task.
In this case, both SelfDrivenDisplayContainer and SelfDrivenDisplay have clear, distinct responsibilities:
SelfDrivenDisplayContainer: Responsible for rendering the container of SelfDrivenDisplay components. Its task is just to structure the layout and organize child components.
SelfDrivenDisplay: Handles displaying a specific field’s value. Its responsibility is rendering a label and an input field with the value fetched from the context (useAppFastContextFields).
Each component has its own narrow focus, ensuring that changes in one part (e.g., display logic or structure) don’t affect the other.

2. Dependency Inversion Principle (DIP):
DIP emphasizes that high-level modules should not depend on low-level modules, both should depend on abstractions. It also stresses that abstractions should not depend on details, but details should depend on abstractions.
In your code:
The SelfDrivenDisplay component depends on the useAppFastContextFields hook to get field values, but it does so by passing field names as props (fieldName), not by hardcoding specific logic or implementation details.
This ensures that the actual implementation of where the data comes from (useAppFastContextFields) can be easily changed or mocked without modifying the SelfDrivenDisplay component itself.
The parent component (SelfDrivenDisplayContainer) abstracts what data each child will display by passing down the fieldName and label props. This way, the child component is dependent on abstract input (field names and labels) instead of needing to know where this data is coming from.
How this matches the SOLID principles:
SRP: Each component does one thing—SelfDrivenDisplayContainer manages the layout, and SelfDrivenDisplay handles rendering a specific field.
DIP: The child (SelfDrivenDisplay) does not directly depend on the data source but on a general input (fieldName) from the parent, making it easy to switch out data-fetching logic without altering the core display logic.
OCP (Open/Closed Principle): Both components are open for extension but closed for modification. You can extend SelfDrivenDisplayContainer by adding more fields, or even extend SelfDrivenDisplay for more complex rendering, without modifying existing logic.
```

later with refactoring works. 3. Find some bad namings

4. Find some bad implementations

5. consider using data handler components
   This will helps with fastcontext as reducers I believe.

6. Fix lint errors

7. Find some magic string and numbers and make them reusable.

8. CSS improvements.

9. seperate useLOcalDB and not(data not persists)
