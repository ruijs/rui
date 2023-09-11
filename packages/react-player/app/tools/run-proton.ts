import path from "path";
import chokidar from 'chokidar';
import { generateModelIndexFiles } from "~/expanders/model-index-generator";
import { generateModelCodes } from "~/expanders/pr-model-codes-generator";
import { generateSdAtmModelTypes } from "~/expanders/sd-atm-model-types-generator";
import { generateSdAtmModelSkeleton } from "~/expanders/sd-atm-model-skeleton-generator";

import { generateSdRpdModelTypes } from "~/expanders/sd-rpd-model-types-generator";
import { generateSdRpdModelSkeleton } from "~/expanders/sd-rpd-model-skeleton-generator";

import protonConfig from "./proton.config";


export interface RunProtonOption {
  declarationsDirectory: string;
}

export function runProton(option: RunProtonOption) {
  let { declarationsDirectory } = option;

  if (!path.isAbsolute(declarationsDirectory)) {
    declarationsDirectory = path.join(process.cwd(), declarationsDirectory);
  }

  console.log(declarationsDirectory);

  // const watcher = chokidar.watch(path.join(declarationsDirectory, 'models'), {
  //   ignored: /(^|[\/\\])\../, // ignore dotfiles
  //   persistent: true
  // });

  let initialized = false;

  let expanding = false;
  let postoned = false;

  function doExpand() {
    console.log("Expanding...");
    console.log("generateModelIndexFiles");
    generateModelIndexFiles(declarationsDirectory);
    console.log("generateModelCodes");
    generateModelCodes(declarationsDirectory);

    console.log("generateSdAtmModelSkeleton");
    generateSdAtmModelSkeleton(declarationsDirectory);
    console.log("generateSdAtmModelTypes");
    generateSdAtmModelTypes(declarationsDirectory);

    console.log("generateSdRpdModelSkeleton");
    generateSdRpdModelSkeleton(declarationsDirectory);
    console.log("generateSdRpdModelTypes");
    generateSdRpdModelTypes(declarationsDirectory);

    console.log("re-generateModelIndexFiles");
    generateModelIndexFiles(declarationsDirectory);
    console.log("re-generateModelCodes");
    generateModelCodes(declarationsDirectory);
    console.log("Done.");
  }

  function tryExpand () {
    if (expanding) {
      postoned = true;
      return;
    }

    doExpand();
    if (postoned) {
      doExpand();
    }
  }
  tryExpand();

  // watcher
  //   .on('all', (eventName:string, path: string) => {
  //     if (initialized) {
  //       tryExpand();
  //     }
  //   })
  //   .on('ready', () => {
  //     tryExpand();
  //     initialized = true;
  //   });
}


runProton({
  declarationsDirectory: protonConfig.declarationsDirectory,
});