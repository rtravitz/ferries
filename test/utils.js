/* 
Clever way to externally resolve a promise. Useful for testing behavior on things
like loading screens that change meaningfully during and after something async like network IO.

https://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
*/
export function defer() {
  let res, rej;

  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}
