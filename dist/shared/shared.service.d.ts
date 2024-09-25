import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { CustomLogger } from "src/logger/customlogger.service";
import { AppException } from "./app-exception";
import { CurrencyService } from "./currency/currency.service";
import { ECommandProcessingStatus } from "./enum/command-source.enum";
import { ICommandSourceModel } from "./schema/command-source.schema";
import { ISequence } from "./schema/sequence.schema";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class SharedService {
    private logger;
    private Sequence;
    private readonly commandSourceModel;
    private config;
    private readonly eventEmitter;
    private currency_service;
    defaultLanguage: string;
    defaultExtension: string;
    schemas: {};
    constructor(logger: CustomLogger, Sequence: Model<ISequence>, commandSourceModel: Model<ICommandSourceModel>, config: ConfigService, eventEmitter: EventEmitter2, currency_service: CurrencyService);
    fetchName(nameArr: any, lang: any): any;
    createSequence(tenant: number, name: string, defaultValue: number): Promise<void>;
    getNextNumber(sequenceName: string, prefix?: string, length?: number, transaction_series_id?: string): Promise<string>;
    updateEventProcessingStatus(commandSource: ICommandSourceModel, status: ECommandProcessingStatus): Promise<void>;
    trackAndEmitEvent(eventName: string, event: unknown, isAsync: boolean, userDetails: any): Promise<void>;
    processError(err: Error, context: string): {
        code: HttpStatus;
        response: any;
    };
    mediaMapping(data: any, media: any, media_details: any, delete_key?: string): any;
    accessByString(o: any, s: any): any;
    formatText(input_string: string, linkby: string): string;
    getDateRange(type: app_date_ranges): {
        startdate: any;
        enddate: any;
    };
    currencyFormatter(currency_amount: number, currency_code: string): Promise<string>;
    urlShortner(url: string): Promise<any>;
    applyVariables(input: any, context: any): any;
    timeZoneConvert(offset: any): string;
    formatZoneTime(iso_date: Date, abbr: string, offset: number, date_time?: boolean): string;
    timeRemaining(end_date: string | Date, time_difference?: number): {
        expired: boolean;
        expiring_soon: boolean;
        message: string;
    };
    initCap(input_string: string): string;
    getDateEndRange(end_date: string | Date): Date;
    processAxiosError(error: any): AppException;
    encryptMessage(value: string): any;
    decryptMessage(value: string): any;
    generateRandomNumber(start_digit: number, end_digit: number): number;
}
export declare enum app_date_ranges {
    all = "all",
    this_month = "this_month",
    this_week = "this_week",
    yesterday = "yesterday",
    today = "today",
    last_seven_days = "last_seven_days",
    last_three_months = "last_three_months",
    last_six_months = "last_six_months",
    last_twelve_months = "last_twelve_months",
    this_year = "this_year",
    this_financial_year = "this_financial_year",
    last_financial_year = "last_financial_year",
    last_year = "last_year",
    custom = "custom"
}
export declare enum app_report_key {
    sales_by_customer = "sales-by-customer",
    sales_by_branch = "sales-by-branch",
    sales_by_item = "sales-by-item",
    invoice_report = "invoice-report",
    payment_received_report = "payment-received-report",
    customer_balance = "customer-balance",
    inventory_summary_report = "inventory-summary-report"
}
export declare const app_variables: {
    default_language_id: string;
    default_db_date_format_id: string;
    default_db_date_format: string;
    default_decimal_digits: number;
    default_org_fcode: string;
    default_role_fcode: string;
    default_branch_fcode: string;
    default_warehouse_fcode: string;
    default_customer_fcode: string;
    default_ecom_customer_fcode: string;
    default_sales_person_fcode: string;
    default_vendor_fcode: string;
    default_user_fcode: string;
    support_ticket_fcode: string;
    support_ticket_conv_fcode: string;
    item_fcode: string;
    inquiry_fcode: string;
    estimation_fcode: string;
    invoice_fcode: string;
    sale_order_fcode: string;
    payment_received_fcode: string;
    package_fcode: string;
    shipment_fcode: string;
    channel_digital_catalogue: string;
    channel_online_store: string;
    channel_wholesale: string;
    channel_retail: string;
    default_item_category_type: string;
    default_subscription_fcode: string;
    default_transfer_order_fcode: string;
    default_deals_fcode: string;
    default_inventory_adjustment_fcode: string;
    default_calls_fcode: string;
    default_opening_balance_fcode: string;
    default_opening_balance_detail_fcode: string;
    default_classification_fcode: string;
    default_merchant_fcode: string;
    default_expenses_fcode: string;
    default_expense_report_fcode: string;
    default_expense_tag_fcode: string;
    default_general_ledger_fcode: string;
    default_reason_fcode: string;
    default_purchase_order_fcode: string;
    default_credit_note_fcode: string;
    default_bills_fcode: string;
    default_payment_made_fcode: string;
    default_tds_fcode: string;
    default_tcs_fcode: string;
    default_account_transaction_fcode: string;
    default_refund_fcode: string;
    default_online_store_fcode: string;
    default_collection_fcode: string;
    default_sort_fcode: string;
    default_discount_fcode: string;
    default_legals_fcode: string;
    default_reviews_fcode: string;
    default_review_response_fcode: string;
    default_nav_menu_fcode: string;
    default_nav_menu_items_fcode: string;
    default_sale_return_fcode: string;
    default_receive_fcode: string;
    default_shipping_zone_fcode: string;
    default_shipping_region_fcode: string;
    default_shipping_rate_fcode: string;
    default_cart_fcode: string;
    default_ecom_offline_payments_fcode: string;
    default_app_credential_fcode: string;
    default_sn_org_profile_fcode: string;
    default_feature_request_fcode: string;
    default_sa_feature_request_fcode: string;
};
export declare enum activity_icon {
    status_change = "feather icon-refresh-ccw",
    assigned_to_user = "feather icon-user-check",
    file_text = "feather icon-file-text"
}
export interface SectionFields {
    field: string;
    field_name: string;
    is_unique: boolean;
    is_required: boolean;
}
export declare enum TypeMapping {
    string = "isString",
    objectid = "isMongoId",
    boolean = "isBooleanString",
    number = "isNumber"
}
