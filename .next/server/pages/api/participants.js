"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/participants";
exports.ids = ["pages/api/participants"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./pages/api/participants.js":
/*!***********************************!*\
  !*** ./pages/api/participants.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://xfztyobcoebcckcneaxg.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmenR5b2Jjb2ViY2NrY25lYXhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMTYxOTMsImV4cCI6MjA1Mzc5MjE5M30.AEzek4wb6_AJWKUFlCPkCPUGZbhkumwq0oYvZIXM9y4\");\nasync function handler(req, res) {\n    if (req.method === \"GET\") {\n        try {\n            const { data , error  } = await supabase.from(\"participants\").select(\"full_name\");\n            if (error) {\n                throw error;\n            }\n            // Sort and remove duplicates\n            const uniqueSortedNames = [\n                ...new Set(data.map((record)=>record.full_name).sort((a, b)=>a.localeCompare(b))), \n            ];\n            res.status(200).json(uniqueSortedNames);\n        } catch (error1) {\n            res.status(500).json({\n                error: \"Error fetching participants\"\n            });\n        }\n    } else {\n        res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcGFydGljaXBhbnRzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFxRDtBQUVyRCxNQUFNQyxRQUFRLEdBQUdELG1FQUFZLENBQzNCRSwwQ0FBb0MsRUFDcENBLGtOQUF5QyxDQUMxQztBQUVjLGVBQWVJLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsSUFBSUQsR0FBRyxDQUFDRSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3hCLElBQUk7WUFDRixNQUFNLEVBQUVDLElBQUksR0FBRUMsS0FBSyxHQUFFLEdBQUcsTUFBTVYsUUFBUSxDQUNuQ1csSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUNwQkMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUV0QixJQUFJRixLQUFLLEVBQUU7Z0JBQ1QsTUFBTUEsS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELDZCQUE2QjtZQUM3QixNQUFNRyxpQkFBaUIsR0FBRzttQkFDckIsSUFBSUMsR0FBRyxDQUFDTCxJQUFJLENBQUNNLEdBQUcsQ0FBQyxDQUFDQyxNQUFNLEdBQUtBLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDQyxDQUFDLEVBQUVDLENBQUMsR0FBS0QsQ0FBQyxDQUFDRSxhQUFhLENBQUNELENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEY7WUFHRGIsR0FBRyxDQUFDZSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQ1YsaUJBQWlCLENBQUMsQ0FBQztRQUMxQyxFQUFFLE9BQU9ILE1BQUssRUFBRTtZQUNkSCxHQUFHLENBQUNlLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO2dCQUFFYixLQUFLLEVBQUUsNkJBQTZCO2FBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7SUFDSCxPQUFPO1FBQ0xILEdBQUcsQ0FBQ2UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRWIsS0FBSyxFQUFFLG9CQUFvQjtTQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2h5ZHJhdGlvbi1nb2Fscy8uL3BhZ2VzL2FwaS9wYXJ0aWNpcGFudHMuanM/ZDBkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xuXG5jb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChcbiAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLFxuICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xuICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgLmZyb20oJ3BhcnRpY2lwYW50cycpXG4gICAgICAgIC5zZWxlY3QoJ2Z1bGxfbmFtZScpO1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIC8vIFNvcnQgYW5kIHJlbW92ZSBkdXBsaWNhdGVzXG4gICAgICBjb25zdCB1bmlxdWVTb3J0ZWROYW1lcyA9IFtcbiAgICAgICAgLi4ubmV3IFNldChkYXRhLm1hcCgocmVjb3JkKSA9PiByZWNvcmQuZnVsbF9uYW1lKS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpKSxcbiAgICAgIF07XG5cblxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24odW5pcXVlU29ydGVkTmFtZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRXJyb3IgZmV0Y2hpbmcgcGFydGljaXBhbnRzJyB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJjcmVhdGVDbGllbnQiLCJzdXBhYmFzZSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0IiwidW5pcXVlU29ydGVkTmFtZXMiLCJTZXQiLCJtYXAiLCJyZWNvcmQiLCJmdWxsX25hbWUiLCJzb3J0IiwiYSIsImIiLCJsb2NhbGVDb21wYXJlIiwic3RhdHVzIiwianNvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/participants.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/participants.js"));
module.exports = __webpack_exports__;

})();