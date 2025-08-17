"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-merge-refs";
exports.ids = ["vendor-chunks/react-merge-refs"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-merge-refs/dist/react-merge-refs.esm.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-merge-refs/dist/react-merge-refs.esm.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction mergeRefs(refs) {\n  return function (value) {\n    refs.forEach(function (ref) {\n      if (typeof ref === \"function\") {\n        ref(value);\n      } else if (ref != null) {\n        ref.current = value;\n      }\n    });\n  };\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mergeRefs);\n//# sourceMappingURL=react-merge-refs.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtbWVyZ2UtcmVmcy9kaXN0L3JlYWN0LW1lcmdlLXJlZnMuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7QUFDekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3NtaWMtcG9ydGZvbGlvLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1lcmdlLXJlZnMvZGlzdC9yZWFjdC1tZXJnZS1yZWZzLmVzbS5qcz9iMTUxIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIG1lcmdlUmVmcyhyZWZzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZWZzLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgICAgaWYgKHR5cGVvZiByZWYgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZWYodmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChyZWYgIT0gbnVsbCkge1xuICAgICAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtZXJnZVJlZnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFjdC1tZXJnZS1yZWZzLmVzbS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-merge-refs/dist/react-merge-refs.esm.js\n");

/***/ })

};
;