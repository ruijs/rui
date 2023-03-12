import type { PrFormPage } from '~/types/pr-types';

const page: PrFormPage = {
  code: 'EditMaterialPage',
  name: '修改物料页',
  templateType: 'formPage',
  form: {
    mode: 'edit',
    entityCode: 'BaseMaterial',
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
        code: 'category',
      },
      {
        type: 'auto',
        code: 'state',
      },
    ],
    actions: [
      {
        actionType: 'submit',
        actionText: '保存',
      },
    ],
  },
};

export default page;
