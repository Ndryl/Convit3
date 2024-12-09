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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventoPrisma = void 0;
const common_1 = require("@nestjs/common");
const prisma_provider_1 = require("../db/prisma.provider");
let EventoPrisma = class EventoPrisma {
    constructor(prisma) {
        this.prisma = prisma;
    }
    salvar(evento) {
        return this.prisma.evento.create({
            data: {
                ...evento,
                convidados: { create: evento.convidados },
            },
        });
    }
    salvarConvidado(evento, convidado) {
        return this.prisma.convidado.create({
            data: {
                ...convidado,
                qtdeAcompanhantes: +(convidado.qtdeAcompanhantes ?? 0),
                evento: { connect: { id: evento.id } },
            },
        });
    }
    async buscarTodos() {
        return this.prisma.evento.findMany();
    }
    async buscarPorId(id, completo = false) {
        return this.prisma.evento.findUnique({
            where: { id },
            include: { convidados: completo },
        });
    }
    async buscarPorAlias(alias, completo = false) {
        return this.prisma.evento.findUnique({
            select: {
                id: true,
                nome: true,
                descricao: true,
                data: true,
                local: true,
                imagem: true,
                imagemBackground: true,
                alias: true,
                senha: completo,
                publicoEsperado: completo,
                convidados: completo,
            },
            where: { alias },
        });
    }
};
exports.EventoPrisma = EventoPrisma;
exports.EventoPrisma = EventoPrisma = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_provider_1.PrismaProvider])
], EventoPrisma);
//# sourceMappingURL=evento.prisma.js.map