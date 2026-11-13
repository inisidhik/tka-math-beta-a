import { supabase } from '../supabase';

export type UserProfile = {
  id: string;
  username: string;
  full_name: string;
  role: 'teacher' | 'student' | 'tester';
  class_name: string | null;
  is_active: boolean;
};

export async function signIn(email: string, password: string) {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });
  if (authError) throw authError;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, username, full_name, role, class_name, is_active')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    await supabase.auth.signOut();
    throw profileError;
  }
  if (!profile.is_active) {
    await supabase.auth.signOut();
    throw new Error('Akun ini sedang dinonaktifkan.');
  }
  return { user: authData.user, profile: profile as UserProfile };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function getCurrentProfile() {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!authData.user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, role, class_name, is_active')
    .eq('id', authData.user.id)
    .single();
  if (error) throw error;
  if (!data.is_active) {
    await supabase.auth.signOut();
    return null;
  }
  return data as UserProfile;
}
