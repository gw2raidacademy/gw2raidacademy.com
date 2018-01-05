import { compact } from 'lodash';

export const upsert = (collection, test, data) => {
  let finds = 0;
  let newCollection = collection.map((value, key) => {
    if (test(value)) {
      finds++;
      return { ...value, ...data };
    }
    return value;
  });

  if (finds === 0) newCollection = [ ...collection, data ];
  return compact(newCollection);
};
