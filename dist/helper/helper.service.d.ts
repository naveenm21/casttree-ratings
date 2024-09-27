import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
export declare class HelperService {
    private http_service;
    private configService;
    constructor(http_service: HttpService, configService: ConfigService);
    getRequiredHeaders(req: any): {
        Authorization: string;
    };
    getProfileById(userId: string[], accessToken: string, type?: string): Promise<any>;
    getRatings(sourceId: string[], sourceType: string): Promise<any>;
    getRatingsSummary(sourceId: string, sourceType: string): Promise<any>;
    updateNominationStatus(body: any): Promise<any>;
}
