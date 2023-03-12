import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/BasePartner';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'BasePartner'> = {
  namespace: 'app',
  fields: [
    {
      code: 'categories',
      targetSingularCode: 'base_partner_category',
      linkTableName: 'base_partner_partner_category_link',
      targetIdColumnName: 'category_id',
      selfIdColumnName: 'partner_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
