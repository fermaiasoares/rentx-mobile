import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

const migrations = schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                createTable({
                    name: 'cars',
                    columns: [
                        { name: 'name', type: 'string' },
                        { name: 'brand', type: 'string' },
                        { name: 'about', type: 'string' },
                        { name: 'fuel_type', type: 'string' },
                        { name: 'period', type: 'string' },
                        { name: 'price', type: 'number' },
                        { name: 'thumbnail', type: 'string' },
                    ]
                })
            ]
        }
    ]
})

export { migrations }