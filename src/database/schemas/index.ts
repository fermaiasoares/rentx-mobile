import { appSchema } from '@nozbe/watermelondb';

import { usersSchema } from './usersSchema';

const schemas = appSchema({
    version: 1,
    tables: [
        usersSchema
    ]
})

export { schemas }