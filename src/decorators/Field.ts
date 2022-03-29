import { TAny, TSchema, Type } from "@sinclair/typebox";
import TaskManager from "../internal/TaskManager";
import { parseType } from "../internal/utils/parseType";
import { SharedData, startSharedData } from "./ObjectSchema";

export type FieldData = {
  name: string;
  type: TSchema;
};

export type FieldOptions = {
  name?: string;
  optional?: boolean;
  readonly?: boolean;
};
export type GetType =
  | ((this: TAny) => TSchema | Function)
  | (() => TSchema | Function);

export function Field(
  getType?: GetType,
  options?: FieldOptions
): PropertyDecorator;
export function Field(options?: FieldOptions): PropertyDecorator;
export function Field(
  getType: GetType,
  options?: FieldOptions
): PropertyDecorator;

export function Field(...args: any[]): PropertyDecorator {
  let getType: GetType, options: FieldOptions;

  for (let arg of args) {
    if (typeof arg === "function") getType = arg;
    else if (typeof arg === "object") options = arg;
  }

  return (target, propKey) => {
    const tm = TaskManager.get<SharedData>(target.constructor, startSharedData);

    tm.addTask(1, (data) => {
      let type: Function | TSchema;

      if (getType)
        type = data.recursive
          ? getType.call(data.recursor)
          : (getType as any)();

      if (!type) type = Reflect.getMetadata("design:type", target, propKey);

      type = parseType(type, tm.sharedData.fieldOptions[String(propKey)]);

      if (options?.optional && options?.readonly)
        type = Type.ReadonlyOptional(type);
      else if (options?.optional) type = Type.Optional(type);
      else if (options?.readonly) type = Type.Readonly(type);

      const field = {
        name: options?.name || String(propKey),
        type,
      };

      data.fields.push(field);
    });
  };
}
