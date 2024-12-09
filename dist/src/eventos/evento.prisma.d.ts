import { Convidado, Evento } from 'core';
import { PrismaProvider } from 'src/db/prisma.provider';
export declare class EventoPrisma {
    readonly prisma: PrismaProvider;
    constructor(prisma: PrismaProvider);
    salvar(evento: Evento): import(".prisma/client").Prisma.Prisma__EventoClient<{
        id: string;
        alias: string;
        nome: string;
        senha: string;
        data: Date;
        local: string;
        descricao: string;
        imagem: string;
        imagemBackground: string;
        publicoEsperado: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    salvarConvidado(evento: Evento, convidado: Convidado): import(".prisma/client").Prisma.Prisma__ConvidadoClient<{
        id: string;
        nome: string;
        email: string;
        confirmado: boolean;
        possuiAcompanhantes: boolean;
        qtdeAcompanhantes: number;
        eventoId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    buscarTodos(): Promise<Evento[]>;
    buscarPorId(id: string, completo?: boolean): Promise<Evento | null>;
    buscarPorAlias(alias: string, completo?: boolean): Promise<Evento | null>;
}
