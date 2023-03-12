import type {
  SdRpdFormPage,
  SdRpdMeta,
} from '~/proton';
import { find } from 'lodash';
import { preConfigDataForm } from '../blocks/data-form-block';

export function autoConfigSourcePage(page: SdRpdFormPage, meta: SdRpdMeta) {
  const entity = find(meta.entities, { code: page.form.entityCode });
  if (!entity) {
    return page;
  }

  if (page.form) {
    preConfigDataForm(page, page.form, meta);
  }

  return page;
}
