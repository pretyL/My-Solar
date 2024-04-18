import type { CapturePoint, CapturePointPost, Ship, ShipRegister, User, UserSignUp } from '../types';
import type { TableName } from './tableName';

import { client } from './client';



async function post(tableName: TableName, payload: User | UserSignUp | Ship | ShipRegister | CapturePoint | CapturePointPost) {
  const supabase = client();
  const result = await supabase
    .from(tableName)
    .insert(payload);
  
  return result;
}



export { post };

