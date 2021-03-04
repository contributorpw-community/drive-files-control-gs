function uiActionRemoveUser(email) {
  const service = new Service();
  return service.removeUserFromMyFilesByEmail(email);
}
