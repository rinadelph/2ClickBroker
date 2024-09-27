# React Hooks Usage Prompt

When using React Hooks in the 2Click Broker project:

1. Use `useState` for managing local component state.

2. Use `useEffect` for side effects, ensuring to clean up when necessary.

3. Use `useContext` to access context values without prop drilling.

4. Use `useCallback` to memoize functions, especially when passed as props to child components.

5. Use `useMemo` to memoize expensive computations.

6. Use `useRef` for mutable values that don't require re-renders.

7. Create custom hooks to encapsulate and reuse stateful logic across components.

8. Always list all dependencies in the dependency array of `useEffect`, `useCallback`, and `useMemo`.

9. Avoid using hooks inside loops, conditions, or nested functions.

10. Use the `useReducer` hook for complex state logic.

Example of a custom hook:

```typescript
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

Remember to follow the rules of hooks and maintain consistent naming conventions for custom hooks (always start with `use`).
