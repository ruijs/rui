console.log("expression interpreter profiling");

const moveStyle = require("../dist/mod");
const _ = require("lodash");

const { Framework, Page, ExpressionInterpreter } = moveStyle;

const rootVars = {};
rootVars.$framework = new Framework();
rootVars.$page = new Page(rootVars.$framework, { view: [] });
rootVars._ = _;
rootVars.$self = {
  $id: "id",
  $type: "type",
  width: "10px",
  height: "10px",
  top: "10px",
  left: "10px",
  $exps: {
    _hidden: "false",
  },
};

const interpreter = new ExpressionInterpreter(rootVars.$framework.getLogger("other"));

console.time("interprete");
for (let i = 0; i < 10000; i++) {
  interpreter.interprete("$self.id", rootVars);
}
console.timeEnd("interprete");
