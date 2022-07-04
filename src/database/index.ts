import { Database } from '@nozbe/watermelondb';
import SQLiteApapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';
import { modelClasses } from './models';
import { migrations } from './migrations';

const adapter = new SQLiteApapter({
    schema: schemas,
    migrations
});

export const database = new Database({
    adapter,
    modelClasses
})