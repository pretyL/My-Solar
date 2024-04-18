import type { UserSignIn } from '../types';

import { client } from './client';



async function getSingleUser(payload: UserSignIn) {
  const supabase = client();
  const result = await supabase
    .from('user')
    .select('*')
    .eq('phoneNumber', payload.phoneNumber)
    .eq('pin', payload.pin)
    .single();
  
  return result;
}



export { getSingleUser };

