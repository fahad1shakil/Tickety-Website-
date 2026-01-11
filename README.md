1. What is JSX, and why is it used? 
JSX is a syntax extension for JavaScript that allows you to write HTML-like code within JS. Although it looks like HTML, it is actually JavaScript.
Why it is used: It makes the code easier to write and cleaner to read. It allows you to use JS logic or variables directly inside your HTML.

2. What is the difference between State and Props?
Props (Properties): This is data passed from a Parent component to a Child component. The Child component cannot change the Props (it is Read-only).
State: This is the component's own internal data or memory. The component can change its own State as needed.
Main Difference: Props come from outside and cannot be changed, while State exists inside the component and can be changed.

3. What is the useState hook, and how does it work? 
useState is a React function (Hook) used to store State or data inside functional components.
How it works: It takes an initial value and returns two things:
The current data or value.
A function to update that value (setter function).

4. How can you share state between components in React? 
In React, data always flows from top to bottom (Parent to Child). To share data between two components, you use the "Lifting State Up" method.
This means you must move the State to the common parent of both components and then pass the data down to them via Props.

5. How is event handling done in React?
 It is similar to standard HTML, but there are a few differences:
Event names must be written in camelCase (e.g., write onClick instead of onclick).
You must pass the actual function definition, not a string.
To stop default browser behavior, you must explicitly call e.preventDefault() instead of using return false.
