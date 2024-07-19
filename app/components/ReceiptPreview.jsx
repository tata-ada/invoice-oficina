import React from "react";
import PreviewReciboTable from "./PreviewReciboTable";
import "./Preview.css";
import Image from 'next/image';

// Função para converter números em palavras em português
const numberToWordsPt = (number) => {
  if (isNaN(number) || number < 0 || number >= 1_000_000_000) {
    return 'Número fora do intervalo';
  }

  const units = [
    '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
  ];
  const teens = [
    'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove',
  ];
  const tens = [
    '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa',
  ];
  const hundreds = [
    '', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos',
  ];

  const processHundreds = (n) => {
    if (n === 100) return 'cem';
    if (n < 100) return processTens(n);
    const h = Math.floor(n / 100);
    const rest = n % 100;
    return hundreds[h] + (rest ? ' e ' + processTens(rest) : '');
  };

  const processTens = (n) => {
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    const t = Math.floor(n / 10);
    const rest = n % 10;
    return tens[t] + (rest ? ' e ' + units[rest] : '');
  };

  const processThousand = (n) => {
    if (n === 1000) return 'mil';
    if (n < 1000) return processHundreds(n);
    const t = Math.floor(n / 1000);
    const rest = n % 1000;
    return (t === 1 ? '' : processHundreds(t)) + ' mil' + (rest ? ' ' + processHundreds(rest) : '');
  };

  const processMillions = (n) => {
    if (n < 1_000_000) return processThousand(n);
    const m = Math.floor(n / 1_000_000);
    const rest = n % 1_000_000;
    return (m === 1 ? 'um milhão' : processHundreds(m) + ' milhões') + (rest ? ' ' + processThousand(rest) : '');
  };

  return processMillions(number).trim().replace(/\s+/g, ' ').replace(/^\w/, c => c.toUpperCase());
};

// Função para obter a data atual em formato de texto
const getCurrentDateText = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para converter o valor em texto por extenso
  const amountInWords = numberToWordsPt(Number(amount));
  const currentDateText = getCurrentDateText();

  return (
    <div className="invoice-container">
      <div className="w-full h-full p-4 bg-white sm:p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="w-1/2">
            <h2 className="text-xl font-bold mb-2">Oficina do Aluminio</h2>
            <p>Av. I, 1733 - Conj. Ceará II</p>
            <p>Fortaleza - CE, 60531-820</p>
            <p>Telefone: (85) 98736-7782</p>
            <p>CNPJ 204445040001-08</p>
          </div>
        
          <Image
            src="/logo3.png"
            alt="Logo da Empresa"
            width={120} // ajuste conforme necessário
            height={120} // ajuste conforme necessário
            className="border-0 rounded-lg ml-4"
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl uppercase font-semibold">Recibo</h2>
        </div>

        <div className="flex justify-between mt-6">
          {/* Detalhes do Cliente */}
          <div className="w-1/2 pr-4">
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientName">Recibido de:</label>
              <p className="font-bold text-base">{clientName}</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="clientPhone">Telefone:</label>
              <p className="font-bold text-base">{clientPhone}</p>
            </div>
            
          </div>

          {/* Informações do Recibo */}
          <div className="w-1/2 pl-4">
            
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="receiptDate">Data:</label>
              <p className="font-bold text-base">{formatDate(receiptDate)}</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <label className="text-slate-600 font-bold" htmlFor="amount">A quantia de:</label>
              <p className="font-bold text-base">{amountInWords}</p>
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
       <div className="mt-10 text-right">
          <div className="flex flex-col items-end">
            <p className="text-lg font-semibold text-gray-800 signature-name">Falkon Araujo Côrrea</p>
            <div className="border-t border-gray-500 w-48 mt-1"></div>
            <p className="text-sm text-gray-600 mt-1">Responsável</p>
          </div>
        </div>

        {/* Data atual no final */}
        <div className="mt-6 text-right font-semibold text-sm text-black-700">
          <p>Fortaleza, CE, {currentDateText}</p>
        </div>
      </div>
    </div>
  );
}
