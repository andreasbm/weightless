import { IInputBehaviorProperties, InputBehavior } from "../input/input-behavior";

export interface ITextareaBehaviorProperties extends IInputBehaviorProperties {

}

export abstract class TextareaBehavior extends InputBehavior implements ITextareaBehaviorProperties {

}