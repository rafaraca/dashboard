<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { db } from '../lib/firebase';
	import { collection, doc, setDoc } from 'firebase/firestore';

	const checkedDaysSmoking = writable<{ [key: string]: boolean }>({});
	const checkedDaysAlcohol = writable<{ [key: string]: boolean }>({});

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let currentDay: number;
	let currentMonth: number;
	let currentYear: number;
	let openAccordion = -1;

	export const month: string = '';
	export const monthIndex: number = 0;

	onMount(() => {
		const now = new Date();
		currentDay = now.getDate();
		currentMonth = now.getMonth();
		currentYear = now.getFullYear();
	});

	const daysInMonth = (month: number, year: number): number => {
		return new Date(year, month + 1, 0).getDate();
	};

	const toggleAccordion = (index: number) => {
		openAccordion = openAccordion === index ? -1 : index;
	};

	const isCheckboxEnabled = (monthIndex: number, day: number): boolean => {
		return monthIndex === currentMonth && day === currentDay - 1;
	};

	const handleCheckboxToggle = async (
		id: string,
		type: 'smoking' | 'alcohol',
		isChecked: boolean,
		monthIndex: number,
		day: number
	) => {
		const stateUpdater = type === 'smoking' ? checkedDaysSmoking : checkedDaysAlcohol;

		// Update the local store with the new checked state
		stateUpdater.update((currentState) => ({
			...currentState,
			[id]: isChecked
		}));

		// Prepare data to save/update in Firebase
		const data = {
			smoking: type === 'smoking' ? isChecked : $checkedDaysSmoking[id] || false,
			alcohol: type === 'alcohol' ? isChecked : $checkedDaysAlcohol[id] || false,
			month: months[monthIndex],
			day,
			date: new Date(currentYear, monthIndex, day).toISOString()
		};

		// Save to Firebase (update existing or create new)
		try {
			const docRef = doc(collection(db, 'expenses'), id);
			await setDoc(docRef, data, { merge: true });

			// Ensure the local store is in sync with the Firebase update
			if (type === 'smoking') {
				checkedDaysSmoking.update((currentState) => ({
					...currentState,
					[id]: isChecked
				}));
			} else {
				checkedDaysAlcohol.update((currentState) => ({
					...currentState,
					[id]: isChecked
				}));
			}

			console.log(`Day ${day} data updated for ${months[monthIndex]}`);
		} catch (error) {
			console.error('Error updating Firebase:', error);
		}
	};
</script>

<div class="container">
	<div class="notification is-primary has-text-centered">FinHealthy (Finances for your Health)</div>

	{#each months as month, index}
		<div class="box">
			<header
				class="is-clickable has-background-light p-3"
				role="button"
				on:click={() => toggleAccordion(index)}
				tabindex="0"
				on:keydown={(e) => e.key === 'Enter' && toggleAccordion(index)}
			>
				<strong>{month}</strong>
			</header>
			{#if openAccordion === index}
				<div class="content p-3">
					{#each Array(daysInMonth(index, currentYear))
						.fill(0)
						.map((_, dayIndex) => dayIndex + 1) as day}
						<div class="day-entry">
							<span>Day {day}</span>

							<input
								type="checkbox"
								class:enabled={isCheckboxEnabled(index, day)}
								disabled={!isCheckboxEnabled(index, day)}
								checked={$checkedDaysSmoking[`${index}-${day}`] || false}
								class="fa-solid {$checkedDaysSmoking[`${index}-${day}`]
									? 'fa-smoking-ban has-text-success'
									: 'fa-smoking-ban has-text-danger'} fa-2x"
								on:change={(e) =>
									handleCheckboxToggle(
										`${index}-${day}`,
										'smoking',
										(e.target as HTMLInputElement)?.checked ?? false,
										index,
										day
									)}
							/>

							<input
								type="checkbox"
								class:enabled={isCheckboxEnabled(index, day)}
								disabled={!isCheckboxEnabled(index, day)}
								checked={$checkedDaysAlcohol[`${index}-${day}`] || false}
								class="fa-solid {$checkedDaysAlcohol[`${index}-${day}`]
									? 'fa-glass-water-droplet has-text-success'
									: 'fa-beer-mug-empty has-text-danger'} fa-2x"
								on:change={(e) =>
									handleCheckboxToggle(
										`${index}-${day}`,
										'alcohol',
										(e.target as HTMLInputElement)?.checked ?? false,
										index,
										day
									)}
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.day-entry {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	input[type='checkbox'] {
		margin-left: 10px;
	}

	.enabled {
		pointer-events: all;
	}

	.disabled {
		pointer-events: none;
	}
</style>
