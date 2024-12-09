import { Convidado, Evento } from 'core';
import { EventoPrisma } from './evento.prisma';
export declare class EventosController {
    readonly repo: EventoPrisma;
    constructor(repo: EventoPrisma);
    salvarEvento(evento: Evento): Promise<void>;
    salvarConvidado(alias: string, convidado: Convidado): Promise<void>;
    acessarEvento(dados: {
        id: string;
        senha: string;
    }): Promise<{
        data: string;
        id: string;
        alias: string;
        senha: string;
        nome: string;
        local: string;
        descricao: string;
        imagem: string;
        imagemBackground: string;
        publicoEsperado: number;
        convidados: Convidado[];
    }>;
    buscarEventos(): Promise<{
        data: string;
        id: string;
        alias: string;
        senha: string;
        nome: string;
        local: string;
        descricao: string;
        imagem: string;
        imagemBackground: string;
        publicoEsperado: number;
        convidados: Convidado[];
    }[]>;
    buscarEvento(idOuAlias: string): Promise<{
        data: string;
        id: string;
        alias: string;
        senha: string;
        nome: string;
        local: string;
        descricao: string;
        imagem: string;
        imagemBackground: string;
        publicoEsperado: number;
        convidados: Convidado[];
    }>;
    validarAlias(alias: string, id: string): Promise<{
        valido: boolean;
    }>;
    private serializar;
    private deserializar;
}
