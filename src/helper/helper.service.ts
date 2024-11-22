import { HttpService } from "@nestjs/axios";
import { Injectable, Req } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HelperService {
  constructor(
    private http_service: HttpService,
    private configService: ConfigService
  ) {}

  getRequiredHeaders(@Req() req) {
    const reqHeaders = {
      Authorization: "",
    };

    if (req.headers) {
      reqHeaders.Authorization = req.headers["authorization"] ?? "";
    }

    return reqHeaders;
  }

  async getProfileByIdTl(userId: string[],  type: string) {
    try {
      let data = await this.http_service
        .post(
          `${this.configService.get("CASTTREE_BASE_URL")}/profile/tl/get-profile-list`,
         // `http://localhost:3000/casttree/profile/tl/get-profile-list`,
          { userIds: userId, type: type },
          
        )
        .toPromise();
      return data.data.profileData;
    } catch (err) {
      throw err;
    }
  }
}
