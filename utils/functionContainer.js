/* global J$ */

"use strict";

(function (sandbox) {
	var getTypeOfForReporting = sandbox.functions.getTypeOfForReporting;

	function FunctionContainer(f, isConstructor) {
		this.functionId = f.functionId;
		this.functionName = getFunctionName(f);

		this.isConstructor = (isConstructor === true);
		this.args = {};
		this.declarationEnclosingFunctionId = f.declarationEnclosingFunctionId;
		this.returnTypeOfs = [];
		this.functionIid = null;

		this.addArgumentContainer = function(argumentIndex, argumentContainer) {
			if (!(argumentIndex in this.args)) {
				this.args[argumentIndex] = argumentContainer;
			} else {
				this.args[argumentIndex].interactions = this.args[argumentIndex].interactions.concat(argumentContainer.interactions);
			}
		};

		this.addReturnTypeOf = function(typeOf) {
			if (this.returnTypeOfs.indexOf(typeOf) === -1) {
				this.returnTypeOfs.push(getTypeOfForReporting(typeOf));
			}
		};

		this.getArgumentContainer = function(argumentIndex) {
			return this.args[argumentIndex];
		};

		function getFunctionName(f) {
			var functionName = f.name;

			if (f.methodName) {
				functionName = f.methodName;
			}

			return functionName;
		}
	}

	if (sandbox.utils === undefined) {
		sandbox.utils = {};
	}

	sandbox.utils.FunctionContainer = FunctionContainer;
}(J$));