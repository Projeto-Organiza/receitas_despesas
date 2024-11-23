"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [records, setRecords] = useState([]); // Para armazenar os registros
  const [editIndex, setEditIndex] = useState(null); // Para saber qual item editar

  // Estado para armazenar os dados do formulário de adicionar/editar
  const [type, setType] = useState(""); // Entrada ou Saída
  const [categories, setCategories] = useState([]); // Categorias selecionadas
  const [newCategory, setNewCategory] = useState(""); // Nova categoria personalizada
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const categoryOptions = [
    "Salario", "Investimentos", "Aluguel", "Contas", "Transporte", "Saude", "Educação", "Lazer"
  ];

  // Cálculo dos ganhos e gastos
  const totalGanhos = records
    .filter((record) => record.type === "Entrada")
    .reduce((sum, record) => sum + parseFloat(record.value || 0), 0);

  const totalGastos = records
    .filter((record) => record.type === "Saida")
    .reduce((sum, record) => sum + parseFloat(record.value || 0), 0);

  const handleAddClick = () => {
    setIsAddOpen(true);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
    setIsAddOpen(false);
    setIsDeleteOpen(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
    setIsAddOpen(false);
    setIsEditOpen(false);
  };

  // Função para adicionar um novo registro
  const handleAddRecord = () => {
    let finalCategories = [...categories];

    if (newCategory && !categoryOptions.includes(newCategory) && !finalCategories.includes(newCategory)) {
      finalCategories.push(newCategory);
    }

    const newRecord = { type, categories: finalCategories, description, value, date };
    setRecords([...records, newRecord]);

    setType("");
    setCategories([]);
    setNewCategory("");
    setDescription("");
    setValue("");
    setDate("");
    setIsAddOpen(false);
  };

  const handleEditRecordClick = (index) => {
    setEditIndex(index);
    setType(records[index].type);
    setCategories(records[index].categories);
    setDescription(records[index].description);
    setValue(records[index].value);
    setDate(records[index].date);
    setIsEditOpen(true);
    setIsAddOpen(false);
    setIsDeleteOpen(false);
  };

  const handleSaveEdit = () => {
    const updatedRecords = [...records];
    updatedRecords[editIndex] = { type, categories, description, value, date };
    setRecords(updatedRecords);

    setType("");
    setCategories([]);
    setNewCategory("");
    setDescription("");
    setValue("");
    setDate("");
    setIsEditOpen(false);
    setEditIndex(null);
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    setIsDeleteOpen(false);
  };

  const handleCategoryChange = (category) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.titulos}>
        <h1 id="titulo_principal">Receitas e Despesas</h1>
        <h2 id="subtitulo">Set. 2024</h2>
      </div>

      {/* Exibição dos Totais */}
      <div className={styles.containersTotais}>
        <div className={styles.ganhos}>
          <p>Ganhos totais:</p>
          <p className={styles.valorGanhos}>+ R$ {totalGanhos.toFixed(2)}</p>
        </div>
        <div className={styles.gastos}>
          <p>Gastos totais:</p>
          <p className={styles.valorGastos}>- R$ {totalGastos.toFixed(2)}</p>
        </div>
      </div>

      <h2>Entradas e Saídas</h2>

      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleAddClick}>Adicionar</button>
        <button className={styles.button} onClick={handleEditClick}>Editar</button>
        <button className={styles.button} onClick={handleDeleteClick}>Excluir</button>
      </div>

      {/* Modal de Adicionar */}
      {isAddOpen && (
        <div className={styles.modal}>
          <h3>Nova Receita/Despesa</h3>
          <div>
            <label>Tipo:</label>
            <input type="radio" name="type" value="Entrada" checked={type === "entrada"} onChange={() => setType("Entrada")} /> Entrada
            <input type="radio" name="type" value="Saida" checked={type === "saida"} onChange={() => setType("Saida")} /> Saída
          </div>
          <div>
            <label>Valor:</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <label>Data:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>Categorias:</label>
            {categoryOptions.map((category) => (
              <div key={category}>
                <input type="checkbox" id={category} checked={categories.includes(category)} onChange={() => handleCategoryChange(category)} />
                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              </div>
            ))}
          </div>
          <div>
            <label>Nova Categoria:</label>
            <input type="text" placeholder="Adicionar nova categoria" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          </div>
          <div>
            <label>Descrição:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button onClick={handleAddRecord}>Adicionar</button>
        </div>
      )}

      {/* Modal de Editar */}
      {isEditOpen && (
        <div className={styles.modal}>
          <h3>Editar Receita/Despesa</h3>
          <div>
            <label>Tipo:</label>
            <input type="radio" name="type" value="Entrada" checked={type === "Entrada"} onChange={() => setType("Entrada")} /> Entrada
            <input type="radio" name="type" value="Saida" checked={type === "Saida"} onChange={() => setType("Saida")} /> Saída
          </div>
          <div>
            <label>Valor:</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          <div>
            <label>Data:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>Categorias:</label>
            {categoryOptions.map((category) => (
              <div key={category}>
                <input type="checkbox" id={category} checked={categories.includes(category)} onChange={() => handleCategoryChange(category)} />
                <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              </div>
            ))}
          </div>
          <div>
            <label>Descrição:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button onClick={handleSaveEdit}>Salvar Alterações</button>
        </div>
      )}

      {/* Modal de Excluir */}
      {isDeleteOpen && (
        <div className={styles.modal}>
          <h3>Excluir Registro</h3>
          {records.map((record, index) => (
            <div key={index}>
              <p>{record.type} - {record.description} - {record.value} <button onClick={() => handleDeleteRecord(index)}>Excluir</button></p>
            </div>
          ))}
        </div>
      )}

      {/* Tabela com todos os registros */}
<div className={styles.container}>
  <table className={styles.table}>
    <thead>
      <tr>
        <th className={styles.tableHeader}>Tipo</th>
        <th className={styles.tableHeader}>Valor</th>
        <th className={styles.tableHeader}>Categoria</th>
        <th className={styles.tableHeader}>Descrição</th>
        <th className={styles.tableHeader}>Data</th>
        <th className={styles.tableHeader}>Ações</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record, index) => (
        <tr key={index} className={styles.tableRow}>
          <td>{record.type}</td>
          <td>{record.value}</td>
          <td>{record.categories ? record.categories.join(", ") : ""}</td>
          <td>{record.description}</td>
          <td>{record.date}</td>
          <td>
            <button className={styles.editButton} onClick={() => handleEditRecordClick(index)}>Editar</button>
            <button className={styles.deleteButton} onClick={() => handleDeleteRecord(index)}>Excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}
