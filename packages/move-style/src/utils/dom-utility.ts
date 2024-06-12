import _ from "lodash";

const _canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

export function canUseDOM() {
  return _canUseDOM;
}

export function waitVariable(varExp: string, context?: any) {
  return new Promise((resolve) => {
    if (!canUseDOM()) {
      resolve(null);
      return;
    }

    let handler;
    function doCheck() {
      const names = varExp.split(".");
      let result = context || window;
      for (const name of names) {
        result = result[name];
        if (_.isUndefined(result) || _.isNull(result)) {
          return;
        }
      }
      clearInterval(handler);
      resolve(result);
    }

    handler = setInterval(doCheck, 200);
    doCheck();
  });
}
