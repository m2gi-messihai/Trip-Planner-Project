import { Body, Controller, Get, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommonService } from "src/services/common.service";
import { TChatbotSubmission } from "src/types/TChatbot";

@Controller("")
export class CommonController {
    constructor(private configService: ConfigService, private commonService: CommonService) {}
    @Get("/dashboard")
    getDashboard() {
        return this.commonService.findDashboardContent();
    }
}
