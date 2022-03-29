import { Type } from "@sinclair/typebox";
import { SharedData, startSharedData } from "./decorators/ObjectSchema";
import TaskManager from "./internal/TaskManager";

export const getObjectSchema = (SchemaClass: { new (...args: any[]): any }) => {
  const tm = TaskManager.get<SharedData>(SchemaClass, startSharedData);

  if (tm.sharedData.recursive) {
    return Type.Rec(
      (self) => {
        tm.sharedData.recursor = self;

        tm.runTasks();

        return Type.Object(
          tm.sharedData.fields.reduce(
            (acc, field) => ({ ...acc, [field.name]: field.type }),
            {}
          )
        );
      },
      { $id: tm.sharedData.recursive }
    );
  }

  tm.runTasks();

  return Type.Object(
    tm.sharedData.fields.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.type }),
      {}
    )
  );
};
