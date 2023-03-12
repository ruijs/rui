import type { PrRapidPage } from '~/types/pr-types';

const page: PrRapidPage = {
  code: 'data_dictionary_new',
  name: '新建数据字典',
  templateType: 'rapidPage',
  blocks: [
    {
      type: "dataForm",
      code: "entityForm",
      entityCode: 'DataDictionary',
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
          code: 'valueType',
        },
        {
          type: 'textarea',
          code: 'description',
        },
      ],
      actions: [
        {
          actionType: "submit",
          actionText: "保存",
        }
      ],
      onSaveSuccess: [
        {
          $action: "wait",
          time: 1000,
        },
        {
          $action: "goToPage",
          pageCode: "data_dictionary_list",
        },
      ],
    }
  ]
};

export default page;
