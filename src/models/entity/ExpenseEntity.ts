// src/models/entity/ExpenseEntity.ts

export default interface ExpenseEntity {
    id?: string;        // ID da despesa (gerado automaticamente pelo Firebase)
    category: string;   // Categoria da despesa (por exemplo, 'Álcool', 'Cigarro')
    amount: number;     // Valor da despesa
    date: string;       // Data em que a despesa foi realizada
    description: string; // Descrição da despesa
  }
  