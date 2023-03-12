import fs from 'fs';
import path from 'path';
import { ensureDirectoryExists } from '~/utils/file-utility';

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

function generateSdRpdDictionary(sdRpdMetaFileName: string, dictionaryName: string) {
  console.log(`generating sd-rpd meta for dictionary '${dictionaryName}'`);

  const codes: string[] = [];
  codes.push(`import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';`);
  codes.push(`import ${dictionaryName} from '../pr-dictionaries/${dictionaryName}';`);
  codes.push(`import { convertToSdRpdDataDictionary } from '~/convertors/PrToSdRpdDictionaryConvertor';`);
  codes.push('');
  codes.push(`const dictionary: SdRpdDataDictionary = convertToSdRpdDataDictionary(${dictionaryName}, {`);
  codes.push(`});`);
  codes.push(`export default dictionary;`);
  codes.push('');

  fs.writeFileSync(sdRpdMetaFileName, codes.join('\n'));
}

function generateSdRpdDictionaries(sdRpdDictionariesMetaDir: string, dictionaryNames: string[]) {
  for (const dictionaryName of dictionaryNames) {
    const sdRpdMetaFileName = path.join(sdRpdDictionariesMetaDir, `${dictionaryName}.ts`);
    if (fs.existsSync(sdRpdMetaFileName)) {
      continue;
    }
    generateSdRpdDictionary(sdRpdMetaFileName, dictionaryName);
  }
}

function generateSdRpdEntity(sdRpdMetaFileName: string, entityName: string) {
  console.log(`generating sd-rpd meta for entity '${entityName}'`);

  const codes: string[] = [];
  codes.push(`import type { SdRpdEntity, SdRpdEntityOriginal } from '~/types/sd-rapid-types';`);
  codes.push(`import prDef from '../pr-entities/${entityName}';`);
  codes.push(`import type { TEntityCodes, TEntityFieldCodes, TEntitySingularCodes } from '../../meta/pr-model-codes';`);
  codes.push(`import { convertToSdRpdEntity } from '~/convertors/PrToSdRpdEntityConvertor';`);
  codes.push('');
  codes.push(`const sdRpdEntityOriginal: SdRpdEntityOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, '${entityName}'> = {`);
  codes.push(`  namespace: 'app',`);
  codes.push(`  fields: [`);
  codes.push(`  ],`);
  codes.push(`};`);
  codes.push('');
  codes.push(`const entity: SdRpdEntity = convertToSdRpdEntity(prDef, sdRpdEntityOriginal);`);
  codes.push(`export default entity;`);
  codes.push('');

  fs.writeFileSync(sdRpdMetaFileName, codes.join('\n'));
}

function generateSdRpdEntities(sdRpdEntitiesMetaDir: string, entityNames: string[]) {
  for (const entityName of entityNames) {
    const sdRpdMetaFileName = path.join(sdRpdEntitiesMetaDir, `${entityName}.ts`);
    if (fs.existsSync(sdRpdMetaFileName)) {
      continue;
    }
    generateSdRpdEntity(sdRpdMetaFileName, entityName);
  }
}

export function generateSdRpdModelSkeleton(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');

  const dictionariesOutputDirectory = path.join(modelsDir, 'sd-rpd-dictionaries')
  ensureDirectoryExists(dictionariesOutputDirectory);
  const dictionaryNames = getAvailableModelNames(path.join(modelsDir, 'pr-dictionaries'));
  generateSdRpdDictionaries(dictionariesOutputDirectory, dictionaryNames);

  const entitiesOutputDirectory = path.join(modelsDir, 'sd-rpd-entities')
  ensureDirectoryExists(entitiesOutputDirectory);
  const entityNames = getAvailableModelNames(path.join(modelsDir, 'pr-entities'));
  generateSdRpdEntities(entitiesOutputDirectory, entityNames);
}
