import { StringFormatOption } from "@sinclair/typebox";
import { Option, AllOptions } from "./Option";

const allOptionKeys = [
  // StringOptions
  "minLength",
  "maxLength",
  "pattern",
  "format",
  "contentEncoding",
  "contentMediaType",
  // ArrayOptions
  "uniqueItems",
  "minItems",
  "maxItems",
  // NumberOptions
  "exclusiveMinimum",
  "exclusiveMaximum",
  "multipleOf",
  "maximum",
  "minimum",
];

export const MinLength = (minLength: number): PropertyDecorator =>
  Option("minLength", minLength);
export const MaxLength = (maxLength: number): PropertyDecorator =>
  Option("maxLength", maxLength);
export const Pattern = (pattern: string): PropertyDecorator =>
  Option("pattern", pattern);
export const Format = (
  format:
    | "date-time"
    | "time"
    | "date"
    | "email"
    | "idn-email"
    | "hostname"
    | "idn-hostname"
    | "ipv4"
    | "ipv6"
    | "uri"
    | "uri-reference"
    | "iri"
    | "uuid"
    | "iri-reference"
    | "uri-template"
    | "json-pointer"
    | "relative-json-pointer"
    | "regex"
): PropertyDecorator => Option("format", format);
export const ContentEncoding = (
  contentEncoding: "7bit" | "8bit" | "binary" | "quoted-printable" | "base64"
): PropertyDecorator => Option("contentEncoding", contentEncoding);
export const ContentMediaType = (contentMediaType: string): PropertyDecorator =>
  Option("contentMediaType", contentMediaType);
export const UniqueItems = (uniqueItems: boolean): PropertyDecorator =>
  Option("uniqueItems", uniqueItems);
export const MinItems = (minItems: number): PropertyDecorator =>
  Option("minItems", minItems);
export const MaxItems = (maxItems: number): PropertyDecorator =>
  Option("maxItems", maxItems);
export const ExclusiveMinimum = (exclusiveMinimum: number): PropertyDecorator =>
  Option("exclusiveMinimum", exclusiveMinimum);
export const ExclusiveMaximum = (exclusiveMaximum: number): PropertyDecorator =>
  Option("exclusiveMaximum", exclusiveMaximum);
export const MultipleOf = (multipleOf: number): PropertyDecorator =>
  Option("multipleOf", multipleOf);
export const Maximum = (maximum: number): PropertyDecorator =>
  Option("maximum", maximum);
export const Minimum = (minimum: number): PropertyDecorator =>
  Option("minimum", minimum);
