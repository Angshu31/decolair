import { Type } from "@sinclair/typebox";
import { Field, ObjectSchema } from ".";
import { Recursive } from "./decorators/Recursive";
import { Format } from "./decorators/SpecificOptions";
import { getObjectSchema } from "./getSchema";

@ObjectSchema()
@Recursive()
export class Node {
  @Field()
  @Format("email")
  email: string;

  @Field(() => Type.Array(this))
  children: Node[];
}

console.log(getObjectSchema(Node).$defs.self.properties);
