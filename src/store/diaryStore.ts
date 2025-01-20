import { writable } from 'svelte/store';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type Diary from '../models/entity/DiaryEntity';

export const diaryEntries = writable<Diary[]>([]);

export const loadDiaryEntries = async () => {
	try {
		const q = query(collection(db, 'diary'), orderBy('timestamp', 'desc'));
		const querySnapshot = await getDocs(q);
		const entries = querySnapshot.docs.map(doc => {
			const data = doc.data();
			return {
				id: doc.id,
				feeling: data.feeling,
				timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp), 
				...data
			};
		});
		diaryEntries.set(entries);
	} catch (error) {
		console.error("Error loading diary entries:", error);
	}
};

export const addDiaryEntry = async (feeling: string, timestamp: string) => {
	try {
		await addDoc(collection(db, 'diary'), { feeling, timestamp });
		await loadDiaryEntries();
	} catch (error) {
		console.error("Error adding diary entry:", error);
	}
};
