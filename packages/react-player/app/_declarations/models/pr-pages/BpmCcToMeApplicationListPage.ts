import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const page: PrRapidPage = {
  code: 'bpm_cc_to_me_application_list',
  name: '抄送给我的审批',
  title: '抄送给我的审批',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmBusinessApplication",
      viewMode: "table",
      columns: [
        {
          columnType: 'auto',
          code: 'title',
          fixed: 'left',
          width: '250px',
        },
        {
          columnType: 'auto',
          code: 'formData',
          title: '摘要',
          minWidth: '200px',
          rendererType: 'rapidDescriptionsRenderer',
          rendererProps: {
            size: 'small',
            items: [
              {
                code: 'productionOrder',
                label: '生产工单',
              },
              {
                code: 'material',
                label: '物料',
              },
              {
                code: 'materialFlowProcess',
                label: '工序',
              },
              {
                code: 'operator',
                label: '操作工',
              },
              {
                code: 'equipment',
                label: '设备',
              },
              {
                code: 'qualifiedOutput',
                label: '合格品数量',
              },
            ]
          }
        },
        {
          columnType: 'auto',
          code: 'initiator',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          columnType: 'auto',
          code: 'initiatedAt',
          width: '150px',
        },
        {
          columnType: 'auto',
          code: 'state',
          width: '150px',
        },
      ],
    },
  ],
};

export default page;
