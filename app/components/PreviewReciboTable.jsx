// TABELA RECIBO PREVIEW 
import React, { useEffect, useState } from "react";

export default function PreviewReciboTable({ tableData }) {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    console.log("PreviewReciboTable useEffect tableData:", tableData);
    updateTotalValue();
  }, [tableData]);


  // Função para calcular o valor total dos itens na tabela de pré-visualização
  const updateTotalValue = () => {
    let total = 0; // Inicializa total aqui
    if (Array.isArray(tableData) && tableData.length > 0) {
      tableData.forEach((item) => {
        if (item.valor) {
          total += parseFloat(item.valor);
        }
      });
    }
    setTotalValue(total.toFixed(2));
  };

  console.log("PreviewReciboTable tableData:", tableData);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg my-10">
      <table className="w-full text-sm text-left text-black-500">
        <thead className="text-xs text-gray-700 uppercase border-t border-black bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3  border-b border-gray-400">
              Produto
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Quantidade
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Preço
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Total
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white shadow-lg">
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-70">
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.nameProduct}
                </td>
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.itemDescription}
                </td>
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.qty}
                </td>
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.unitPrice}
                </td>
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.valor}
                </td>
                <td className="px-6 py-4 text-right border-b border-gray-500"></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                Nenhum item na tabela de recibo.
              </td>
            </tr>
          )}
          {/* Mostrar linha com o valor total */}
          <tr>
            <td colSpan="4" 
            className="px-6 py-4 text-left font-bold"></td>
            <td className="px-6 py-4 font-bold border-b border-gray-500 text-right">
              Total:
            </td>
            <td className="px-6 py-4 font-bold border-b border-gray-500">
              {totalValue}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
