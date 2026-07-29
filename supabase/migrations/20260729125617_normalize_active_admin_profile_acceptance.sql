update public.admin_profiles as profile
set
  invite_accepted_at = coalesce(
    profile.invite_accepted_at,
    profile.activated_at,
    profile.updated_at,
    now()
  ),
  last_sign_in_at = coalesce(profile.last_sign_in_at, auth_user.last_sign_in_at),
  updated_at = now()
from auth.users as auth_user
where profile.user_id = auth_user.id
  and profile.status = 'active';
