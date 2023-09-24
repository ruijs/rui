import type { Rock } from "@ruijs/move-style";
import RapidToolbarLinkMeta from "./RapidDocumentFormControlMeta";
import { renderRock } from "@ruijs/react-renderer";
import type { RapidDocumentFormControlRockConfig } from "./rapid-document-form-control-types";
import { RapidUploaderFormInputRockConfig } from "@ruijs/react-rapid-rocks";


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