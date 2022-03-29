import TaskManager from "../internal/TaskManager";
import { SharedData, startSharedData } from "./ObjectSchema";

export function Recursive(id?: string): ClassDecorator {
  return (target) => {
    TaskManager.get<SharedData>(target, startSharedData).sharedData.recursive =
      id || target.name;
  };
}
