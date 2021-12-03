import type * as ts from "typescript"

export type TypeObject =
  | PrimitiveTO
  | LiteralTO
  | SpecialTO
  | ArrayTO
  | TupleTO
  | ObjectTO
  | UnionTO
  | EnumTO
  | UnsupportedTO

type TypeNameTrait = {
  typeName: string
}

export type PrimitiveTO = {
  __type: "PrimitiveTO"
  kind: "string" | "number" | "bigint" | "boolean"
}

export type SpecialTO = {
  __type: "SpecialTO"
  kind: "null" | "undefined" | "any" | "unknown" | "never" | "void" | "Date"
}

export type LiteralTO = {
  __type: "LiteralTO"
  value: unknown
}

export type ArrayTO = TypeNameTrait & {
  __type: "ArrayTO"
  child: TypeObject
}

export type TupleTO = TypeNameTrait & {
  __type: "TupleTO"
  items: TypeObject[]
}

export type ObjectTO = TypeNameTrait & {
  __type: "ObjectTO"
  tsType: ts.Type // to resolve recursive type sequentially
  getProps: () => {
    propName: string
    type: TypeObject
  }[]
}

export type UnionTO = TypeNameTrait & {
  __type: "UnionTO"
  unions: TypeObject[]
}

export type EnumTO = TypeNameTrait & {
  __type: "EnumTO"
  enums: {
    name: string
    type: LiteralTO
  }[]
}

/**
 * @property kind -- identifer of why converted as unsupported
 */
export type UnsupportedTO = {
  __type: "UnsupportedTO"
  kind: "arrayT" | "prop" | "convert" | "function" | "unresolvedTypeParameter"
  typeText?: string
}

export function primitive(kind: PrimitiveTO["kind"]): PrimitiveTO {
  return {
    __type: "PrimitiveTO",
    kind,
  }
}

export function special(kind: SpecialTO["kind"]): SpecialTO {
  return {
    __type: "SpecialTO",
    kind,
  }
}
