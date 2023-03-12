export type RemoveField<Type, TFields> = {
  [Property in keyof Type as Exclude<Property, TFields>]: Type[Property]
};