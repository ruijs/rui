import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import dictionaries from '~/_declarations/meta/sd-rpd-dictionaries-models';
import entities from '~/_declarations/meta/sd-rpd-entities-models';
import config from './config';
import fs from 'fs';
import path from 'path';
import AppUpdater from './AppUpdater';
import { newDictionaryUpdater } from './DictionaryUpdater';
import { newDictionaryEntryUpdater } from './DictionaryEntryUpdater';
import { newModelUpdater } from './ModelUpdater';
import { newPropertyUpdater } from './PropertyUpdater';

const appDataDirLocation = path.join(__dirname, '..', '..', '.benzene-data');
const cookieJarStorageLocation = path.join(appDataDirLocation, 'rapid-cookie-jar.json');

if (!fs.existsSync(appDataDirLocation)) {
  fs.mkdirSync(appDataDirLocation);
}

let jar: CookieJar;
if (fs.existsSync(cookieJarStorageLocation)) {
  const cookieJSON = fs.readFileSync(cookieJarStorageLocation).toString();
  jar = CookieJar.deserializeSync(cookieJSON);
} else {
  jar = new CookieJar();
}

const rapidConfigApi = wrapper(
  axios.create({
    jar,
    baseURL: config.rapidApiUrl,
    validateStatus: null,
  }),
);

export async function updateRapidSystemConfigurations() {

  const appUpdater = new AppUpdater({
    modelUpdaters: [
      newDictionaryUpdater(rapidConfigApi),
      newDictionaryEntryUpdater(rapidConfigApi),
      newModelUpdater(rapidConfigApi),
      newPropertyUpdater(rapidConfigApi),
    ],
  });
  appUpdater.updateModels([
    {
      modelType: 'dictionary',
      entities: dictionaries.filter(item => !item.metaOnly),
    },
    {
      modelType: 'model',
      entities: entities.filter(item => !item.metaOnly),
    },
  ]);
}
