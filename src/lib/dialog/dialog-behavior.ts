import { property } from "lit-element";
import { IOverlayBehaviorBaseProperties, IOverlayBehaviorProperties, OverlayBehavior } from "../overlay/overlay-behavior";
import { CUBIC_BEZIER } from "../util/constant/animation";

export enum DialogSize {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
	AUTO = "auto",
	FULLSCREEN = "fullscreen"
}

export interface IDialogBaseProperties extends IOverlayBehaviorBaseProperties {
	size: DialogSize | null;
	scrollable: boolean;
	fixed: boolean;
}

export interface IDialogBehaviorProperties extends IDialogBaseProperties, IOverlayBehaviorProperties {
}

export interface IDialogConfig extends Partial<IDialogBaseProperties> {
}

export const defaultDialogConfig: IDialogConfig = {
	size: DialogSize.MEDIUM,
	blockScrolling: true,
	backdrop: true,
	duration: 200,
	persistent: false,
	fixed: true
};

/**
 * Button behavior.
 */
export abstract class DialogBehavior<R, C extends Partial<IDialogBehaviorProperties>> extends OverlayBehavior<R, C> implements IDialogBehaviorProperties {

	// The size of the dialog
	@property({type: String, reflect: true}) size: DialogSize | null = null;

	// Whether the dialog is scrollable or not
	@property({type: Boolean, reflect: true}) scrollable = false;

	// Whether the dialog is fixed or not
	@property({type: Boolean, reflect: true}) fixed = false;

	// Dialog element
	protected abstract $dialog: HTMLElement;

	// Backdrop element
	protected abstract $backdrop: HTMLElement;

	/**
	 * Animates the dialog in.
	 */
	protected animateIn () {
		const animationConfig: KeyframeAnimationOptions = {
			...this.animationConfig,
			fill: "both"
		};

		// We only want to run the setup function once.
		let ready = false;
		const setup = () => {
			if (ready) return;
			ready = true;
			this.didShow();
		};

		// The animation of the dialog
		const dialogAnimation = this.$dialog.animate(<Keyframe[]>[
			{transform: `scale(0.9) translate(0, 30px)`, opacity: `${0}`},
			{transform: `scale(1) translate(0, 0)`, opacity: `${1}`}
		], animationConfig);

		// The animation of the backdrop
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${0}`},
			{opacity: `${1}`}
		], animationConfig);

		dialogAnimation.onfinish = setup;
		backdropAnimation.onfinish = setup;

		this.currentInAnimations.push(dialogAnimation, backdropAnimation);
	}

	/**
	 * Animates the dialog out.
	 * @param result
	 */
	protected animateOut (result?: R) {
		const animationConfig: KeyframeAnimationOptions = {
			duration: this.duration,
			easing: CUBIC_BEZIER,
			fill: "both"
		};

		// Cleans up the component and animation. We only want to run this function once.
		let cleaned = false;
		const cleanup = () => {
			if (cleaned) return;
			cleaned = true;

			this.resolve(result);
			this.didHide(result);
		};

		// The animation of the dialog.
		const dialogAnimation = this.$dialog.animate(<Keyframe[]>[
			{transform: `translateY(0)`, opacity: `${1}`},
			{transform: `translateY(30px)`, opacity: `${0}`}
		], animationConfig);

		// The animation of the backdrop.
		const backdropAnimation = this.$backdrop.animate(<Keyframe[]>[
			{opacity: `${1}`},
			{opacity: `${0}`}
		], animationConfig);

		dialogAnimation.onfinish = cleanup;
		backdropAnimation.onfinish = cleanup;

		this.currentOutAnimations.push(dialogAnimation, backdropAnimation);
	}
}