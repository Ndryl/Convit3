"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const core_1 = require("core");
async function seed() {
    const prisma = new client_1.PrismaClient();
    const transacoes = core_1.eventos.map(async (evento) => {
        await prisma.evento.create({
            data: {
                id: evento.id,
                alias: evento.alias,
                senha: evento.senha,
                nome: evento.nome,
                data: evento.data,
                local: evento.local,
                descricao: evento.descricao,
                imagem: evento.imagem,
                imagemBackground: evento.imagemBackground,
                publicoEsperado: evento.publicoEsperado,
                convidados: {
                    create: evento.convidados.map((convidado) => ({
                        id: convidado.id,
                        nome: convidado.nome,
                        email: convidado.email,
                        confirmado: convidado.confirmado,
                        possuiAcompanhantes: convidado.possuiAcompanhantes,
                        qtdeAcompanhantes: convidado.qtdeAcompanhantes,
                    })),
                },
            },
        });
    });
    await Promise.all(transacoes);
}
seed();
//# sourceMappingURL=seed.js.map