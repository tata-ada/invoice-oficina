import React from "react";
import PreviewReciboTable from "./PreviewReciboTable";
import "./Preview.css";

export default function ReceiptPreview({ data }) {
  if (!data) {
    return <div>Dados não disponíveis.</div>;
  }

  const {
    clientName,
    clientPhone,
    clientAddress,
    receiptNumber,
    receiptDate,
    amount,
    notes,
    tableData
  } = data;

  // Função para formatar a data no formato DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="invoice-container">
      <div className="w-full h-full p-4 bg-white sm:p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-2">Oficina do Aluminio</h2>
            <p>Av. I 1733 Conjunto ceara 3 etapa</p>
            <p>Telefone: (85) 99999-9999</p>
            <p>CNPJ 204445040001-08</p>
          </div>
          <div className="w-30 h-24 border-0 rounded-lg">
            <img
              src="/logo3.png"
              alt="Logo da Empresa"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl uppercase font-semibold">Recibo</h2>
        </div>

        <div className="flex justify-between mt-6">
          {/* Detalhes do Cliente */}
          <div className="w-1/2 pr-4">
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientName">Cliente:</label>
              <p className="font-bold text-base">{clientName}</p>
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

          {/* Informações do Recibo */}
          <div className="w-1/2 pl-4">
      

            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="receiptNumber">Nº:</label>
              <p className="font-bold text-base">{receiptNumber}</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="receiptDate">Data:</label>
              {console.log("receiptDate:", receiptDate)} {/* Adicione o console.log aqui */}
  <p className="font-bold text-base">{formatDate(receiptDate)}</p>
</div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="amount">Valor:</label>
              <p className="font-bold text-base">{amount}</p>
            </div>
          </div>
        </div>

        <PreviewReciboTable tableData={tableData} />

        {/* Notas */}
        <div className="mt-6">
          <label className="block text-slate-600 uppercase font-bold mb-2" htmlFor="notes">
            Termos e Condições:
          </label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
            value={notes}
            readOnly
          />
        </div>

        {/* Assinatura do Responsável */}
        <div className="mt-8 text-right caveat-signature">
          <span className="caveat-signature">Assinatura do Responsável</span>
        </div>
      </div>
    </div>
  );
}
