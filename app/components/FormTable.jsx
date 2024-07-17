// TABELA DE ORCAMENTO qUE APARECE USUARIO 


import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";

export default function FormTable({ updateTableData }) {
  const [tableData, setTableData] = useState([
    {
      nameProduct: "",
      itemDescription: "",
      qty: "",
      unitPrice: "",
      valor: ""
    }
  ]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    updateTotalValue();
  }, [tableData]);

  const addRow = () => {
    const newRow = {
      nameProduct: "",
      itemDescription: "",
      qty: "",
      unitPrice: "",
      valor: ""
    };
    setTableData([...tableData, newRow]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...tableData];
    updatedData[index][name] = value;

    if (name === "qty" || name === "unitPrice") {
      const qty = parseFloat(updatedData[index].qty);
      const price = parseFloat(updatedData[index].unitPrice);
      if (!isNaN(qty) && !isNaN(price)) {
        updatedData[index].valor = (qty * price).toFixed(2);
      } else {
        updatedData[index].valor = "";
      }
    }

    setTableData(updatedData);
    updateTableData(updatedData);
  };

  const removeRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    updateTableData(updatedData);
  };
  const clearTable = () => {
    setTableData([initialRow]);
    setTotalValue(0);
    updateTableData([initialRow]);
  };


  const updateTotalValue = () => {
    let total = 0;
    tableData.forEach((item) => {
      if (item.valor) {
        total += parseFloat(item.valor);
      }
    });
    setTotalValue(total.toFixed(2));
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg my-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-t border-black bg-gray-50">
          <tr>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              Produto
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              Descrição
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              Quantidade
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              Preço
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              Total
            </th>
            <th scope="col" className="px-2 py-3 sm:px-6 border-b border-gray-400">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white shadow-lg">
          {tableData.map((item, index) => (
            <tr key={index} className="bg-white hover:bg-gray-70">
              <td className="px-2 py-4 sm:px-6 border-b border-gray-500">
                <form className="max-w-sm mx-auto flex items-center">
                  <label htmlFor={`underline_select_${index}`} className="sr-only">
                    Produto
                  </label>
                  <select
                    id={`underline_select_${index}`}
                    name="nameProduct"
                    value={item.nameProduct || ""}
                    onChange={(e) => handleInputChange(index, e)}
                    className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200"
                  >
                   <option value="">Selecione</option>
              <option value="Box de vidro temperado">Box de vidro temperado</option>
              <option value="Grade de alumínio">Grade de alumínio</option>
              <option value="Janela de alumínio e vidro">Janela de alumínio e vidro</option>
              <option value="Janela de vidro temperado">Janela de vidro temperado</option>
              <option value="Janela de vidro temperado fumê">Janela de vidro temperado fumê</option>
              <option value="Janela de vidro temperado incolor">Janela de vidro temperado incolor</option>
              <option value="Janela de vidro temperado verde">Janela de vidro temperado verde</option>
              <option value="Manutenção de esquadrias de alumínio">Manutenção de esquadrias de alumínio</option>
              <option value="Portas de alumínio">Portas de alumínio</option>
              <option value="Portas de alumínio com vidro">Portas de alumínio com vidro</option>
              <option value="Portão de alumínio">Portão de alumínio</option>

                  </select>
                </form>
              </td>
              <td className="px-2 py-4 sm:px-6 border-b border-gray-500">
                <textarea
                  id={`description_${index}`}
                  name="itemDescription"
                  value={item.itemDescription || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  className="block p-2 w-full text-sm text-black-900 bg-black-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição..."
                ></textarea>
              </td>
              <td className="px-2 py-4 sm:px-6 border-b border-gray-500">
                <input
                  className="bg-transparent text-base border-0 p-1 mb-2 h-7 w-12 placeholder:text-slate-400"
                  type="number"
                  name="qty"
                  value={item.qty || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Quantidade"
                />
              </td>
              <td className="px-2 py-4 sm:px-6 border-b border-gray-500">
                <input
                  className="bg-transparent text-base border-0 p-1 mb-2 h-7 w-24 placeholder:text-slate-400"
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Preço"
                />
              </td>
              <td className="px-6 py-4 border-b border-gray-500">
                <input
                  className="bg-transparent text-base border-0 p-1 mb-2 h-7 w-24 placeholder:text-slate-400"
                  type="text"
                  name="valor"
                  value={item.valor || ""}
                  readOnly
                />
              </td>
              <td className="px-6 py-4 text-right border-b border-gray-500">
                <button type="button" onClick={() => removeRow(index)}>
                  <AiOutlineCloseCircle className="text-base text-red-600" />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="px-6 py-4 text-left font-bold">
              <button
                type="button"
                onClick={addRow}
                className="my-3 flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-bold"
              >
                <AiOutlinePlus className="text-base" />
                <span>Adicionar outro produto</span>
              </button>
            </td>
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
