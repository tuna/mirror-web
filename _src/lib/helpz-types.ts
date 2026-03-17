export type ZInputTextOutput = string;
export type ZInputCheckboxOutput = string | boolean;
export type ZInputSelectOutput = [string, Record<string, string>];
export type ZInputOutput =
  | ZInputTextOutput
  | ZInputCheckboxOutput
  | ZInputSelectOutput;
export type TemplateValue = string | boolean;
export type TemplateData = Record<string, TemplateValue>;
