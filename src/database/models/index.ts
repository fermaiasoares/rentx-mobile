import { Class } from "@nozbe/watermelondb/utils/common";
import { Model } from '@nozbe/watermelondb';

import { User } from "./User";
import { Car } from "./Car";

const modelClasses: Class<Model>[] = [
    User,
    Car
];

export { modelClasses };