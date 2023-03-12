import type { SdRapidPage, SdRpdDetailsPage, SdRpdFormPage, SdRpdTablePage } from "~/proton";
import type { GenerateRuiPageConfigOption } from "./rui-page-generator-types";
import { generateTablePage } from "./rapid-page-generators/table-page/table-page-generator";
import { generateFormPage } from "./rapid-page-generators/form-page/form-page-generator";
import { generateDetailsPage } from "./rapid-page-generators/details-page/details-page-generator";
import { generateRapidPage } from "./rapid-page-generators/rapid-page-generator";

export function generateRuiPage(option: GenerateRuiPageConfigOption) {
  const templateType = option.sdPage.templateType;
  if (templateType === "tablePage") {
    return generateTablePage(option as GenerateRuiPageConfigOption<SdRpdTablePage>);
  } else if (templateType === "formPage") {
    return generateFormPage(option as GenerateRuiPageConfigOption<SdRpdFormPage>)
  } else if (templateType === "detailsPage") {
    return generateDetailsPage(option as GenerateRuiPageConfigOption<SdRpdDetailsPage>)
  } else if (templateType === "rapidPage") {
    return generateRapidPage(option as GenerateRuiPageConfigOption<SdRapidPage>)
  }
}