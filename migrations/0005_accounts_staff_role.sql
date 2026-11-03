alter table aqua_staff_roles
  drop constraint if exists aqua_staff_roles_role_check;

alter table aqua_staff_roles
  add constraint aqua_staff_roles_role_check
  check (role in ('owner', 'manager', 'floor', 'accounts'));
