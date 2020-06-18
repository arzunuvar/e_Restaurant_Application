export function IsNullOrEmpty(str) {
  return !str || str == undefined || str === 'undefined' || str == null || str === "null" || str == "" ? true : false;
}

export function IsFunction(method) {
  if (method && method != "" && typeof method === 'function') {
    return true;
  }
  return false;
}