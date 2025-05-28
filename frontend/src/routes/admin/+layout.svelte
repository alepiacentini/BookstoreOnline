<script>
  import { user } from '$lib/user';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let currentUser;

  user.subscribe(value => currentUser = value);

  onMount(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      goto('/login-admin');
    }
  });
</script>

<slot />
