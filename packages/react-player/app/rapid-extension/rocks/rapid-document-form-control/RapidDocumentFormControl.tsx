import type { Rock } from "@ruiapp/move-style";
import RapidToolbarLinkMeta from "./RapidDocumentFormControlMeta";
import { renderRock } from "@ruiapp/react-renderer";
import type { RapidDocumentFormControlRockConfig } from "./rapid-document-form-control-types";
import { RapidUploaderFormInputRockConfig } from "@ruiapp/react-rapid-rocks";


export default {
  Renderer(context, props) {
    const rockConfig: RapidUploaderFormInputRockConfig = {
      $id: props.$id,
      $type: "rapidUploaderFormInput",
      uploadProps: props.uploadProps,
      onUploaded: props.onUploaded,
      form: props.form,
    };

    return renderRock({
      context,
      rockConfig,
    });
  },

  ...RapidToolbarLinkMeta,
} as Rock<RapidDocumentFormControlRockConfig>;