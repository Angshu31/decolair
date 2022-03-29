import { TSchema, Type } from "@sinclair/typebox";
import { AllOptions } from "../../decorators/Option";

export const parseType = (
  type: Function | TSchema,
  opts?: Partial<AllOptions>
): TSchema => {
  if (Array.isArray(type)) {
    if (type.length > 1) {
      return Type.Tuple(
        type.map((x) => parseType(x)),
        opts
      );
    } else {
      return Type.Array(parseType(type[0]), opts);
    }
  }

  if (typeof type === "function") {
    if (type === Number) return Type.Number(opts);
    else if (type === String) return Type.String(opts);
    else if (type === Boolean) return Type.Boolean(opts);
    else throw new TypeError(`Invalid type: ${type.name}`);
  }

  return type;
};
