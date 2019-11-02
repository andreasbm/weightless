let mainScrollTarget: HTMLElement | Window = window;

export function setMainScrollContainer(target: HTMLElement | Window) {
	mainScrollTarget = target;
}

export function getMainScrollContainer(): HTMLElement | Window {
	return mainScrollTarget;
}
