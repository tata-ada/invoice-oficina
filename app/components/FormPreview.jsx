import React from "react";
import "./Preview.css";
import NextImage from 'next/image';
import PreviewTable from "./PreviewTable";



export default function FormPreview({ data }) {
  // Verifica se data está definido
  if (!data) {
    return <div>Dados não disponíveis.</div>;
  }
  
  const {
    clientCompany,
    clientAddress,
    clientPhone,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    tableData
  } = data;

  // Função para formatar a data no formato DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, "0");
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="mx-10" style={{ maxWidth: "595pt", height: "842pt", margin: "auto" }}>
      <div className="w-full h-full p-4 bg-white sm:p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-2">Oficina do Aluminio</h2>
            <p>Av. I, 1733 - Conj. Ceará II
Fortaleza - CE, 60531-820
</p>
            <p>Telefone: (85) 98736-7782</p>
            <p>CNPJ 204445040001-08</p>
          </div>
          <div className="w-30 h-24 border-0 rounded-lg">
            <NextImage
              src="/logo3.png"
              alt="Logo da Empresa"
              width={100}
              height={100}
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl uppercase font-semibold">Orçamento</h2>
        </div>

        <div className="flex justify-between mt-6">
          {/* Detalhes do Cliente */}
          <div className="w-1/2 pr-4">
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientName">Cliente:</label>
              <p className="font-bold text-base">{clientCompany}</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientPhone">Telefone:</label>
              <p className="font-bold text-base">{clientPhone}</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientAddress">Endereço:</label>
              <p className="font-bold text-base">{clientAddress}</p>
            </div>
          </div>

          {/* Informações do Orçamento */}
          <div className="w-1/2 pl-4">
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="invoiceNumber">Nº:</label>
              <p className="font-bold text-base">{invoiceNumber || 'Não disponível'}</p>
              

            </div>

            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="invoiceDate">
                Data:</label>
              <p className="font-bold text-base">{formatDate(invoiceDate)}</p>
            </div>

            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="invoiceDueDate">Validade:</label>
              <p className="font-bold text-base">{formatDate(invoiceDueDate)}</p>
            </div>
          </div>
        </div>

        <PreviewTable tableData={tableData} />

      </div>
    </div>
  );
}

