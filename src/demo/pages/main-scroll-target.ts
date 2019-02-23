let mainScrollTarget: HTMLElement | Window = window;

export function setMainScrollTarget (target: HTMLElement | Window) {
	mainScrollTarget = target;
}

export function getMainScrollTarget (): HTMLElement | Window {
	return mainScrollTarget;
}
