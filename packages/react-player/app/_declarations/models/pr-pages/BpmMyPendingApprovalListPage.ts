import { cloneDeep } from 'lodash';
import type { RapidEntityFormConfig } from '~/rapid-extension/rocks';
import type { PrRapidPage } from '~/types/pr-types';

const page: PrRapidPage = {
  code: 'bpm_my_pending_approval_list',
  name: '待处理审批',
  title: '待处理审批',
  templateType: 'rapidPage',
  view: [
    {
      $type: "sonicEntityList",
      entityCode: "BpmBusinessApplication",
      viewMode: "table",
      extraProperties: ["process"],
      columns: [
        {
          type: 'auto',
          code: 'title',
          fixed: 'left',
          width: '250px',
        },
        {
          type: 'auto',
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
          type: 'auto',
          code: 'initiator',
          width: '150px',
          rendererProps: {
            format: "{{name}}",
          },
        },
        {
          type: 'auto',
          code: 'initiatedAt',
          width: '150px',
        },
        {
          type: 'auto',
          code: 'state',
          width: '150px',
        },
      ],
    },
  ],
};

export default page;
