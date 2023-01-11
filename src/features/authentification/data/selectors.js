



export const selectCurrentUser = (state) => {
    return state.user
  }


  export const selectCurrentUrlPid = (state) => {
    return state.currentUrlPid
  }

  export const selectCurrentUserPid = (state) => {
    return state.user.userArray.pid
  }