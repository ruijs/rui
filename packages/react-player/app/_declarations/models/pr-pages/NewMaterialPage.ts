import type { PrFormPage } from '~/types/pr-types';

const page: PrFormPage = {
  code: 'NewMaterialPage',
  name: '新建物料页',
  templateType: 'formPage',
  form: {
    mode: 'new',
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
