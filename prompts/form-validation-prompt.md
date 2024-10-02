# Form Validation Prompt

When implementing form validation in the 2Click Broker project:

1. Use a validation library like Zod or Yup for schema-based validation.

2. Implement client-side validation for immediate user feedback.

3. Always implement server-side validation as well for security.

4. Display error messages near the relevant form fields.

5. Use descriptive error messages that guide the user on how to correct the input.

6. Implement real-time validation where appropriate (e.g., email format checking).

7. Disable the submit button until all required fields are valid.

8. Use appropriate input types (e.g., `type="email"` for email inputs) for built-in browser validation.

9. Implement custom validation logic for domain-specific rules.

10. Handle validation errors gracefully in your API routes.

Example using Zod:
