import fs from 'fs';
import path from 'path';

function getAvailableModelNames(dir: string) {
  const dictionaryNames: string[] = [];
  const files = fs.readdirSync(dir);
  for (const fileName of files) {
    if (fileName === 'index.ts') {
      continue;
    }

    if (fileName.includes(" ")) {
      continue;
    }

    dictionaryNames.push(path.parse(fileName).name);
  }
  return dictionaryNames;
}

function generateSdAtmDictionary(sdAtmMetaFileName: string, dictionaryName: string) {
  console.log(`generating sd-atm meta for dictionary '${dictionaryName}'`);

  const codes: string[] = [];
  codes.push(`import type { SdAtmDictionary } from '~/types/sd-autumn-types';`);
  codes.push(`import ${dictionaryName} from '../pr-dictionaries/${dictionaryName}';`);
  codes.push(`import { convertToSdAtmDictionary } from '~/convertors/PrToSdAtmDictionaryConvertor';`);
  codes.push('');
  codes.push(`const dictionary: SdAtmDictionary = convertToSdAtmDictionary(${dictionaryName});`);
  codes.push(`export default dictionary;`);
  codes.push('');

  fs.writeFileSync(sdAtmMetaFileName, codes.join('\n'));
}

function generateSdAtmDictionaries(sdAtmDictionariesMetaDir: string, dictionaryNames: string[]) {
  for (const dictionaryName of dictionaryNames) {
    const sdAtmMetaFileName = path.join(sdAtmDictionariesMetaDir, `${dictionaryName}.ts`);
    if (fs.existsSync(sdAtmMetaFileName)) {
      continue;
    }
    generateSdAtmDictionary(sdAtmMetaFileName, dictionaryName);
  }
}

function generateSdAtmEntity(sdAtmMetaFileName: string, entityName: string) {
  console.log(`generating sd-atm meta for entity '${entityName}'`);

  const codes: string[] = [];
  codes.push(`import type { SdAtmEntity, SdAtmEntityOriginal } from '~/types/sd-autumn-types';`);
  codes.push(`import prDef from '../pr-entities/${entityName}';`);
  codes.push(`import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';`);
  codes.push(`import { convertToSdAtmEntity } from '~/convertors/PrToSdAtmEntityConvertor';`);
  codes.push('');
  codes.push(`const sdAtmEntityOriginal: SdAtmEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, '${entityName}'> = {`);
  codes.push(`  namespace: 'app',`);
  codes.push(`  fields: [`);
  codes.push(`  ],`);
  codes.push(`};`);
  codes.push('');
  codes.push(`const entity: SdAtmEntity = convertToSdAtmEntity(prDef, sdAtmEntityOriginal);`);
  codes.push(`export default entity;`);
  codes.push('');

  fs.writeFileSync(sdAtmMetaFileName, codes.join('\n'));
}

function generateSdAtmEntities(sdAtmEntitiesMetaDir: string, entityNames: string[]) {
  for (const entityName of entityNames) {
    const sdAtmMetaFileName = path.join(sdAtmEntitiesMetaDir, `${entityName}.ts`);
    if (fs.existsSync(sdAtmMetaFileName)) {
      continue;
    }
    generateSdAtmEntity(sdAtmMetaFileName, entityName);
  }
}

export function generateSdAtmModelSkeleton(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');

  const dictionaryNames = getAvailableModelNames(path.join(modelsDir, 'pr-dictionaries'));
  generateSdAtmDictionaries(path.join(modelsDir, 'sd-atm-dictionaries'), dictionaryNames);

  const entityNames = getAvailableModelNames(path.join(modelsDir, 'pr-entities'));
  generateSdAtmEntities(path.join(modelsDir, 'sd-atm-entities'), entityNames);
}
