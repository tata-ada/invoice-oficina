import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { AiOutlineCloseCircle, AiOutlinePlus } from "react-icons/ai";

const FormReciboTable = forwardRef(({ updateTableData, updateReceiptData, tableDataProp, onTotalValueChange }, ref) => {
  const initialRow = {
    nameProduct: "",
    itemDescription: "",
    qty: "",
    unitPrice: "",
    valor: ""
  };

  const [tableData, setTableData] = useState(tableDataProp || [initialRow]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    updateTotalValue();
  }, [tableData]);

  useImperativeHandle(ref, () => ({
    clearTable() {
      setTableData([initialRow]);
      setTotalValue(0);
      updateTableData([initialRow]);
      if (typeof updateReceiptData === 'function') {
        updateReceiptData([initialRow]);
      }
    }
  }));

  const addRow = () => {
    const newRow = { ...initialRow };
    const updatedTableData = [...tableData, newRow];
    setTableData(updatedTableData);
    updateTableData(updatedTableData);
    if (typeof updateReceiptData === 'function') {
      updateReceiptData(updatedTableData);
    }
  };

  const handleReceiptInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedData = [...tableData];
    updatedData[index][name] = value;

    // Atualiza o total se o campo alterado for o preço unitário
    if (name === "unitPrice") {
      updateTotalValue();
    }

    setTableData(updatedData);
    updateTableData(updatedData);
    if (typeof updateReceiptData === "function") {
      updateReceiptData(updatedData);
    }
  };


  const removeRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
    updateTableData(updatedData);
    if (typeof updateReceiptData === "function") {
      updateReceiptData(updatedData);
    }
  };

  const clearTable = () => {
    setTableData([initialRow]);
    setTotalValue(0);
    updateTableData([initialRow]);
    if (typeof updateReceiptData === 'function') {
      updateReceiptData([initialRow]);
    }
  };

  // Função para atualizar o valor total
  const updateTotalValue = () => {
    let total = 0;
    tableData.forEach((item) => {
      if (item.unitPrice) {
        total += parseFloat(item.unitPrice);
      }
    });
    
    const totalFixed = total.toFixed(2);
    setTotalValue(totalFixed);
    if (typeof onTotalValueChange === 'function') {
      onTotalValueChange(totalFixed); // Passa o valor total atualizado para o componente pai
    }
  };
  useImperativeHandle(ref, () => ({
    clearTable
  }));

  return (
    <div className="relative overflow-x-auto sm:rounded-lg my-10">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase border-t border-black bg-gray-50">
          <tr>
           
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Descrição
            </th>
           
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              Preço
            </th>
           
            <th scope="col" className="px-6 py-3 border-b border-gray-400">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white shadow-lg">
          {tableData.map((item, index) => (
            <tr key={index} className="bg-white hover:bg-gray-70">
             
              <td className="px-6 py-4 border-b border-gray-500">
                <textarea
                  id={`description_${index}`}
                  name="itemDescription"
                  value={item.itemDescription || ""}
                  onChange={(e) => handleReceiptInputChange(index, e)}
                  className="block p-2 w-full text-sm text-black-900 bg-black-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição"
                ></textarea>
              </td>
              
              <td className="px-6 py-4 border-b border-gray-500">
                <input
                  className="bg-transparent text-base border-0 p-1 mb-2 h-7 w-24 placeholder:text-slate-400"
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice || ""}
                  onChange={(e) => handleReceiptInputChange(index, e)}
                  placeholder="Preço"
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
            <tr className="bg-gray-50">
            <td colSpan="1" className="px-6 py-4 font-bold text-right border-t border-gray-400">
              Total:
            </td>
            <td className="px-6 py-4 font-bold border-t border-gray-400">
              {totalValue}
            </td>
          </tr>
            
            
          </tr>
        </tbody>
      </table>
    </div>
  );
});
FormReciboTable.displayName = 'FormReciboTable'; // Adicione isso

export default FormReciboTable;
