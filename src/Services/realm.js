import realm from 'realm';

import RepositorySchema from '~/Schemas/RepositorySchema';

export default function getRealm() {
  return realm.open({
    schema: [RepositorySchema],
  });
}
