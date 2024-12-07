export type LocaleNamespace = string;

export type Lingual = string;

export type StringResourceValue = string;

export type ComplexResourceValue = Record<string, any>;

export type LocaleResource = {
  translation: Record<string, StringResourceValue | ComplexResourceValue>;
};

export type GetStringResourceConfig = {
  ns?: string;
  name: string;
  params?: Record<string, any>;
};
