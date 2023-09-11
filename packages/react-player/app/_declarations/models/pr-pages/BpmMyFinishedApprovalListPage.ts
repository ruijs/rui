import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const page: PrRapidPage = {
  code: 'bpm_my_finished_approval_list',
  name: '已处理审批',
  title: '已处理审批',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmBusinessApplication",
      viewMode: "table",
      extraProperties: ["process"],
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
            $exps: {
              items: "_.get($slot.record, 'process.listConfig.listSummaryColumnRenderProps.items') || []"
            }
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
