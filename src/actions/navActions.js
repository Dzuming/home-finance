import * as types from './actionTypes';
export function openSideNav(isOpen) {
    return { type: types.OPEN_SIDENAV, isOpen};
}