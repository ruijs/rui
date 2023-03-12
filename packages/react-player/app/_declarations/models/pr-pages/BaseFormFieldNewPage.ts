import type { PrFormPage } from '~/types/pr-types';

const page: PrFormPage = {
  code: 'form_field_new',
  name: '新建表单字段',
  templateType: 'formPage',
  form: {
    entityCode: 'BaseFormField',
    mode: "new",
    items: [
      {
        type: 'auto',
        code: 'code',
      },
      {
        type: 'auto',
        code: 'name',
      },
      {
        type: 'auto',
        code: 'fieldType',
      },
      {
        type: 'auto',
        code: 'description',
      },
    ],
    onSaveSuccess: [
      {
        $action: "wait",
        time: 1000,
      },
      {
        $action: "goToPage",
        pageCode: "form_field_list",
      },
    ],
  },
};

export default page;
