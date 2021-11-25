import { useTypedSelector } from "./useTypedSelector";
import { shallowEqual } from "react-redux";
import { adminRolesPermission, userRolesPermission } from "../utils/constants";

const useRolePermission = (): any[] => {
  const { roles } = useTypedSelector(state => state.auth.user, shallowEqual);
  const currentRole = roles?.toString();
  const userPermission = userRolesPermission?.includes(currentRole);
  const adminPermission = adminRolesPermission?.includes(currentRole);
  return [userPermission, adminPermission, currentRole];
};

export default useRolePermission;