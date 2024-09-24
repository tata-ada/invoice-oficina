"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { BsLayoutTextWindowReverse } from 'react-icons/bs';
import { AiOutlinePrinter, AiOutlineCloudUpload } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import FormPreview from '../../components/FormPreview';
import ReceiptPreview from '../../components/ReceiptPreview';
import FormTable from '@/app/components/FormTable';
import FormReciboTable from '@/app/components/FormReciboTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const formatDate = (dateString) => {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const InvoiceForm = () => {
  const [receiptCount, setReceiptCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('invoice');
  const [tableData, setTableData] = useState([]);
  
  const [formData, setFormData] = useState({
    companyName: '',
    invoiceAuthor: '',
    companyAddress: '',
    companyCity: '',
    companyCountry: '',
    clientCompany: '',
    clientAddress: '',
    clientPhone: '',
    clientCity: '',
    clientCountry: '',
    invoiceNumber: '01',
    invoiceDate: '',
    invoiceDueDate: '',
    amount: "",
    amountInWords: "",
    terms: '',
    notes: '',
    tableData: [{
      nameProduct: "",
      itemDescription: "",
      qty: "",
      unitPrice: "",
      valor: ""
    }],
  });

  const [receiptData, setReceiptData] = useState({
    receiptNumber: '01',
    receiptDate: '',
    clientName: '',
    clientPhone: '',
    clientAddress: '',
    amount: '',
    amountInWords: "",
    notes: '',
    tableData: [{
      nameProduct: "",
      itemDescription: "",
      qty: "",
      unitPrice: "",
      valor: ""
    }],
  });

  const invoiceRef = useRef(null);
  const receiptRef = useRef(null);
  const formTableRef = useRef(null);
  const formReciboTableRef = useRef(null);



  const clearFormData = () => {
    setFormData({
      companyName: '',
      invoiceAuthor: '',
      companyAddress: '',
      companyCity: '',
      companyCountry: '',
      clientCompany: '',
      clientAddress: '',
      clientPhone: '',
      clientCity: '',
      clientCountry: '',
      invoiceNumber: (invoiceCount + 1).toString().padStart(2, '0'),
      invoiceDate: '',
      invoiceDueDate: '',
      terms: '',
      notes: '',
      tableData: [{
        nameProduct: "",
        itemDescription: "",
        qty: "",
        unitPrice: "",
        valor: ""
      }]
    });
    if (formTableRef.current) {
      formTableRef.current.clearTable();
    }
  };

  const clearReceiptData = () => {
    setReceiptData({
      receiptNumber: (receiptCount + 1).toString().padStart(2, '0'),
      receiptDate: '',
      clientName: '',
      clientPhone: '',
      clientAddress: '',
      amount: '',
      amountInWords: '',
      notes: '',
      tableData: [{
        nameProduct: "",
        itemDescription: "",
        qty: "",
        unitPrice: "",
        valor: ""
      }],
    });
    if (formReciboTableRef.current) {
      formReciboTableRef.current.clearTable();
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleTotalValueChange = (totalValue) => {
    setReceiptData((prevState) => ({
      ...prevState,
      amount: totalValue,
      amountInWords: numberToWordsPt(totalValue),
    }));
  };
  


  const handleReceiptInputChange = (e) => {
    const { name, value } = e.target;
    setReceiptData((prevReceiptData) => ({
      ...prevReceiptData,
      [name]: value,
    }));
  };

  const updateTableData = (newData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tableData: newData,
    }));
  };

  const updateReceiptTableData = (newData) => {
    setReceiptData((prevReceiptData) => ({
      ...prevReceiptData,
      tableData: newData,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const allFormData = {
      ...formData,
      tableData: formData.tableData,
    };
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceData: { ...formData },
          tableData: formData.tableData,
        }),
      });
      if (response.ok) {
        toast.success('Orçamento criado');
      } else {
        throw new Error('Falha ao criar orçamento');
      }
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      toast.error('Falha ao criar orçamento');
    } finally {
      setLoading(false);
    }
 
  return (
    <button onClick={handleGeneratePDFAndSendWhatsApp}>Gerar PDF e Enviar</button>
  );
};

  const handleReceiptSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receiptData),
      });
      if (response.ok) {
        toast.success('Recibo criado');
      } else {
        throw new Error('Falha ao criar recibo');
      }
    } catch (error) {
      console.error('Erro ao criar recibo:', error);
      toast.error('Falha ao criar recibo');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintInvoice = useReactToPrint({
    content: () => invoiceRef.current,
    onAfterPrint: () => {
      clearFormData();
      setInvoiceCount(prevCount => prevCount + 1);
    
    }
  });

  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
    onAfterPrint: () => {
      clearReceiptData();
      setReceiptCount(prevCount => prevCount + 1);
   
    }
  });

  const handleGeneratePDFAndSendWhatsApp = async (ref) => {
    setLoading(true);
    try {
      // Usando a função de print definida anteriormente
      await new Promise((resolve) => {
        const print = useReactToPrint({
          content: () => ref.current,
          onAfterPrint: resolve,
        });
        print();
      });
  
      // Use html2canvas to capture the content as a canvas
      const canvas = await html2canvas(ref.current);
      const imgData = canvas.toDataURL('image/png');
  
      // Convert canvas to PDF using jsPDF
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      const pdfBlob = pdf.output('blob');
  
      // Create an object URL for the PDF
      const pdfURL = URL.createObjectURL(pdfBlob);
  
      // Prompt user to download the PDF
      const link = document.createElement('a');
      link.href = pdfURL;
      link.download = 'document.pdf';
      link.click();
  
      // Open WhatsApp with a placeholder message (since direct file sending isn't supported)
      const whatsappMessage = 'Aqui está o documento PDF que você solicitou:';
      const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}%0A${encodeURIComponent(pdfURL)}`;
  
      window.open(whatsappURL, '_blank');
    } catch (error) {
      console.error("Erro ao gerar PDF e enviar via WhatsApp", error);
    } finally {
      setLoading(false);
    }
  };
  


  



  const toggleSection = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center py-8 md:py-16 px-4 md:px-10 bg-gray-100 gap-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => toggleSection('invoice')}
            className={`px-3 py-2 bg-gray-200 text-gray-700 rounded-sm border-2 ${
              activeSection === 'invoice' ? 'border-blue-200 shadow-md hover:bg-gray-300' : ''
            }`}
          >
            {activeSection === 'invoice' ? (
              'Orçamento'
            ) : (
              <div className="flex items-center space-x-2">
                <BsLayoutTextWindowReverse className="w-5 h-5" /> <span>Orçamento</span>
              </div>
            )}
          </button>
          <button
            onClick={() => toggleSection('receipt')}
            className={`px-3 py-2 bg-gray-200 text-gray-700 rounded-sm border-2 ${
              activeSection === 'receipt' ? 'border-blue-200 shadow-md hover:bg-gray-300' : ''
            }`}
          >
            {activeSection === 'receipt' ? (
              'Recibo'
            ) : (
              <div className="flex items-center space-x-2">
                <BsLayoutTextWindowReverse className="w-5 h-5" /> <span>Recibo</span>
              </div>
            )}
          </button>
          
          
        </div>
        <div className="flex flex-wrap justify-center gap-2">
        <button
            onClick={activeSection === 'invoice' ? handlePrintInvoice : handlePrintReceipt}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-sm border-2 border-blue-200 shadow-md hover:bg-gray-300"
          >
            <AiOutlinePrinter className="w-5 h-5" />
            <span>Imprimir {activeSection === 'invoice' ? 'Orcamento' : 'Recibo'}</span>
          </button>
        
          

          
        </div>
      </div>

      {/* iNFO EMPRESA */}
      {activeSection === 'invoice' ? (
        <div className="mx-10">
          <div className="w-full max-w-4xl p-4 bg-white border border-gray-400 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
            {/* Container para Imagem e Informações da Empresa */}
            <div className="flex justify-between items-start mb-6">
              {/* Informações da Empresa */}
              <div className="w-1/2">
                <h2 className="text-xl font-bold mb-2">Oficina do Alumínio </h2>
                <p>  Av. I, 1733 - Conj. Ceará II
Fortaleza - CE, 60531-820
</p>
                <p>Telefone: (85) 98736-77822</p>
                <p>CNPJ 204445040001-08</p>
              </div>
              {/* Imagem */}
              <div className=" border-0 rounded-lg">
              <Image
            src="/logo3.png"
            alt="Logo da Empresa"
            width={120} // ajuste conforme necessário
            height={120} // ajuste conforme necessário
            className="border-0 rounded-lg ml-4"
          />
              </div>
            </div>

            {/* Título do Orçamento */}
            <div className="text-center mb-6">
              <h2 className="text-2xl uppercase font-semibold">Orçamento</h2>
            </div>

            {/* Detalhes do Cliente */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientCompany">
                    Cliente:
                  </label>
                  <input
                    type="text"
                    id="clientCompany"
                    placeholder="Nome do Cliente"
                    name="clientCompany"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.clientCompany}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientPhone">
                    Telefone:
                  </label>
                  <input
                    type="text"
                    id="clientPhone"
                    placeholder="Telefone do Cliente"
                    name="clientPhone"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.clientPhone}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientAddress">
                    Endereço:
                  </label>
                  <input
                    type="text"
                    id="clientAddress"
                    placeholder="Endereço do Cliente"
                    name="clientAddress"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.clientAddress}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="invoiceDate">
                    Data:
                  </label>
                  <input

                    type="date"
                    id="invoiceDate"
                    name="invoiceDate"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.invoiceDate}
                    placeholder="DD/MM/YYYY"
                    required
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="invoiceDueDate">
                    Valido até:
                  </label>
                  <input
                    type="date"
                    id="invoiceDueDate"
                    name="invoiceDueDate"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleInputChange}
                    value={formData.invoiceDueDate}
                  />
                </div>

              </div>
            </div>

            {/* Tabela de Itens */}
            <FormTable ref={formTableRef} updateTableData={(data) => setFormData({ ...formData, tableData: data })}  onTotalValueChange={handleTotalValueChange}/>


            {/* Notas do Orçamento */}
            <div className="mt-6">
              <label className="block text-slate-600 font-bold mb-2" htmlFor="notes">
                Notas:
              </label>
              <textarea
                id="notes"
                placeholder="Notas adicionais"
                name="notes"
                rows="3"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                onChange={handleInputChange}
                value={formData.notes}
              />
            </div>

            {/* Botão de Imprimir */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                onClick={handlePrintInvoice}
                className="w-full md:w-1/2 py-3 px-4 bg-gray-700 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
                disabled={loading}
              >
                {loading ? 'Imprimi...' : 'Imprimir Orçamento'}
              </button>
            </div>

            {/* Botão de Enviar Orcamento */}

            <div className="flex justify-center mt-8">
              <button
              type="submit"
              onClick={() => handleGeneratePDFAndSendWhatsApp(invoiceRef)}
              className="w-full md:w-1/2 py-3 px-4 bg-gray-700 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Orçamento via WhatsApp'}
            </button>
      </div>

            




          </div>
        </div>
      ) : (
        

        // RECIBO 
        
        <div className="mx-10">
          <div className="w-full max-w-4xl p-4 bg-white border border-gray-400 rounded-lg shadow sm:p-6 md:p-8 mx-auto">
            {/* Container para Imagem e Informações da Empresa */}
            <div className="flex justify-between items-start mb-6">
              {/* Informações da Empresa */}
              <div className="w-1/2">
                <h2 className="text-xl font-bold mb-2">Oficina do Alumínio </h2>
                <p>Av. I, 1733 - Conj. Ceará II
Fortaleza - CE, 60531-820
</p>
                <p>Telefone: (85) 98736-7782</p>
                <p>CNPJ 204445040001-08</p>
              </div>
              {/* Imagem */}
              <div className=" border-0 rounded-lg ml-4">
              <Image
            src="/logo3.png"
            alt="Logo da Empresa"
            width={120} // ajuste conforme necessário
            height={120} // ajuste conforme necessário
            className="border-0 rounded-lg ml-4"
          />
              </div>
            </div>

            {/* Título do Recibo */}
            <div className="text-center mb-6">
              <h2 className="text-2xl uppercase font-semibold">Recibo</h2>
            </div>

            {/* Detalhes do Cliente */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientName">
                    Recebido de:
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    placeholder="Nome do Cliente"
                    name="clientName"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleReceiptInputChange}
                    value={receiptData.clientName}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientPhone">
                    Telefone:
                  </label>
                  <input
                    type="text"
                    id="clientPhone"
                    placeholder="Telefone do Cliente"
                    name="clientPhone"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleReceiptInputChange}
                    value={receiptData.clientPhone}
                  />
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="clientAddress">
                    Endereço:
                  </label>
                  <input
                    type="text"
                    id="clientAddress"
                    placeholder="Endereço do Cliente"
                    name="clientAddress"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleReceiptInputChange}
                    value={receiptData.clientAddress}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="receiptDate">
                    Data do Recibo:
                  </label>
                  <input
                    type="date"
                    id="receiptDate"
                    name="receiptDate"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleReceiptInputChange}
                    value={receiptData.receiptDate}
                    placeholder="DD/MM/YYYY"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Detalhes do Pagamento */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 mt-6">
              <div className="flex flex-col w-full lg:w-1/2">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-slate-600 font-bold" htmlFor="amount">
                    A quantia de:
                  </label>
                  <input
                    type="text"
                    id="amount"
                    placeholder="Valor do Recibo"
                    name="amount"
                    className="w-full px-3 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                    onChange={handleReceiptInputChange}
                    value={receiptData.amount}
                  />
                </div>
              </div>
            </div>
            
             {/* Tabela de Itens */}
             <div>
                {/* Tabela de Itens */}
                <FormReciboTable
            ref={formReciboTableRef}
            updateTableData={(data) => setReceiptData({ ...receiptData, tableData: data })}
          />

    </div>

            {/* Notas do Recibo */}
            <div className="mt-6">
              <label className="block text-slate-600 font-bold mb-2" htmlFor="notes">
              Termos e Condições:
              </label>
              <textarea
                id="notes"
                placeholder="Notas adicionais"
                name="notes"
                rows="3"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black-300"
                onChange={handleReceiptInputChange}
                value={receiptData.notes}
              />
            </div>


            {/* Botão de imprimir recibo  */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                onClick={handlePrintReceipt}
                className="w-full md:w-1/2 py-3 px-4 bg-gray-700 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
                disabled={loading}
              >
                {loading ? 'Imprimindo...' : 'Imprimir Recibo'}
              </button>
            </div>

             {/* Botão de Enviar Recibo */}

             <div className="flex justify-center mt-8">
        <button
          type="submit"
          onClick={() => handleGeneratePDFAndSendWhatsApp(receiptRef)}
          className="w-full md:w-1/2 py-3 px-4 bg-gray-700 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Recibo via WhatsApp'}
        </button>
      </div>


          </div>
        </div>
      )}

      {/* PREVIEW */}
      <div className="hidden">
        {/* Orçamento Preview */}
        <div ref={invoiceRef}>
          <FormPreview data={formData} />
        </div>

        {/* Recibo Preview */}
        <div ref={receiptRef}>
          <ReceiptPreview data={receiptData} />
        </div>
      </div>
    </div>
  );
};
InvoiceForm.displayName = "InvoiceForm";
export default InvoiceForm;