import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';
import prDef from '../pr-entities/InspectionCharacteristic';
import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';
import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';

const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, 'InspectionCharacteristic'> = {
  namespace: 'app',
  fields: [
    {
      code: 'rule',
      targetSingularCode: 'inspection_rule',
      targetIdColumnName: 'rule_id',
    },
    {
      code: 'category',
      targetSingularCode: 'inspection_characteristic_category',
      targetIdColumnName: 'category_id',
    },
    {
      code: 'method',
      targetSingularCode: 'inspection_method',
      targetIdColumnName: 'method_id',
    },
    {
      code: 'instrumentCategory',
      targetSingularCode: 'inspection_instrument_category',
      targetIdColumnName: 'instrument_category_id',
    },
    {
      code: 'instrument',
      targetSingularCode: 'inspection_instrument',
      targetIdColumnName: 'instrument_id',
    },
  ],
};

const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);
export default entity;
