/**
 * All possible types for the textfield.
 * Compiled from https://www.w3schools.com/tags/att_input_type.asp
 */
export type TextfieldType =
	| "color" // Defines a color picker
	| "date" // Defines a date control (year, month, day (no time))
	| "datetime-local" // Defines a date and time control (year, month, day, time (no timezone)
	| "email" // Defines a field for an e-mail address
	| "file" // Defines a file-select field and a "Browse" button (for file uploads)
	| "hidden" // Defines a hidden input field
	| "month" // Defines a month and year control (no timezone)
	| "number" // Defines a field for entering a number
	| "password" // Defines a password field
	| "search" // Defines a text field for entering a search string
	| "tel" // Defines a field for entering a telephone number
	| "text" // Default. Defines a single-line text field
	| "time" // Defines a control for entering a time (no timezone)
	| "url" // Defines a field for entering a URL
	| "week" // Defines a week and year control (no timezone)
