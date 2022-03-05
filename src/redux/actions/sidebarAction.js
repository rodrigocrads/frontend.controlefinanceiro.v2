import type from '../actionTypes';

export const togglSidebarShow = value => ({
    type: type.TOGGL_SIDEBAR_SHOW,
    payload: value
});
