import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import dictionaries from '~/_declarations/meta/sd-atm-dictionaries-models';
import entities from '~/_declarations/meta/sd-atm-entities-models';
import config from './config';
import fs from 'fs';
import path from 'path';
import AutumnUpdater from './AutumnUpdater';
import { newDictionaryUpdater } from './DictionaryUpdater';
import { newDictionaryEntryUpdater } from './DictionaryEntryUpdater';
import { newModelUpdater } from './ModelUpdater';
import { newPropertyUpdater } from './PropertyUpdater';

const appDataDirLocation = path.join(__dirname, '..', '..', '.benzene-data');
const cookieJarStorageLocation = path.join(appDataDirLocation, 'autumn-cookie-jar.json');

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

const platformInternalApi = wrapper(
  axios.create({
    jar,
    baseURL: config.platformInternalApiUrl,
    validateStatus: null,
  }),
);

const platformPublicApi = wrapper(
  axios.create({
    jar,
    baseURL: config.platformPublicApiUrl,
    validateStatus: null,
  }),
);

const autumnConfigApi = wrapper(
  axios.create({
    jar,
    baseURL: config.platformInternalApiUrl + `/lowcode/apps/${config.autumnAppId}`,
    validateStatus: null,
  }),
);

async function ensureUserSignedIn() {
  const respose = await platformPublicApi.get('users/me');

  if (respose.status !== 200) {
    console.log('User not signed in currently, try sign in...');
    await platformInternalApi.post('user/signin', {
      code: config.developerEnterpriseCode,
      username: config.developerUserName,
      password: config.developerPassword,
    });

    fs.writeFileSync(cookieJarStorageLocation, JSON.stringify(jar.serializeSync(), null, 2));
  }
}

export async function updateAutumnSystemConfigurations() {
  await ensureUserSignedIn();

  const appUpdater = new AutumnUpdater({
    modelUpdaters: [
      newDictionaryUpdater(autumnConfigApi),
      newDictionaryEntryUpdater(autumnConfigApi),
      newModelUpdater(autumnConfigApi),
      newPropertyUpdater(autumnConfigApi),
    ],
  });
  appUpdater.updateModels([
    {
      modelType: 'dictionary',
      entities: dictionaries,
    },
    {
      modelType: 'model',
      entities: entities,
    },
  ]);
}
