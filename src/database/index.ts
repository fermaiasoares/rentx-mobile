import { Database } from '@nozbe/watermelondb';
import SQLiteApapter from '@nozbe/watermelondb/adapters/sqlite';

import { schemas } from './schemas';
import { modelClasses } from './models';

const adapter = new SQLiteApapter({
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses
})