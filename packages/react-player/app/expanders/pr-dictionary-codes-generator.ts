import fs from 'fs';
import { each } from 'lodash';
import path from 'path';
import type { PrDictionary } from '~/types/pr-types';


function generateDataDictionaryCodes(modelsDir: string, metaDir: string, codes: string[]) {
  const dictionaries: PrDictionary[] = require(path.join(metaDir, "pr-dictionaries-models")).default;

  codes.push(`const dictionaryCodes = [`);
  each(dictionaries, dictionary => {
    codes.push(`  '${dictionary.code}',`);
  });
  codes.push(`] as const;`);
  codes.push(`export type TDictionaryCodes = typeof dictionaryCodes[number];`);
  codes.push(``);
}

export function generateDictionaryCodes(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');
  const metaDir = path.join(declarationsDirectory, 'meta');

  const codes: string[] = [];

  generateDataDictionaryCodes(modelsDir, metaDir, codes);

  const fileName = path.join(metaDir, 'pr-dictionary-codes.ts');
  fs.writeFileSync(fileName, codes.join('\n'));
}
