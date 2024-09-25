"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESStatus = exports.ECommandType = exports.ECommandProcessingStatus = void 0;
var ECommandProcessingStatus;
(function (ECommandProcessingStatus) {
    ECommandProcessingStatus["Pending"] = "Pending";
    ECommandProcessingStatus["InProgress"] = "In Progress";
    ECommandProcessingStatus["Failed"] = "Failed";
    ECommandProcessingStatus["Complete"] = "Completed";
})(ECommandProcessingStatus || (exports.ECommandProcessingStatus = ECommandProcessingStatus = {}));
var ECommandType;
(function (ECommandType) {
    ECommandType["Event"] = "Event";
    ECommandType["Rest"] = "Rest";
})(ECommandType || (exports.ECommandType = ECommandType = {}));
exports.ESStatus = ['Active', 'Inactive'];
//# sourceMappingURL=command-source.enum.js.map