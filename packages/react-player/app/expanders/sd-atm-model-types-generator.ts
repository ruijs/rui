import fs from 'fs';
import { uniq, find } from 'lodash';
import path from 'path';
import type { SdAtmDictionary, SdAtmEntity, SdAtmField } from '~/types/sd-autumn-types';

function convertSdAtmFieldTypeToTypeScriptType(field: SdAtmField, entities: SdAtmEntity[]) {
  const { type, dataDictionaryCode, targetSingularCode, relation } = field;
  switch (type) {
    case 'text':
      return 'string';
    case 'bool':
      return 'boolean';
    case 'integer':
      return 'number';
    case 'long':
      return 'string';
    case 'float':
      return 'number';
    case 'double':
      return 'number';
    case 'date':
    case 'time':
    case 'datetime':
      return 'string';
    case 'json':
      return 'object';
    case 'option':
      return dataDictionaryCode;
    case 'relation':
      const targetCode = find(entities, { singularCode: targetSingularCode })?.code;
      return relation === 'one' ? targetCode : `${targetCode}[]`;
  }
  return 'any';
}

function generateDictionaryTypes(metaDir: string) {
  const dictionaries: SdAtmDictionary[] = require(path.join(metaDir, "sd-atm-dictionaries-models")).default;

  const codes: string[] = [];

  for (const dictionary of dictionaries) {
    codes.push(`/**`);
    codes.push(` * ${dictionary.description}`);
    codes.push(` */`);
    if (!dictionary.items) {
      codes.push(`export type ${dictionary.code} = never;`);
    } else {
      codes.push(`export type ${dictionary.code} =`);
      for (const item of dictionary.items) {
        codes.push(`  | '${item.value}'`);
      }
      codes.push(`  ;`);
    }
    codes.push(``);
  }

  const fileName = path.join(metaDir, 'sd-atm-dictionaries-types.ts');
  fs.writeFileSync(fileName, codes.join('\n'));
}

function generateEntityTypes(metaDir: string) {
  const entities: SdAtmEntity[] = require(path.join(metaDir, "sd-atm-entities-models")).default;

  const codes: string[] = [];

  // Import types of dictionaries.
  const referencedDictionaryCodes = [];
  for (const entity of entities) {
    for (const field of entity.fields) {
      if (field.type === 'option' && field.dataDictionaryCode) {
        referencedDictionaryCodes.push(field.dataDictionaryCode);
      }
    }
  }
  referencedDictionaryCodes.sort();
  codes.push(`import type {`);
  for (const dictionaryCode of uniq(referencedDictionaryCodes)) {
    codes.push(`  ${dictionaryCode},`);
  }
  codes.push(`} from "./sd-atm-dictionaries-types";`);

  // types of entities.
  for (const entity of entities) {
    codes.push(`/**`);
    codes.push(` * ${entity.name}`);
    codes.push(` */`);
    codes.push(`export interface ${entity.code} {`);

    // emit default fields.
    codes.push(`  id: string;`);
    codes.push(`  createdAt?: string;`);
    codes.push(`  createdBy?: string;`);
    codes.push(`  updatedAt?: string;`);
    codes.push(`  updatedBy?: string;`);

    // emit defined fields.
    for (const field of entity.fields) {
      codes.push(`  /**`);
      codes.push(`   * ${field.name}`);
      codes.push(`   */`);
      codes.push(`  ${field.code}${field.required ? '' : '?'}: ${convertSdAtmFieldTypeToTypeScriptType(field, entities)};`);
    }

    codes.push(`};`);
    codes.push(``);
    codes.push(`/**`);
    codes.push(` * ${entity.name}`);
    codes.push(` */`);
    codes.push(
      `export type Save${entity.code}Input = Omit<${entity.code}, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;`,
    );
    codes.push(``);
  }

  const fileName = path.join(metaDir, 'sd-atm-entities-types.ts');
  fs.writeFileSync(fileName, codes.join('\n'));
}

export function generateSdAtmModelTypes(declarationsDirectory: string) {
  const metaDir = path.join(declarationsDirectory, 'meta');

  generateDictionaryTypes(metaDir);
  generateEntityTypes(metaDir);
}
