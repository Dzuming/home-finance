import * as types from './actionTypes';
import { createAction } from 'redux-actions';

export const openSideNav = createAction(types.OPEN_SIDENAV, isOpen => ({
  isOpen,
}));
