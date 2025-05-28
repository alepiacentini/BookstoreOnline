<!-- routes/orders/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from '../../lib/components/Navbar.svelte';
	import { authStore } from '../../lib/stores/auth.js';

	let orders = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		// Verifica autenticazione
		if (!$authStore.isAuthenticated) {
			goto('/login');
			return;
		}

		try {
			const response = await fetch('http://localhost:3000/api/orders', {
				headers: {
					'Authorization': `Bearer ${$authStore.token}`,
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
			
			if (response.ok) {
				orders = data.orders || [];
			} else {
				error = data.message || 'Errore nel caricamento degli ordini';
			}
		} catch (err) {
			error = 'Errore di connessione al server';
			console.error('Errore:', err);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleString('it-IT');
	}

	function getStatusColor(status) {
		switch (status) {
			case 'pending': return '#ffc107';
			case 'processing': return '#007bff';
			case 'shipped': return '#17a2b8';
			case 'delivered': return '#28a745';
			case 'cancelled': return '#dc3545';
			default: return '#6c757d';
		}
	}

	function getStatusText(status) {
		const statusMap = {
			'pending': 'In attesa',
			'processing': 'In elaborazione',
			'shipped': 'Spedito',
			'delivered': 'Consegnato',
			'cancelled': 'Annullato'
		};
		return statusMap[status] || status;
	}
</script>

<svelte:head>
	<title>I tuoi Ordini - Bookstore Online</title>
</svelte:head>

<Navbar />

<main class="container">
	<h1>I tuoi Ordini</h1>

	{#if loading}
		<div class="loading">
			<p>Caricamento ordini...</p>
		</div>
	{:else if error}
		<div class="error">
			<p>{error}</p>
			<button on:click={() => window.location.reload()}>Riprova</button>
		</div>
	{:else if orders.length === 0}
		<div class="empty-orders">
			<h2>Non hai ancora effettuato ordini</h2>
			<p>Inizia a esplorare i nostri libri e fai il tuo primo acquisto!</p>
			<a href="/" class="btn-primary">Esplora i Libri</a>
		</div>
	{:else}
		<div class="orders-list">
			{#each orders as order (order._id)}
				<div class="order-card">
					<div class="order-header">
						<div class="order-info">
							<h3>Ordine #{order._id.slice(-8).toUpperCase()}</h3>
							<p class="order-date">Effettuato il {formatDate(order.createdAt)}</p>
						</div>
						<div class="order-status">
							<span 
								class="status-badge" 
								style="background-color: {getStatusColor(order.status)}"
							>
								{getStatusText(order.status)}
							</span>
						</div>
					</div>

					<div class="order-items">
						<h4>Articoli ordinati:</h4>
						{#each order.items as item}
							<div class="order-item">
								<div class="item-details">
									<span class="item-title">{item.title}</span>
									<span class="item-author">di {item.author}</span>
								</div>
								<div class="item-price">
									<span class="quantity">x{item.quantity}</span>
									<span class="price">€{(item.price * item.quantity).toFixed(2)}</span>
								</div>
							</div>
						{/each}
					</div>

					<div class="order-footer">
						<div class="order-total">
							<strong>Totale: €{order.total.toFixed(2)}</strong>
						</div>
						{#if order.status === 'pending'}
							<div class="order-actions">
								<button class="btn-secondary" disabled>
									Annulla Ordine
								</button>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 20px;
		min-height: 80vh;
	}

	h1 {
		color: #333;
		margin-bottom: 30px;
		text-align: center;
	}

	.loading, .error {
		text-align: center;
		padding: 40px;
		background: #f8f9fa;
		border-radius: 8px;
		margin: 20px 0;
	}

	.error p {
		color: #dc3545;
		margin-bottom: 16px;
	}

	.error button {
		background: #007bff;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}

	.error button:hover {
		background: #0056b3;
	}

	.empty-orders {
		text-align: center;
		padding: 60px 20px;
		background: #f8f9fa;
		border-radius: 12px;
		margin: 40px 0;
	}

	.empty-orders h2 {
		color: #666;
		margin-bottom: 16px;
	}

	.empty-orders p {
		color: #888;
		margin-bottom: 24px;
		font-size: 1.1rem;
	}

	.btn-primary {
		background: #007bff;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		text-decoration: none;
		display: inline-block;
	}

	.btn-primary:hover {
		background: #0056b3;
	}

	.orders-list {
		space-y: 20px;
	}

	.order-card {
		background: white;
		border: 1px solid #eee;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 20px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid #eee;
	}

	.order-info h3 {
		margin: 0 0 8px 0;
		color: #333;
		font-size: 1.3rem;
	}

	.order-date {
		color: #666;
		margin: 0;
		font-size: 0.9rem;
	}

	.status-badge {
		padding: 6px 12px;
		color: white;
		border-radius: 20px;
		font-size: 0.85rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.order-items h4 {
		margin: 0 0 16px 0;
		color: #333;
		font-size: 1.1rem;
	}

	.order-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
		border-bottom: 1px solid #f5f5f5;
	}

	.order-item:last-child {
		border-bottom: none;
	}

	.item-details {
		flex: 1;
	}

	.item-title {
		display: block;
		font-weight: 500;
		color: #333;
		margin-bottom: 4px;
	}

	.item-author {
		display: block;
		color: #666;
		font-size: 0.9rem;
		font-style: italic;
	}

	.item-price {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.quantity {
		color: #666;
		font-size: 0.9rem;
	}

	.price {
		font-weight: bold;
		color: #007bff;
	}

	.order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
		padding-top: 16px;
		border-top: 1px solid #eee;
	}

	.order-total {
		font-size: 1.2rem;
		color: #333;
	}

	.btn-secondary {
		background: #6c757d;
		color: white;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
	}

	.btn-secondary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.order-header {
			flex-direction: column;
			gap: 12px;
			align-items: flex-start;
		}

		.order-footer {
			flex-direction: column;
			gap: 12px;
			align-items: flex-start;
		}

		.item-price {
			flex-direction: column;
			align-items: flex-end;
			gap: 4px;
		}
	}
</style>