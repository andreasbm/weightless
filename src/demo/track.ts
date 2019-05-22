declare global {
	interface Window {
		gtag: any;
	}
}

/**
 * Tracks an event.
 * @param arguments
 * @param args
 */
export function track (...args: any[]) {
	window.gtag(...args);
}

/**
 * Tracks a cta event.
 * @param name
 */
export function trackCtaEvent (name: string) {
	track("event", name, {
		eventCategory: "Cta"
	});
}

/**
 * Tracks the get started event.
 */
export function trackGetStartedEvent () {
	trackCtaEvent("get-started");
}

/**
 * Tracks the github source event.
 */
export function trackGithubSourceEvent () {
	trackCtaEvent("github-source");
}

/**
 * Tracks the github stars event.
 */
export function trackGithubStarsEvent () {
	trackCtaEvent("github-stars");
}
