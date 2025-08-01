
import _ from "lodash";
import { axiosPrivate } from "./axios";
import { endpoints } from "../Server/endpoints";

const canRead = (_action, _resources) => {
    if(_action === 'read' && _resources?.length > 0) {
        return _resources.some(resource => _permissions?.includes(_action) && resource?.clearance_level >= values?.currentUserClearance);
    } else return false;
}

const canWrite = (_action, _resources, _permissions) => {
    if(_action === 'create' && _resources?.length > 0 && _permissions?.length > 0) {
        return _resources.some(resource => _permissions?.includes(_action) && resource?.clearance_level >= values?.currentUserClearance);
    } else return false;
}

const canUpdate = (_action, _resources, _permissions) => {
    if(_action === 'update' && _resources?.length > 0 && _permissions?.length > 0) {
        return _resources.some(resource => _permissions?.includes(_action) && resource?.clearance_level >= values?.currentUserClearance);
    } else return false;
}

const canDelete = (_action, _resources, _permissions) => {
    if(_action === 'delete' && _resources?.length > 0 && _permissions?.length > 0) {
        return _resources.some(resource => _permissions?.includes(_action) && resource?.clearance_level >= values?.currentUserClearance);
    } else return false;
}

export const isAdmin = async (_role) => {
    const { Role } = endpoints;
    const { data: { data: { is_admin }}} = await axiosPrivate.post(Role.verify, { role: _role?.toLowerCase() });
    if(is_admin) return true;
    else return false; 
}

export const checkPermissions = async (_action="read", values={}) => {
    const { permissions, currentUserRole } = values;
    const is_admin = await isAdmin(currentUserRole);
    let _resources = permissions?.resources ? [...permissions?.resources] : [];
    let _permissions = permissions?.actions ? [...permissions?.actions] : [];

    return {
        read: is_admin ? true: canRead(_action, _resources, _permissions),
        create: is_admin ? true: canWrite(_action, _resources, _permissions),
        update: is_admin ? true: canUpdate(_action, _resources, _permissions),
        delete: is_admin ? true: canDelete(_action, _resources, _permissions),
    };
}