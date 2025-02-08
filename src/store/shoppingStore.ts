import { writable } from 'svelte/store';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import type ShoppingItemEntity from '../models/entity/ShoppingItemEntity';

export const shoppingList = writable<ShoppingItemEntity[]>([]);

export const loadShoppingList = async () => {
	const querySnapshot = await getDocs(collection(db, 'shopping'));
	const items = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as ShoppingItemEntity[];
	shoppingList.set(items);
};

export const addShoppingItem = async (item: ShoppingItemEntity) => {
	const docRef = await addDoc(collection(db, 'shopping'), item);
	shoppingList.update((items) => [...items, { ...item, id: docRef.id }]);
};

export const toggleBought = async (id: string, bought: boolean) => {
	await updateDoc(doc(db, 'shopping', id), { bought });
	shoppingList.update((items) =>
		items.map((item) => (item.id === id ? { ...item, bought } : item))
	);
};

export const editShoppingItem = async (id: string, newName: string) => {
    const itemRef = doc(db, 'shopping', id);
    
    try {
        await updateDoc(itemRef, { name: newName });

        // Atualizar localmente apenas após a atualização no Firestore
        shoppingList.update(items =>
            items.map(item => (item.id === id ? { ...item, name: newName } : item))
        );
    } catch (error) {
        console.error('Erro ao editar item:', error);
    }
};

export const deleteShoppingItem = async (id: string) => {
	await deleteDoc(doc(db, 'shopping', id));
	shoppingList.update((items) => items.filter((item) => item.id !== id));
};
