import { appSchema } from '@nozbe/watermelondb';

import { usersSchema } from './usersSchema';
import { carsSchema } from './carsSchema';

const schemas = appSchema({
    version: 2,
    tables: [
        usersSchema,
        carsSchema
    ]
})

export { schemas }