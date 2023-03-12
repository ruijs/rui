/**
 * 用于生成模型索引文件，将模型定义按照类型分别导出。
 */

import fs from 'fs';
import path from 'path';
import { ensureDirectoryExists, enumFileBaseNamesInDirectory } from '~/utils/file-utility';

interface GenerateModelsIndexFileOption {
  /**
   * Where is the models directory.
   */
  modelsDir: string;
  /**
   * where we should output the models index file.
   */
  outputDir: string;
  /**
   * Where is the model type definition file.
   */
  typeDefFilePath: string;
  /**
   * The model category directory name.
   */
  categoryDirName: string;
  /**
   * The model type name in the `categoryDir`.
   */
  modelTypeName: string;
}

function generateModelIndexFilesOfTypeDir({
  modelsDir,
  outputDir,
  typeDefFilePath,
  categoryDirName,
  modelTypeName,
}: GenerateModelsIndexFileOption) {
  const filesDir = path.join(modelsDir, categoryDirName);
  const fileNames = enumFileBaseNamesInDirectory(filesDir);

  const codes = [];
  codes.push(`import type { ${modelTypeName} as T${modelTypeName} } from '${typeDefFilePath}';`);
  for (const fileName of fileNames) {
    if (fileName.includes(" ")) {
      continue;
    }
    codes.push(`import ${fileName} from '../models/${categoryDirName}/${fileName}';`);
  }
  codes.push('');

  codes.push('export default [');
  for (const fileName of fileNames) {
    if (fileName.includes(" ")) {
      continue;
    }
    codes.push(`  ${fileName},`);
  }
  codes.push(`] as T${modelTypeName}[];`);
  codes.push('');

  fs.writeFileSync(path.join(outputDir, categoryDirName + '-models.ts'), codes.join('\n'));
}

function generatePrModelIndexFiles(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');
  const outputDir = path.join(declarationsDirectory, 'meta');
  const typeDefFilePath = '~/types/pr-types';

  ensureDirectoryExists(outputDir);

  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'pr-entities', modelTypeName: 'PrEntity'});
  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'pr-dictionaries', modelTypeName: 'PrDictionary'});
  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'pr-pages', modelTypeName: 'PrPage'});
}

function generateSdAtmModelIndexFiles(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');
  const outputDir = path.join(declarationsDirectory, 'meta');
  const typeDefFilePath = '~/types/sd-autumn-types';

  ensureDirectoryExists(outputDir);

  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'sd-atm-entities', modelTypeName: 'SdAtmEntity'});
  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'sd-atm-dictionaries', modelTypeName: 'SdAtmDictionary'});
}

function generateSdRpdModelIndexFiles(declarationsDirectory: string) {
  const modelsDir = path.join(declarationsDirectory, 'models');
  const outputDir = path.join(declarationsDirectory, 'meta');
  const typeDefFilePath = '~/types/sd-rapid-types';

  ensureDirectoryExists(outputDir);

  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'sd-rpd-entities', modelTypeName: 'SdRpdEntity'});
  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath, categoryDirName: 'sd-rpd-dictionaries', modelTypeName: 'SdRpdDataDictionary'});
  generateModelIndexFilesOfTypeDir({modelsDir, outputDir, typeDefFilePath: '~/types/sd-rapid-page-types', categoryDirName: 'sd-rpd-pages', modelTypeName: 'SdRpdPage'});
}

console.log('Generating meta index files...');

export function generateModelIndexFiles(declarationsDirectory: string) {
  generatePrModelIndexFiles(declarationsDirectory);
  generateSdAtmModelIndexFiles(declarationsDirectory);
  generateSdRpdModelIndexFiles(declarationsDirectory);
}
