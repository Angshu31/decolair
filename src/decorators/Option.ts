import {
  ArrayOptions,
  NumberOptions,
  ObjectOptions,
  StringFormatOption,
  StringOptions,
} from "@sinclair/typebox";
import TaskManager from "../internal/TaskManager";
import { SharedData, startSharedData } from "./ObjectSchema";

export type AllOptions = StringOptions<StringFormatOption> &
  ArrayOptions &
  NumberOptions &
  ObjectOptions;

// TODO: Extend this and create separate decorators for each option

export function Option<T extends keyof AllOptions>(
  name: T,
  value: AllOptions[T]
): PropertyDecorator;
export function Option(options: Partial<AllOptions>): PropertyDecorator;

export function Option(...args: any[]): PropertyDecorator {
  return (target, propKey) => {
    const tm = TaskManager.get<SharedData>(target.constructor, startSharedData);

    tm.addTask(0, (data) => {
      const options =
        data.fieldOptions[String(propKey)] ||
        (data.fieldOptions[String(propKey)] = {});

      if (args.length === 1) {
        Object.assign(options, args[0]);
      } else {
        options[args[0]] = args[1];
      }
    });
  };
}
