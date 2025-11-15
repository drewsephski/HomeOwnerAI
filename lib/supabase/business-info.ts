import { createClient } from '@supabase/supabase-js';

export interface BusinessInfo {
  id?: string;
  clerk_user_id?: string;
  raw_info: string;
  organized_info: string;
  created_at?: string;
  updated_at?: string;
}

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const saveBusinessInfo = async (clerkUserId: string, rawInfo: string, organizedInfo: string): Promise<BusinessInfo | null> => {
  try {
    console.log('Attempting to save business info...');
    console.log('Clerk User ID:', clerkUserId);
    console.log('Raw info length:', rawInfo.length);
    console.log('Organized info length:', organizedInfo.length);
    
    const { data, error } = await supabaseClient
      .from('business_info')
      .upsert({
        clerk_user_id: clerkUserId,
        raw_info: rawInfo,
        organized_info: organizedInfo,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving business info:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return null;
    }

    console.log('Successfully saved business info:', data);
    return data;
  } catch (error) {
    console.error('Error saving business info:', error);
    return null;
  }
};

export const getBusinessInfo = async (clerkUserId: string): Promise<BusinessInfo | null> => {
  try {
    const { data, error } = await supabaseClient
      .from('business_info')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found
        return null;
      }
      console.error('Error fetching business info:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching business info:', error);
    return null;
  }
};

export const deleteBusinessInfo = async (): Promise<boolean> => {
  try {
    const { error } = await supabaseClient
      .from('business_info')
      .delete()
      .neq('id', '');

    if (error) {
      console.error('Error deleting business info:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting business info:', error);
    return false;
  }
};
