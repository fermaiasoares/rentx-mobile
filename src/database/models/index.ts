import { Class } from "@nozbe/watermelondb/utils/common";
import { Model } from '@nozbe/watermelondb';

import { User } from "./User";

const modelClasses: Class<Model>[] = [
    User
];

export { modelClasses };