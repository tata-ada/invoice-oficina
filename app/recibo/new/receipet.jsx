// app/receipt/new/page.jsx

"use client";

import { useEffect, useState, useRef } from "react";
import {
  AiOutlineCloudDownload,
  AiOutlinePrinter,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { BsLayoutTextWindowReverse } from "react-icons/bs";

import ThemeLink from "../../components/ThemeLink";
import FormPreview from "../../components/FormPreview";
import FormTable from "@/app/components/FormTable";
import { useReactToPrint } from "react-to-print";

export default function CreateReceipt() {
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef();
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    payerName: "",
    payerAddress: "",
    payerPhone: "",
    paymentDate: "",
    receiptNumber: "01",
    receiptAmount: "",
    notes: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentDate: today,
    }));
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setPreview(!preview);
    const allFormData = { ...formData };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allFormData),
      });
      setLoading(false);
      toast.success("Receipt Created");
      router.push("/receipt");
      setPreview(!preview);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center py-8 md:py-16 px-4 md:px-10 bg-gray-100 gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-sm border-2 border-blue-200 shadow-md hover:bg-gray-300"
          >
            {preview ? (
              "Form"
            ) : (
              <div className="flex items-center space-x-2">
                <BsLayoutTextWindowReverse className="w-5 h-5" />{" "}
                <span>Preview</span>
              </div>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-sm border-2 border-blue-200 shadow-md hover:bg-gray-300"
          >
            <AiOutlinePrinter className="w-5 h-5" />
            <span>Print/Download</span>
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-sm border-2 border-blue-400 shadow-md hover:bg-blue-300">
            <AiOutlineCloudUpload className="w-5 h-5" />
            <span>Salvar</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-sm border-2 border-blue-400 shadow-md hover:bg-blue-300">
            <CiMail className="w-5 h-5" />
            <span>Enviar</span>
          </button>
        </div>
      </div>

      {/* FORMULÁRIO DE RECIBO OU PREVIEW */}
      {preview ? (
        <div ref={receiptRef}>
          <FormPreview data={formData} />
        </div>
      ) : (
        <div className="mx-10">
          <div className="w-full max-w-4xl p-4 bg-white border border-gray-400 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
            {/* Detalhes do Pagador */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="payerName"
                  >
                    Pagador:
                  </label>
                  <input
                    type="text"
                    id="payerName"
                    placeholder="Nome do Pagador"
                    name="payerName"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.payerName}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="payerPhone"
                  >
                    Telefone:
                  </label>
                  <input
                    type="text"
                    id="payerPhone"
                    placeholder="Telefone do Pagador"
                    name="payerPhone"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.payerPhone}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="payerAddress"
                  >
                    Endereço:
                  </label>
                  <input
                    type="text"
                    id="payerAddress"
                    placeholder="Endereço do Pagador"
                    name="payerAddress"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.payerAddress}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="receiptNumber"
                  >
                    Nº
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    value={"01"}
                    id="receiptNumber"
                    name="receiptNumber"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="paymentDate"
                  >
                    Data:
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    id="paymentDate"
                    name="paymentDate"
                    onChange={handleInputChange}
                    value={formData.paymentDate}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label
                    className="text-slate-600 font-bold"
                    htmlFor="receiptAmount"
                  >
                    Valor:
                  </label>
                  <input
                    type="text"
                    id="receiptAmount"
                    placeholder="Valor do Recibo"
                    name="receiptAmount"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.receiptAmount}
                  />
                </div>
              </div>
            </div>

            {/* Notas ou Observações */}
            <div className="flex flex-col mt-6">
              <label className="text-slate-600 font-bold" htmlFor="notes">
                Notas:
              </label>
              <textarea
                id="notes"
                placeholder="Adicione notas adicionais aqui..."
                name="notes"
                rows="3"
                className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                onChange={handleInputChange}
                value={formData.notes}
              ></textarea>
            </div>

            {/* Botão de Submissão */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-sm shadow-md hover:bg-blue-700"
              >
                Criar Recibo
              </button>
            </div>
            </div>
        </div>
      )}
    </div>
  );
}

