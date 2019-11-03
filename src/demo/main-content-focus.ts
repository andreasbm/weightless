let mainContentStart: HTMLElement | null;

export function setMainContentStart($elem: HTMLElement | null) {
	mainContentStart = $elem;
}

export function focusMainContentStart() {
	if (mainContentStart != null) {
		mainContentStart.focus();
	}
}
