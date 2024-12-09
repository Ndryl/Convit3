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
exports.EventosController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("core");
const evento_prisma_1 = require("./evento.prisma");
let EventosController = class EventosController {
    constructor(repo) {
        this.repo = repo;
    }
    async salvarEvento(evento) {
        const eventoCadastrado = await this.repo.buscarPorAlias(evento.alias);
        if (eventoCadastrado && eventoCadastrado.id !== evento.id) {
            throw new common_1.HttpException('Já existe um evento com esse alias.', 400);
        }
        const eventoCompleto = (0, core_1.complementarEvento)(this.deserializar(evento));
        await this.repo.salvar(eventoCompleto);
    }
    async salvarConvidado(alias, convidado) {
        const evento = await this.repo.buscarPorAlias(alias);
        if (!evento) {
            throw new common_1.HttpException('Evento não encontrado.', 400);
        }
        const convidadoCompleto = (0, core_1.complementarConvidado)(convidado);
        await this.repo.salvarConvidado(evento, convidadoCompleto);
    }
    async acessarEvento(dados) {
        const evento = await this.repo.buscarPorId(dados.id);
        if (!evento) {
            throw new common_1.HttpException('Evento não encontrado.', 400);
        }
        if (evento.senha !== dados.senha) {
            throw new common_1.HttpException('Senha não corresponde ao evento.', 400);
        }
        return this.serializar(evento);
    }
    async buscarEventos() {
        const eventos = await this.repo.buscarTodos();
        return eventos.map(this.serializar);
    }
    async buscarEvento(idOuAlias) {
        let evento;
        if (core_1.Id.valido(idOuAlias)) {
            evento = await this.repo.buscarPorId(idOuAlias, true);
        }
        else {
            evento = await this.repo.buscarPorAlias(idOuAlias, true);
        }
        return this.serializar(evento);
    }
    async validarAlias(alias, id) {
        const evento = await this.repo.buscarPorAlias(alias);
        return { valido: !evento || evento.id === id };
    }
    serializar(evento) {
        if (!evento)
            return null;
        return {
            ...evento,
            data: core_1.Data.formatar(evento.data),
        };
    }
    deserializar(evento) {
        if (!evento)
            return null;
        return {
            ...evento,
            data: core_1.Data.desformatar(evento.data),
        };
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "salvarEvento", null);
__decorate([
    (0, common_1.Post)(':alias/convidado'),
    __param(0, (0, common_1.Param)('alias')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "salvarConvidado", null);
__decorate([
    (0, common_1.Post)('acessar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "acessarEvento", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "buscarEventos", null);
__decorate([
    (0, common_1.Get)(':idOuAlias'),
    __param(0, (0, common_1.Param)('idOuAlias')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "buscarEvento", null);
__decorate([
    (0, common_1.Get)('validar/:alias/:id'),
    __param(0, (0, common_1.Param)('alias')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "validarAlias", null);
exports.EventosController = EventosController = __decorate([
    (0, common_1.Controller)('eventos'),
    __metadata("design:paramtypes", [evento_prisma_1.EventoPrisma])
], EventosController);
//# sourceMappingURL=eventos.controller.js.map