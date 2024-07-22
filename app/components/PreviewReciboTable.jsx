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
        if (item.unitPrice) {
          total += parseFloat(item.unitPrice);
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
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Preço
            </th>
          </tr>
        </thead>
        <tbody className="bg-white shadow-lg">
          {Array.isArray(tableData) && tableData.length > 0 ? (
            tableData.map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-70">
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.itemDescription}
                </td>
                <td className="px-6 py-4 border-b border-gray-500">
                  {item.unitPrice}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                Nenhum item na tabela de recibo.
              </td>
            </tr>
          )}
          <tr className="bg-gray-50">
            <td colSpan="1" className="px-6 py-4 font-bold text-right border-t border-gray-400">
              Total:
            </td>
            <td className="px-6 py-4 font-bold border-t border-gray-400">
              {totalValue}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
