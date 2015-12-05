(function(){var t={},e=function(){!function(t){t.on=function(t,e){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(e),this},t.removeListener=function(t,e){if(this._ev&&this._ev[t])for(var i=this._ev[t],n=0;n<i.length;n++)if(i[n]==e)return void i.splice(n,1)},t.trigger=function(t,e,i){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(e,i)}),this}}}(this),function(t){t.ArrayExpression=function(t,e){var i=this;if(t.elements&&t.elements.length>=0){this.out("[");var n=0;t.elements.forEach(function(t){n++>0&&i.out(","),i.trigger("ArrayElement",t),i.walk(t,e)}),this.out("]"),t.eval_res=[],t.elements.forEach(function(n){var r=n.eval_res||i.evalVariable(n,e);t.eval_res.push(r)})}},t.ArrayPattern=function(t,e){var i=this;if(t.elements&&t.elements.length>0){this.out("[");var n=0;t.elements.forEach(function(t){n++>0&&i.out(","),i.trigger("ArrayElement",t),i.walk(t,e)}),this.out("]")}},t.ArrowExpression=function(){},t.ArrowFunctionExpression=function(t,e){this.out("function"),t.generator&&(this.trigger("FunctionGenerator",t),this.out("* ")),t.id&&t.id.name?(console.log("ERROR: ArrowFunctionExpression should not have name"),this.trigger("FunctionName",t),this.out(" "+t.id.name+" ")):this.trigger("FunctionAnonymous",t);var i=this;this.out("(");var n=0;t.params.forEach(function(r){if(n++>0&&i.out(","),i.trigger("FunctionParam",r),i.walk(r,e),t.defaults&&t.defaults[n-1]){var s=t.defaults[n-1];i.out("="),i.trigger("FunctionDefaultParam",s),i.walk(s,e)}}),this.out(")"),i.trigger("FunctionBody",t.body),this.walk(t.body,e)},t.AssignmentExpression=function(t,e){this.trigger("AssigmentLeft",t.left),this.walk(t.left,e),this.out(" "+t.operator+" "),this.trigger("AssigmentRight",t.right),this.walk(t.right,e);var i=t.right.eval_res;if("undefined"==typeof i&&(i=this.evalVariable(t.right,e)),"="==t.operator){if("MemberExpression"==t.left.type){var n,r;return n="undefined"!=typeof t.left.object.eval_res?t.left.object.eval_res:this.evalVariable(t.left.object,e),r=t.left.computed?"undefined"!=typeof t.left.property.eval_res?this.evalVariable(t.left.property.eval_res,e):this.evalVariable(t.left.property.name,e):t.left.property.name,void(n&&r&&(n[r]=i))}this.assignTo(t.left.name,e,i)}},t.assignTo=function(t,e,i){var n;if("object"==typeof t){var r=t;"Identifier"==r.type&&(n=r.name),"Literal"==r.type&&(n=r.value)}else n=t;"undefined"!=typeof e.variables[n]?e.variables[n]=i:e.parentCtx&&this.assignTo(n,e.parentCtx,i)},t.BinaryExpression=function(t,e){var i=!0,n=!0;("Identifier"==t.left.type||"Literal"==t.left.type)&&(i=!1),("Identifier"==t.right.type||"Literal"==t.right.type)&&(n=!1),i&&this.out("("),this.walk(t.left,e),i&&this.out(")"),this.out(" "+t.operator+" "),n&&this.out("("),this.walk(t.right,e),n&&this.out(")");var r=t.left.eval_res,s=t.right.eval_res;"undefined"==typeof r&&(r=this.evalVariable(t.left,e)),"undefined"==typeof s&&(s=this.evalVariable(t.right,e)),"undefined"!=typeof r&&"undefined"!=typeof s?("+"==t.operator&&(t.eval_res=r+s),"-"==t.operator&&(t.eval_res=r-s),"*"==t.operator&&(t.eval_res=r*s),"/"==t.operator&&(t.eval_res=r/s),"<"==t.operator&&(t.eval_res=s>r),"<="==t.operator&&(t.eval_res=s>=r),">"==t.operator&&(t.eval_res=r>s),">="==t.operator&&(t.eval_res=r>=s),"&"==t.operator&&(t.eval_res=r&s),"=="==t.operator&&(t.eval_res=r==s),"!="==t.operator&&(t.eval_res=r!=s),"==="==t.operator&&(t.eval_res=r===s),"!=="==t.operator&&(t.eval_res=r!==s)):console.error("Undefined variable in BinaryExpression")},t.BlockStatement=function(t,e){this.out(" {",!0),this.indent(1),this.walk(t.body,e,!0),this.indent(-1),this.out("}")},t.BreakStatement=function(t,e){this.nlIfNot(),this.out("break "),t.label&&this.walk(t.label,e),this.out("",!0)},t.breakWalk=function(){this._breakWalk=!0},t.CallExpression=function(t,e){if(t.callee){if("FunctionExpression"==t.callee.type&&this.out("("),this.walk(t.callee,e),"FunctionExpression"==t.callee.type&&this.out(")"),this.out("("),t.arguments){var i=this,n=0;t.arguments.forEach(function(t){n++>0&&i.out(", "),i.walk(t,e)})}this.out(")");var i=this;if("undefined"!=typeof t.callee.eval_res){var r=[],s=t.callee.eval_res;t.arguments&&t.arguments.forEach(function(t){r.push("undefined"!=typeof t.eval_res?t.eval_res:i.evalVariable(t,e))});var o=e["this"];"MemberExpression"==t.callee.type&&(o=t.callee.object.eval_res),"ThisExpression"==t.callee.type&&e.parentCtx&&(o=e.parentCtx["this"]),"function"==typeof s&&(t.eval_res=s.apply(o,r))}}},t.CatchClause=function(t,e){this.out(" catch "),t.param&&(this.out("("),this.walk(t.param,e),this.out(")")),t.body&&this.walk(t.body,e)},t.ClassBody=function(t,e){this.out("{",!0),this.indent(1),this.walk(t.body,e),this.indent(-1),this.out("}",!0)},t.ClassDeclaration=function(t,e){this.out("class "),t.id&&(this.walk(t.id,e),this.out(" ")),t.superClass&&(this.trigger("Extends",t.superClass),this.out(" extends "),this.walk(t.superClass,e)),t.body&&this.walk(t.body,e)},t.ConditionalExpression=function(t,e){this.walk(t.test,e),this.out(" ? "),this.walk(t.consequent,e),this.out(" : "),this.walk(t.alternate,e)},t.ContinueStatement=function(t,e){this.nlIfNot(),this.out("continue "),t.label&&this.walk(t.label,e),this.out("",!0)},t.DebuggerStatement=function(){this.nlIfNot(),this.out("debugger;")},t.DoWhileStatement=function(t,e){if(this.nlIfNot(),this.out("do ",!0),t.body){var i=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(i=!0),i&&(this.out("{"),this.indent(1)),this.walk(t.body,e),i&&(this.indent(-1),this.out("}"))}this.out(" "),t.test&&(this.out("while("),this.trigger("DoWhileTest",t.test),this.walk(t.test,e),this.out(")")),this.out("",!0)},t.EmptyStatement=function(){},t.endBlock=function(){this.out("}",!0),this.indent(-1)},t.endCollecting=function(){this._collecting=!1},t.evalVariable=function(t,e){var i;if("object"==typeof t){if(t.eval_res)return t.eval_res;var n=t;"Identifier"==n.type&&(i=n.name),"Literal"==n.type&&(i=n.value)}else i=t;return"undefined"!=typeof e.variables[i]?e.variables[i]:e.parentCtx?this.evalVariable(i,e.parentCtx):window[i]},t.ExpressionStatement=function(t,e){this.nlIfNot(),this.walk(t.expression,e),this.out(";",!0),t.eval_res=t.expression.eval_res},t.findThis=function(t){return t["this"]?t["this"]:t.parentCtx?this.findThis(t.parentCtx):window},t.ForInStatement=function(t,e){if(this.nlIfNot(),this.out("for("),t.left&&(this.trigger("ForInLeft",t.left),this.walk(t.left,e)),this.out(" in "),t.right&&(this.trigger("ForInRight",t.right),this.walk(t.right,e)),this.out(")"),t.body){this.trigger("ForInBody",t.body);var i=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(i=!0),i&&(this.out("{"),this.indent(1)),this.walk(t.body,e),i&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.ForOfStatement=function(t,e){if(this.nlIfNot(),this.out("for("),t.left&&(this.trigger("ForOfLeft",t.left),this.walk(t.left,e)),this.out(" of "),t.right&&(this.trigger("ForOfRight",t.right),this.walk(t.right,e)),this.out(")"),t.body){this.trigger("ForOfBody",t.body);var i=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(i=!0),i&&(this.out("{"),this.indent(1)),this.walk(t.body,e),i&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.ForStatement=function(t,e){if(this.out("for("),t.init&&this.walk(t.init,e),this.out("; "),t.test&&this.walk(t.test,e),this.out("; "),t.update&&this.walk(t.update,e),this.out(")"),t.body){var i=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(i=!0),i&&(this.out("{"),this.indent(1)),this.walk(t.body,e),i&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.FunctionDeclaration=function(t,e){var n=this;t.eval_res=function(){if(!n.isKilled()){for(var r=[],s=arguments.length,o=arguments,a={functions:{},vars:{},variables:{},parentCtx:e},l=new i,h=0;s>h;h++)r[h]=arguments[h];var h=0;return t.params.forEach(function(i){"undefined"!=typeof o[h]?a.variables[i.name]=o[h]:t.defaults&&t.defaults[h]&&(n.walk(t.defaults[h],e),a.variables[i.name]=t.defaults[h].eval_res),h++}),l.startWalk(t.body,a),a.return_value}},t.id&&t.id.name&&(e.variables[t.id.name]=t.eval_res)},t.FunctionExpression=function(t,e){var n=this;t.eval_res=function(){if(!n.isKilled()){for(var r=[],s=arguments.length,o=arguments,a={functions:{},vars:{},variables:{},parentCtx:e},l=new i,h=0;s>h;h++)r[h]=arguments[h];var h=0;return t.params.forEach(function(i){"undefined"!=typeof o[h]?a.variables[i.name]=o[h]:t.defaults&&t.defaults[h]&&(n.walk(t.defaults[h],e),a.variables[i.name]=t.defaults[h].eval_res),h++}),l.startWalk(t.body,a),a.return_value}},t.id&&t.id.name&&(e.variables[t.id.name]=t.eval_res)},t.getCode=function(){return this._codeStr},t.getParentProcess=function(){return this._parentProcess},t.getStructures=function(){return this._structures},t.Identifier=function(t,e){this.out(t.name),t.eval_res=this.evalVariable(t.name,e)},t.IfStatement=function(t,e){if(this.nlIfNot(),this.out("if("),this.trigger("IfTest",t.test),this.walk(t.test,e),this.out(")"),t.consequent){var i=!1;"BlockStatement"!=t.consequent.type&&(i=!0),this.trigger("IfConsequent",t.consequent),i&&(this.out("{"),this.indent(1)),this.walk(t.consequent,e),i&&(this.indent(-1),this.out("}"))}if(t.alternate){this.out(" else ");var i=!1;"BlockStatement"!=t.alternate.type&&(i=!0),this.trigger("IfAlternate",t.alternate),i&&(this.out("{"),this.indent(1)),this.walk(t.alternate,e),i&&(this.indent(-1),"{"!=this.prevChar()&&this.out("",!0),this.out("}"))}this.out("",!0)},t.indent=function(t){this._indent+=t,this._indent<0&&(this._indent=0)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._structures=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=t||{}}),t.isKilled=function(){if(this._isKilled)return!0;var t=this.getParentProcess();return t?t.isKilled():void 0},t.isPaused=function(){if(this._isPaused)return!0;var t=this.getParentProcess();return t?t.isPaused():void 0},t.kill=function(){this._isKilled=!0},t.LabeledStatement=function(t,e){this.nlIfNot(),this.walk(t.label,e),this.out(":",!0),this.indent(1),t.body&&this.walk(t.body,e),this.indent(-1)},t.Literal=function(t){this.out(t.raw),t.eval_res=t.value,t.eval_type=typeof t.value},t.LogicalExpression=function(t,e){var i=!0,n=!0;("Identifier"==t.left.type||"Literal"==t.left.type)&&(i=!1),("Identifier"==t.right.type||"Literal"==t.right.type)&&(n=!1),i&&this.out("("),this.walk(t.left,e),i&&this.out(")"),t.operator&&this.out(" "+t.operator+" "),n&&this.out("("),this.walk(t.right,e),n&&this.out(")")},t.MemberExpression=function(t,e){this.trigger("MemberExpressionObject",t.object);var i=!0;("Identifier"==t.object.type||"Literal"==t.object.type||"ThisExpression"==t.object.type)&&(i=!1,"number"==typeof t.object.value&&(i=!0)),i&&this.out("("),this.walk(t.object,e),i&&this.out(")"),t.computed?(this.out("["),this.trigger("MemberExpressionProperty",t.property),this.walk(t.property,e),this.out("]")):(this.out("."),this.trigger("MemberExpressionProperty",t.property),this.walk(t.property,e));var n;n="ThisExpression"==t.object.type?this.findThis(e):this.evalVariable(t.object,e);var r;if(t.computed)var r=this.evalVariable(t.property.name,e);else r=t.property.name;if("undefined"!=typeof n)try{t.eval_res=n[r]}catch(s){}},t.MethodDefinition=function(t,e){t.key&&(this.__insideMethod=!0,"constructor"==t.kind&&this.trigger("ClassConstructor",t),t.static&&this.out("static "),this.walk(t.key,e),this.walk(t.value,e),this.out("",!0),this.__insideMethod=!1)},t.NewExpression=function(t,e){if(t.callee){if(this.out(" new "),this.trigger("NewExpressionClass",t.callee),this.walk(t.callee,e),this.out("("),t.arguments){var i=this,n=0;t.arguments.forEach(function(t){i.trigger("NewExpressionArgument",t),n++>0&&i.out(", "),i.walk(t,e)})}this.out(")")}},t.nlIfNot=function(){var t=this._currentLine.length;t>0&&("{"==this._currentLine[t-1]||";"==this._currentLine[t-1]?this.out("",!0):this.out(";",!0))},t.ObjectExpression=function(t,e){var i=this;try{i.out("{");var n=0;t&&t.properties&&(t.properties.length>1&&i.out("",!0),i.indent(1),t.properties.forEach(function(t){n++>0&&i.out(",",!0),i.trigger("ObjectExpressionProperty",t),i.walk(t,e)}),i.indent(-1)),i.out("}"),t.eval_res={},t.properties&&t.properties.forEach(function(n){var r=n.value.eval_res||i.evalVariable(n.value,e),s=n.key.eval_res;"undefined"==typeof s&&(s=i.evalVariable(n.key,e)),t.eval_res[s]=r})}catch(r){console.error(r.message)}},t.ObjectPattern=function(t,e){var i=this;try{i.out("{");var n=0;t&&t.properties&&t.properties.forEach(function(t){n++>0&&i.out(","),i.trigger("ObjectExpressionProperty",t),i.walk(t,e)}),i.out("}")}catch(r){console.error(r.message)}},t.out=function(t,e){if(!this._options.noOutput){if(this._collecting){if(t){if(0==this._collectLine.length)for(var i=0;i<this._indent;i++)this._collectLine+=this._tabChar;this._collectLine+=t}return void(e&&(this._collectStr+=this._collectLine+"\n",this._collectLine="",this._collectStr+="\n"))}if(t){if(0==this._currentLine.length)for(var i=0;i<this._indent;i++)this._currentLine+=this._tabChar;this._currentLine+=t}e&&(this._codeStr+=this._currentLine+"\n",this._currentLine="")}},t.prevChar=function(){var t=this._currentLine.length;return t>0?this._currentLine[t-1]:"\n"},t.Program=function(t,e){this.walk(t.body,e,!0)},t.Property=function(t,e){if(this.trigger("ObjectPropertyKey",t.key),this.walk(t.key,e),t.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",t.value),this.walk(t.value,e)),t.key.computed){var i=this.evalVariable(t.key,e);"undefined"!=typeof i&&(t.key.eval_res=i)}else t.key.eval_res=t.key.name},t.pushStructure=function(t){this._structures||(this._structures=[]),this._structures.push(t)},t.RestElement=function(t,e){t.argument&&this.trigger("RestArgument",t.argument),this.out(" ..."),this.walk(t.argument,e)},t.ReturnStatement=function(t,e){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",t.argument),this.walk(t.argument,e),this.out(";"),e.return_value=t.argument.eval_res},t.SequenceExpression=function(t,e){if(t.expressions){var i=this,n=0;this.out("("),t.expressions.forEach(function(t){n++>0&&i.out(","),i.walk(t,e)}),this.out(")")}},t.setParentProcess=function(t){this._parentProcess=t,t._childProcess||(t._childProcess=[]),t._childProcess.indexOf(this)<0&&t._childProcess.push(t)},t.setPaused=function(t){this._isPaused=t},t.skip=function(){this._skipWalk=!0},t.startBlock=function(){this.out("{",!0),this.indent(1)},t.startCollecting=function(){this._collecting=!0},t.startWalk=function(t,e){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",this.walk(t,e),this.out("",!0)},t.Super=function(){this.out("super")},t.SwitchCase=function(t,e){if(this.nlIfNot(),t.test?(this.out("case "),this.walk(t.test,e),this.out(" : ",!0)):this.out("default: ",!0),t.consequent){var i=this;t.consequent.forEach(function(t){i.walk(t,e)})}},t.SwitchStatement=function(t,e){this.nlIfNot(),this.out("switch("),this.walk(t.discriminant,e),this.out(")"),this.out("{",!0),this.indent(1);var i=this;t.cases.forEach(function(t){i.walk(t,e)}),this.indent(-1),this.out("}",!0)},t.ThisExpression=function(){this.out("this")},t.ThrowStatement=function(t,e){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",t.argument),this.walk(t.argument,e)},t.TryStatement=function(t,e){this.out("try "),this.walk(t.block,e),t.handler&&this.walk(t.handler,e),t.finalizer&&(this.out(" finally "),this.walk(t.finalizer,e))},t.UnaryExpression=function(t,e){var i=!0;("Identifier"==t.argument.type||"Literal"==t.argument.type)&&(i=!1),this.out(t.operator),"!"!=t.operator&&this.out(" "),i&&this.out("("),this.trigger("UnaryExpressionArgument",t.argument),this.walk(t.argument,e),i&&this.out(")");var n=t.argument.eval_res||this.evalVariable(t.argument,e);"undefined"!=typeof n&&("-"==t.operator&&(t.eval_res=-1*n),"!"==t.operator&&(t.eval_res=!n),"+"==t.operator&&(t.eval_res=+n),"delete"==t.operator&&console.error("Delete unary operator not defined"),"typeof"==t.operator&&(t.eval_res=typeof n),"void"==t.operator&&(t.eval_res=void n))},t.UpdateExpression=function(t,e){this.trigger("UpdateExpressionArgument",t.argument),this.walk(t.argument,e),this.out(t.operator);var i=t.argument.eval_value;"undefined"==typeof i&&(i=this.evalVariable(t.argument,e));var n=function(t,e,i){if("MemberExpression"==t.type){var n,r;return n="undefined"!=typeof t.object.eval_res?t.object.eval_res:this.evalVariable(t.object,e),r=t.computed?"undefined"!=typeof t.property.eval_res?this.evalVariable(t.property.eval_res,e):this.evalVariable(t.property.name,e):t.property.name,void(n&&r&&(n[r]=i))}this.assignTo(t,e,i)};"++"==t.operator&&"undefined"!=typeof i&&(t.prefix&&(t.eval_value=i),i++,t.prefix||(t.eval_value=i),n(t.argument,e,i))},t.VariableDeclaration=function(t,e){var i=this,n=0;"var"==t.kind&&i.out("var "),"let"==t.kind&&i.out("let "),"const"==t.kind&&i.out("const ");var r=0;t.declarations.forEach(function(t){n++>0&&(2==n&&(r+=2,i.indent(r)),i.out(",",!0)),i.walk(t,e)}),this.indent(-1*r)},t.VariableDeclarator=function(t,e){var i=this;t.id&&i.walk(t.id,e),t.init&&(this.out(" = "),i.walk(t.init,e),t.id.name&&t.init.eval_res&&(e.variables||(e.variables={}),e.variables[t.id.name]=t.init.eval_res))},t.walk=function(t,e,i){if(t&&!this.isKilled()){if(!e)return console.log("ERROR: no context defined for ",t),void console.trace();if(t instanceof Array){var n=this;this.trigger("nodeArray",t),t.forEach(function(t){n.walk(t,e),i&&n.nlIfNot()})}else if(t.type){var r={node:t,ctx:e};if(this.trigger("node",r),this.trigger(t.type,r),this._skipWalk)return void(this._skipWalk=!1);this._wCb&&this._wCb(t),this[t.type]?(this._path.push(t),this[t.type](t,e),this._path.pop()):(console.log("Did not find "+t.type),console.log(t)),this.trigger("After"+t.type,t)}}},t.walkAsString=function(t,e){var i="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(t,e),i=this._collectStr,this.endCollecting()}catch(n){}return i},t.WhileStatement=function(t,e){if(this.nlIfNot(),this.out("while "),t.test&&(this.trigger("WhileTest",t.test),this.out("("),this.walk(t.test,e),this.out(")")),t.body){var i=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(i=!0),i&&(this.out("{"),this.indent(1)),this.walk(t.body,e),i&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.WithStatement=function(){console.error("With statement is not supported")},t.YieldExpression=function(t,e){this.out("yield "),this.walk(t.argument,e)}}(this)},i=function(t,e,n,r,s,o,a,l){var h,u=this;if(!(u instanceof i))return new i(t,e,n,r,s,o,a,l);var f=[t,e,n,r,s,o,a,l];if(u.__factoryClass)if(u.__factoryClass.forEach(function(t){h=t.apply(u,f)}),"function"==typeof h){if(h._classInfo.name!=i._classInfo.name)return new h(t,e,n,r,s,o,a,l)}else if(h)return h;u.__traitInit?u.__traitInit.forEach(function(t){t.apply(u,f)}):"function"==typeof u.init&&u.init.apply(u,f)};i._classInfo={name:"ASTEval"},i.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.ASTEval=i,this.ASTEval=i):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTEval=i:this.ASTEval=i}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());