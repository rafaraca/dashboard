import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const updateDayDataInFirebase = async (
  monthIndex: number,
  day: number,
  smokingStatus: boolean,
  alcoholStatus: boolean
) => {
  const expensesRef = collection(db, 'expenses');
  const q = query(expensesRef, where('month', '==', monthIndex), where('day', '==', day));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Atualiza o documento existente
      const docRef = doc(db, 'expenses', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        smoking: smokingStatus,
        alcohol: alcoholStatus,
        updated_at: new Date().toISOString(),
      });
    } else {
      console.error('Nenhum registro encontrado para atualizar.');
    }
  } catch (error) {
    console.error('Erro ao atualizar dados no Firebase:', error);
  }
};
