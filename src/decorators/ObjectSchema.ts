import TaskManager from "../internal/TaskManager";
import { TAny } from "@sinclair/typebox";
import { FieldData } from "./Field";
import { AllOptions } from "./Option";

export type SharedData = {
  recursive?: string;
  recursor?: TAny;
  fields: FieldData[];
  fieldOptions: Record<string, Partial<AllOptions>>;
};

export const startSharedData = {
  fields: [],
  fieldOptions: {},
};

export const ObjectSchema = (): ClassDecorator => (target) => {
  const tm = TaskManager.get<SharedData>(target, startSharedData);

  // tm.addTask(0, (obj) => {});
};
