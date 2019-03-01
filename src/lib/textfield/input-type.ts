/**
 * All possible input types.
 * Compiled from https://www.w3schools.com/tags/att_input_type.asp
 */
export type InputType =
	| "button" // Defines a clickable button (mostly used with a JavaScript to activate a script)
	| "checkbox" // Defines a checkbox
	| "color" // Defines a color picker
	| "date" // Defines a date control (year, month, day (no time))
	| "datetime-local" // Defines a date and time control (year, month, day, time (no timezone)
	| "email" // Defines a field for an e-mail address
	| "file" // Defines a file-select field and a "Browse" button (for file uploads)
	| "hidden" // Defines a hidden input field
	| "image" // Defines an image as the submit button
	| "month" // Defines a month and year control (no timezone)
	| "number" // Defines a field for entering a number
	| "password" // Defines a password field
	| "radio" // Defines a radio button
	| "range" // Defines a range control (like a slider control)
	| "reset" // Defines a reset button
	| "search" // Defines a text field for entering a search string
	| "submit" // Defines a submit button
	| "tel" // Defines a field for entering a telephone number
	| "text" // Default. Defines a single-line text field
	| "time" // Defines a control for entering a time (no timezone)
	| "url" // Defines a field for entering a URL
	| "week" // Defines a week and year control (no timezone)
