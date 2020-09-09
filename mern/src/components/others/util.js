export const cookieExpirationDate = new Date(new Date().getTime() + 30 * 60 * 1000);

//Deep Copy
export function deepcopy(aObject) {
  if (!aObject) {
    return aObject;
  }

  let v;
  let bObject = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === "object") ? deepcopy(v) : v;
  }

  return bObject;
}