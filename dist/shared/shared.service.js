"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMapping = exports.activity_icon = exports.app_variables = exports.app_report_key = exports.app_date_ranges = exports.SharedService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_exception_1 = require("./app-exception");
const currency_service_1 = require("./currency/currency.service");
const command_source_enum_1 = require("./enum/command-source.enum");
const event_emitter_1 = require("@nestjs/event-emitter");
var TinyURL = require("tinyurl");
var aes256 = require("aes256");
let SharedService = class SharedService {
    constructor(Sequence, commandSourceModel, config, eventEmitter, currency_service) {
        this.Sequence = Sequence;
        this.commandSourceModel = commandSourceModel;
        this.config = config;
        this.eventEmitter = eventEmitter;
        this.currency_service = currency_service;
        this.defaultLanguage = "en";
        this.defaultExtension = "+91";
        this.schemas = {};
    }
    fetchName(nameArr, lang) {
        try {
            if (!nameArr || nameArr.length <= 0) {
                return;
            }
            let name = nameArr.find((el) => {
                if (el.language === lang)
                    return el;
            })?.description;
            return name || "";
        }
        catch (err) {
            throw err;
        }
    }
    async createSequence(tenant, name, defaultValue) {
        await this.Sequence.create({ tenant, name, value: defaultValue });
    }
    async getNextNumber(sequenceName, prefix = null, length = null, transaction_series_id = null) {
        let seq = await this.Sequence.findOneAndUpdate({
            name: sequenceName,
            transaction_series_id: transaction_series_id,
            prefix: prefix,
            length: length,
        }, { $inc: { value: 1 } }, { new: true, upsert: true });
        let return_value = `${seq.value}`;
        if (length) {
            return_value = `${seq.value}`.padStart(length, "0");
        }
        if (prefix) {
            return_value = `${prefix}${return_value}`;
        }
        return return_value;
    }
    async updateEventProcessingStatus(commandSource, status) {
        commandSource.status = status;
        await commandSource.save();
    }
    async trackAndEmitEvent(eventName, event, isAsync = true, userDetails) {
        try {
            console.log("inside track and emit event");
            const commandSource = {
                userId: userDetails?.userId,
                resourceUri: userDetails?.resourceUri,
                aggregateId: null,
                action: userDetails?.action,
                type: command_source_enum_1.ECommandType.Event,
                commandData: event,
                aggregateType: eventName,
                isCompositeIndex: false,
                status: command_source_enum_1.ECommandProcessingStatus.Pending,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const commandSourceCreate = await this.commandSourceModel.create(commandSource);
            console.log("commandSourceCreate", commandSourceCreate);
            event["commandSource"] = commandSourceCreate;
            if (isAsync) {
                await this.eventEmitter.emitAsync(eventName, event);
                return;
            }
            this.eventEmitter.emitAsync(eventName, event);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    processError(err, context) {
        let code, response;
        if (err instanceof app_exception_1.AppException) {
            code = err.getCode();
            response = { code, message: err.getMessage() };
        }
        else {
            if (err.name == "MongoError") {
                if (err["code"] == 11000) {
                    let prop = "Value";
                    try {
                        prop = err.message.split(":")[2].replace(" dup key", "").trim();
                    }
                    catch (properr) {
                        console.log("cant get prop");
                    }
                    code = common_1.HttpStatus.NOT_ACCEPTABLE;
                    response = { code, message: `${prop} provided already exist` };
                }
                else {
                    code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                    response = { code, message: err.message };
                }
            }
            else {
                code = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
                response = { code, message: err.message };
            }
        }
        console.log("going to process err", err.stack);
        return { code, response };
    }
    mediaMapping(data, media, media_details, delete_key = null) {
        data.forEach((ele) => {
            this.accessByString(ele, media).forEach((m) => {
                let data = this.accessByString(ele, media_details).find((x) => x._id.toString() == m.media_id.toString());
                m["location"] = data?.location;
                m["meta"] = {
                    media_type: data?.media_type,
                    media_format: data?.media_format,
                    media_size: data?.media_size,
                    file_name: data?.file_name,
                };
            });
            if (delete_key)
                delete ele[delete_key];
        });
        return data;
    }
    accessByString(o, s) {
        s = s.replace(/\[(\w+)\]/g, ".$1");
        s = s.replace(/^\./, "");
        var a = s.split(".");
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            }
            else {
                return;
            }
        }
        return o;
    }
    formatText(input_string, linkby) {
        input_string = input_string.replace(/[^a-zA-Z0-9 ]/g, linkby);
        let formatted_arr = input_string.split(" ").map((character) => {
            return character.toLowerCase();
        });
        let formatted_string = formatted_arr.join(linkby);
        return formatted_string;
    }
    getDateRange(type) {
        try {
            let startdate;
            let enddate;
            let n = new Date();
            let fy = n.getFullYear();
            let mn = n.getMonth();
            let dt = n.getDate();
            switch (type) {
                case "this_month":
                    startdate = new Date(fy, mn, 1, 0, 0, 0);
                    enddate = new Date(fy, mn + 1, -1, 23, 59, 0);
                    break;
                case "this_week":
                    startdate = new Date(fy, mn, dt - 7, 0, 0, 0);
                    enddate = n;
                    break;
                case "yesterday":
                    startdate = new Date(fy, mn, dt - 1, 0, 0, 0);
                    enddate = new Date(fy, mn, dt - 1, 23, 59, 0);
                    break;
                case "today":
                    startdate = new Date(fy, mn, dt, 0, 0, 0);
                    enddate = new Date(fy, mn, dt, 23, 59, 0);
                    break;
                case "last_six_months":
                    startdate = new Date(fy, mn - 5, 1, 0, 0, 0);
                    enddate = new Date(fy, mn + 1, -1, 23, 59, 0);
                    break;
                case "last_twelve_months":
                    startdate = new Date(fy, mn - 11, 1, 0, 0, 0);
                    enddate = new Date(fy, mn + 1, -1, 23, 59, 0);
                    break;
                default:
                    break;
            }
            return { startdate, enddate };
        }
        catch (err) {
            throw err;
        }
    }
    async currencyFormatter(currency_amount, currency_code) {
        let amount = currency_amount.toLocaleString();
        return amount;
    }
    async urlShortner(url) {
        try {
            let short_url = await TinyURL.shorten(url);
            return short_url;
        }
        catch (err) {
            throw err;
        }
    }
    applyVariables(input, context) {
        try {
            if (Array.isArray(input)) {
                for (let i = 0; i < input.length; i++) {
                    let sub_input = input[i];
                    let formatted_data = this.applyVariables(sub_input, context);
                    if (typeof sub_input == "string") {
                        input[i] = formatted_data;
                    }
                }
            }
            else if (input && typeof input == "object") {
                let keys = Object.keys(input);
                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let sub_input = input[key];
                    let formatted_data = this.applyVariables(sub_input, context);
                    if (typeof sub_input == "string") {
                        input[key] = formatted_data;
                    }
                }
            }
            else {
                if (typeof input == "string") {
                    if (input.includes("var=>")) {
                        let expr = input.replace("var=>", "");
                        return eval(expr);
                    }
                    else {
                        return input;
                    }
                }
                else {
                    return input;
                }
            }
            return input;
        }
        catch (err) {
            console.log("error in converting ", input);
            throw err;
        }
    }
    timeZoneConvert(offset) {
        offset *= 60;
        var num = Math.abs(offset);
        var hours = num / 60;
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        if (Math.sign(offset) == 1) {
            return "+0" + rhours + ":" + rminutes;
        }
        else {
            return "-0" + rhours + ":" + rminutes;
        }
    }
    formatZoneTime(iso_date, abbr, offset, date_time = false) {
        let zone_time = new Date(iso_date.getTime() + offset * 60 * 60 * 1000);
        let f_date = zone_time.getDate().toString().padStart(2, "0");
        let f_month = (zone_time.getMonth() + 1).toString().padStart(2, "0");
        let f_year = zone_time.getFullYear();
        let f_hour = zone_time.getHours();
        let f_min = zone_time.getMinutes();
        let f_sec = zone_time.getSeconds();
        let formatted_value = `${f_date}-${f_month}-${f_year}`;
        if (date_time)
            formatted_value = `${formatted_value} ${f_hour}:${f_min}:${f_sec}`;
        formatted_value = formatted_value + " " + abbr;
        return formatted_value;
    }
    timeRemaining(end_date, time_difference) {
        let return_value = {
            expired: false,
            expiring_soon: false,
            message: "",
        };
        if (!time_difference) {
            time_difference = new Date(end_date).getTime() - Date.now();
        }
        if (time_difference <= 0) {
            return_value.expired = true;
        }
        else {
            let day_difference = Math.floor(time_difference / (24 * 60 * 60 * 1000));
            let hour_difference = Math.floor(time_difference / (60 * 60 * 1000));
            let min_difference = Math.floor(time_difference / (60 * 60 * 1000));
            if (day_difference > 0) {
                return_value.message = `${day_difference} day${day_difference > 1 ? "s" : ""}`;
            }
            else if (hour_difference) {
                return_value.message = `${hour_difference} hour${hour_difference > 1 ? "s" : ""}`;
            }
            else if (min_difference) {
                return_value.message = `${min_difference} minute${min_difference > 1 ? "s" : ""}`;
            }
            else {
                return_value.expiring_soon = true;
            }
        }
        return return_value;
    }
    initCap(input_string) {
        return (input_string[0].toUpperCase() +
            input_string.substring(1, input_string.length).toLowerCase());
    }
    getDateEndRange(end_date) {
        try {
            if (typeof end_date == "string")
                end_date = new Date(end_date);
            let ms_to_add = 24 * 60 * 60 * 1000 - 1;
            return new Date(end_date.getTime() + ms_to_add);
        }
        catch (err) {
            throw err;
        }
    }
    processAxiosError(error) {
        let response = error.response.data;
        return new app_exception_1.AppException(response.message, response.code);
    }
    encryptMessage(value) {
        try {
            let key = this.config.get("ENCRYPT_KEY");
            let cipher = aes256.createCipher(key);
            let encrypted_value = cipher.encrypt(value);
            return encrypted_value;
        }
        catch (err) {
            throw err;
        }
    }
    decryptMessage(value) {
        try {
            let key = this.config.get("ENCRYPT_KEY");
            let cipher = aes256.createCipher(key);
            let decrypted_value = cipher.decrypt(value);
            return decrypted_value;
        }
        catch (err) {
            throw err;
        }
    }
    generateRandomNumber(start_digit, end_digit) {
        return Math.floor(start_digit + (end_digit - start_digit) * Math.random());
    }
};
exports.SharedService = SharedService;
exports.SharedService = SharedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("sequence")),
    __param(1, (0, mongoose_1.InjectModel)("commandSource")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        event_emitter_1.EventEmitter2,
        currency_service_1.CurrencyService])
], SharedService);
var app_date_ranges;
(function (app_date_ranges) {
    app_date_ranges["all"] = "all";
    app_date_ranges["this_month"] = "this_month";
    app_date_ranges["this_week"] = "this_week";
    app_date_ranges["yesterday"] = "yesterday";
    app_date_ranges["today"] = "today";
    app_date_ranges["last_seven_days"] = "last_seven_days";
    app_date_ranges["last_three_months"] = "last_three_months";
    app_date_ranges["last_six_months"] = "last_six_months";
    app_date_ranges["last_twelve_months"] = "last_twelve_months";
    app_date_ranges["this_year"] = "this_year";
    app_date_ranges["this_financial_year"] = "this_financial_year";
    app_date_ranges["last_financial_year"] = "last_financial_year";
    app_date_ranges["last_year"] = "last_year";
    app_date_ranges["custom"] = "custom";
})(app_date_ranges || (exports.app_date_ranges = app_date_ranges = {}));
var app_report_key;
(function (app_report_key) {
    app_report_key["sales_by_customer"] = "sales-by-customer";
    app_report_key["sales_by_branch"] = "sales-by-branch";
    app_report_key["sales_by_item"] = "sales-by-item";
    app_report_key["invoice_report"] = "invoice-report";
    app_report_key["payment_received_report"] = "payment-received-report";
    app_report_key["customer_balance"] = "customer-balance";
    app_report_key["inventory_summary_report"] = "inventory-summary-report";
})(app_report_key || (exports.app_report_key = app_report_key = {}));
exports.app_variables = {
    default_language_id: "6091525efccd22ae080d9107",
    default_db_date_format_id: "6177bd95c8f14ed85c69aba8",
    default_db_date_format: "%d/%m/%Y",
    default_decimal_digits: 2,
    default_org_fcode: "organization",
    default_role_fcode: "ROLE",
    default_branch_fcode: "BRCH",
    default_warehouse_fcode: "WREHS",
    default_customer_fcode: "CUST",
    default_ecom_customer_fcode: "CUSTB2C",
    default_sales_person_fcode: "SLP",
    default_vendor_fcode: "VEND",
    default_user_fcode: "USR",
    support_ticket_fcode: "SPT",
    support_ticket_conv_fcode: "STC",
    item_fcode: "ITM",
    inquiry_fcode: "INQ",
    estimation_fcode: "EST",
    invoice_fcode: "INVO",
    sale_order_fcode: "SO",
    payment_received_fcode: "PMTR",
    package_fcode: "PACK",
    shipment_fcode: "SHIP",
    channel_digital_catalogue: "digital_catalogue",
    channel_online_store: "online_store",
    channel_wholesale: "wholesale",
    channel_retail: "retail",
    default_item_category_type: "items",
    default_subscription_fcode: "subscription",
    default_transfer_order_fcode: "transfer-order",
    default_deals_fcode: "deals",
    default_inventory_adjustment_fcode: "inventory-adjustment",
    default_calls_fcode: "calls",
    default_opening_balance_fcode: "opening-balance",
    default_opening_balance_detail_fcode: "opening-balance-detail",
    default_classification_fcode: "classification",
    default_merchant_fcode: "merchant",
    default_expenses_fcode: "expenses",
    default_expense_report_fcode: "expense-report",
    default_expense_tag_fcode: "expense-tag",
    default_general_ledger_fcode: "general-ledger",
    default_reason_fcode: "reason",
    default_purchase_order_fcode: "purchase-order",
    default_credit_note_fcode: "credit-notes",
    default_bills_fcode: "bills",
    default_payment_made_fcode: "PMTM",
    default_tds_fcode: "tds",
    default_tcs_fcode: "tcs",
    default_account_transaction_fcode: "account-transaction",
    default_refund_fcode: "refund",
    default_online_store_fcode: "online-store",
    default_collection_fcode: "collection",
    default_sort_fcode: "sort",
    default_discount_fcode: "discount",
    default_legals_fcode: "legal",
    default_reviews_fcode: "reviews",
    default_review_response_fcode: "review-response",
    default_nav_menu_fcode: "nav-menu",
    default_nav_menu_items_fcode: "nav-menu-items",
    default_sale_return_fcode: "sale-return",
    default_receive_fcode: "return-receipt",
    default_shipping_zone_fcode: "shipping-zone",
    default_shipping_region_fcode: "shipping-region",
    default_shipping_rate_fcode: "shipping-rate",
    default_cart_fcode: "cart",
    default_ecom_offline_payments_fcode: "ecom-offline-payments",
    default_app_credential_fcode: "app-credential",
    default_sn_org_profile_fcode: "sn-org-profile",
    default_feature_request_fcode: "feature-request",
    default_sa_feature_request_fcode: "sa-feature-request",
};
var activity_icon;
(function (activity_icon) {
    activity_icon["status_change"] = "feather icon-refresh-ccw";
    activity_icon["assigned_to_user"] = "feather icon-user-check";
    activity_icon["file_text"] = "feather icon-file-text";
})(activity_icon || (exports.activity_icon = activity_icon = {}));
var TypeMapping;
(function (TypeMapping) {
    TypeMapping["string"] = "isString";
    TypeMapping["objectid"] = "isMongoId";
    TypeMapping["boolean"] = "isBooleanString";
    TypeMapping["number"] = "isNumber";
})(TypeMapping || (exports.TypeMapping = TypeMapping = {}));
//# sourceMappingURL=shared.service.js.map