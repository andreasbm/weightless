declare global {
	interface Window {
		ga: any;
	}
}

/**
 * Tracks an event.
 * @param type
 * @param options
 */
export function trackEvent (type: string,
                            options?: Partial<{hitType: string, eventCategory: string, eventAction: string}>) {
	window.ga(type, options);
}

/**
 * Tracks a cta event.
 * @param eventAction
 */
export function trackCtaEvent (eventAction: string) {
	trackEvent("send", {
		hitType: "event",
		eventCategory: "Cta",
		eventAction
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
