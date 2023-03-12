import fs from 'fs';
import { each, map, snakeCase } from 'lodash';
import path from 'path';
import type { PrEntity } from '~/types/pr-types';


function generateEntitySingularCodes(modelsDir: string, metaDir: string, codes: string[]) {
  const entities = require(path.join(metaDir, "pr-entities-models")).default;
  const entitySingularCodes = map(entities, entity => snakeCase(entity.code));

  codes.push(`export const entitySingularCodes = [`);
  each(entitySingularCodes, entitySingularCode => {
    codes.push(`  '${entitySingularCode}',`);
  });
  codes.push(`] as const;`);
  codes.push(`export type TEntitySingularCodes = typeof entitySingularCodes[number];`);
  codes.push(``);
}

function generateEntityFieldCodes(modelsDir: string, metaDir: string, codes: string[]) {
  const entities: PrEntity[] = require(path.join(metaDir, "pr-entities-models")).default;

  codes.push(`const entityFieldCodes = {`);
  each(entities, entity => {
    codes.push(`  '${entity.code}': [`);

    const fieldCodes = map(entity.fields, field => field.code);
    each(fieldCodes, fieldCode => {
      codes.push(`    '${fieldCode}',`);
    });
    codes.push(`  ],`);
  });
  codes.push(`} as const;`);
  codes.push(`export type TEntityFieldCodes = typeof entityFieldCodes;`);
  codes.push(`export type TEntityCodes = keyof TEntityFieldCodes;`);
  codes.push(``);
}

export function generateModelCodes(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');
  const metaDir = path.join(declarationsDirectory, 'meta');

  const codes: string[] = [];

  generateEntitySingularCodes(modelsDir, metaDir, codes);
  generateEntityFieldCodes(modelsDir, metaDir, codes);

  const fileName = path.join(metaDir, 'pr-model-codes.ts');
  fs.writeFileSync(fileName, codes.join('\n'));
}
