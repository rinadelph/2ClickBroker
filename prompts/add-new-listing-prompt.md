# Add New Listing Feature Prompt

When implementing or modifying the Add New Listing feature in the 2Click Broker project:

1. Use a multi-step form process for better user experience.

2. Implement the following steps:
   a. Select Primary Property Type
   b. Select Specific Property Type
   c. Choose Secondary Characteristics

3. Use the `AddNewListing` component in `components/listings/AddNewListing.tsx`.

4. Utilize Framer Motion for smooth transitions between steps.

5. Implement responsive design for various screen sizes.

6. Use custom UI components from `@/components/ui/` for consistent styling.

7. Manage state using React's `useState` hook for:
   - Current step
   - Selected primary type
   - Selected specific type
   - Selected characteristics

8. Use the following data structures:
   - `primaryTypes`: Array of primary property types
   - `specificTypes`: Object containing specific types for each primary type
   - `secondaryCharacteristics`: Object containing characteristics for each primary type

9. Implement form validation before submission.

10. Send form data to the API endpoint `/api/listings` upon submission.

11. Handle API responses and provide appropriate user feedback.

12. Implement error handling for form submission and API calls.

13. Consider adding a preview step before final submission.

14. Ensure accessibility compliance throughout the form process.

15. Implement proper TypeScript typing for all components and functions.

Example of state management in the component:
