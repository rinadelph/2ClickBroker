# TypeScript Best Practices Prompt

When writing TypeScript code for the 2Click Broker project:

1. Use strict type checking. Always define types for variables, function parameters, and return values.

2. Leverage TypeScript's advanced types like union types, intersection types, and generics when appropriate.

3. Use interface for object shapes and type for unions or intersections.

4. Avoid using `any` type. Use `unknown` if the type is truly unknown.

5. Utilize optional chaining (`?.`) and nullish coalescing (`??`) operators to handle potential undefined or null values.

6. Use `readonly` for properties that shouldn't be mutated.

7. Leverage TypeScript's built-in utility types like Partial<T>, Required<T>, Pick<T>, etc.

8. Use `enum` for a fixed set of constants.

9. Always use `const` for variables that won't be reassigned, and `let` for those that will.

10. Use async/await for asynchronous operations instead of raw promises.

Example:

```typescript
interface User {
  readonly id: string;
  name: string;
  email: string;
  age?: number;
}

function getUserInfo(user: User): string {
  const age = user.age ?? 'Not provided';
  return `${user.name} (${age})`;
}

const fetchUserData = async (id: string): Promise<User | null> => {
  // Implementation here
};
```

Remember to maintain consistent naming conventions and follow the project's established patterns.
