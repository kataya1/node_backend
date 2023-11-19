adding global styles:
adding /src/styles/global.css
importing it by:

1. `import "../styles/global.css";` // in the front matter
2. `<link rel="stylesheet" href={import.meta.glob("../styles/global.css")} />` in the html of the .astro file

---

creating component
/src/components/
Button.astro:

```astro
---
// Allow passing a msg prop
const { msg } = Astro.props;
---

<button class="btn">
  {msg}
</button>
<style>
  .btn {
    background: blue;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
</style>
```

then import it into your shit
import

```
---
import Button from "../components/Button.astro";
---
```

`<Button msg="hello world" />`

if you wanna use jsx
This Astro integration enables server-side rendering and client-side hydration for your React components.

`npx astro add react`
(Optionally) Install all necessary dependencies and peer dependencies
(Also optionally) Update your astro.config.\* file to apply this integration
