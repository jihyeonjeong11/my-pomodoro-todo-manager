## 1. full width children.

a. display: block(default behavior)

```
// html
<div class="parent">
  <div class="child">Child 1</div>
  <div class="child">Child 2</div>
</div>
```

```

.parent {
  border: 1px solid black;
}

.child {
  background: lightblue;
  /* No width specified, block elements fill the parent’s width */
}

```

b. display: flex

```
.parent {
  display: flex;
  flex-direction: column; /* Or row, depending on your layout */
  border: 1px solid black;
}

.child {
  background: lightgreen;
  align-selt: stretch;
}
```

c: display: grid

```
.parent {
  display: grid;
  grid-template-columns: 1fr; /* 1 fraction unit: fill the available space */
  border: 1px solid black;
}

.child {
  background: lightcoral;
  /* No width specified, grid items expand to fill the grid column */
}
```

## 2. grid for Row ordered items

```
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      max-width: 24rem;
      gap: 0.5rem;
```
