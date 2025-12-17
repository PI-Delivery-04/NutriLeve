import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { RecomendacaoService } from "../services/recomendacao.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Recomendacao')
@Controller("/recomendacao") // Prefixo para rotas de análise/estatística
@ApiBearerAuth()
export class RecomendacaoController {
    constructor(private readonly recomendacaoService: RecomendacaoService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getEncomendasLeves() {
        return await this.recomendacaoService.getTopEncomendasLeves();
    }
}