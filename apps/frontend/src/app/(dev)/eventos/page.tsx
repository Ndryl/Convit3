"use client";
import { Evento, eventos } from "core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function PaginaEventos() {
  console.log(eventos);

  const [listaEventos, setListaEventos] = useState<Evento[]>([]);

  const getEventos = async () => {
    try {
      const response = await fetch("http://localhost:4000/eventos");
      const data = await response.json();
      setListaEventos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEventos();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {listaEventos?.map((evento) => (
        <div
          key={evento.id}
          className="
            flex flex-col w-full overflow-hidden
            bg-zinc-800 rounded-lg
          "
        >
          <div className="relative w-full h-52">
            <Image
              src={evento.imagem}
              fill
              alt={evento.nome}
              className="object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col items-center p-7 gap-5 text-center">
            <span className="text-lg font-black">{evento.nome}</span>
            <p className="flex-1 text-sm text-zinc-400">{evento.descricao}</p>
            <QRCode
              value={JSON.stringify({ id: evento.id, senha: evento.senha })}
              className="w-44 h-44"
            />
            <div className="flex gap-5">
              <Link
                href={`/evento/admin/${evento.id}/${evento.senha}`}
                className="flex-1 botao vermelho"
              >
                Admin
              </Link>
              <Link
                href={`/convite/${evento.alias}`}
                className="flex-1 botao verde"
              >
                Convite
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
