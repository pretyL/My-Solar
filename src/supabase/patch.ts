import type { Ship, User } from '../types';
import type { TableName } from './tableName';

import { client } from './client';



async function patch(tableName: TableName, id: string, payload:  Ship | User) {
  const supabase = client();
  const result = await supabase
    .from(tableName)
    .update(payload)
    .eq('id', id);
  
  return result;
}



export { patch };

