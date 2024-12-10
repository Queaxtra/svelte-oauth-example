<script lang="ts">
    import { loginUser, isValidUser } from '$lib/user';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let email = '';
    let password = '';
    let error = '';
    let loading = false;
    let message = '';
    let countdown = 5;

    onMount(async () => {
        try {
            const valid = await isValidUser();
            if (valid) {
                message = "You already have an account!";
                const timer = setInterval(() => {
                    countdown--;
                    if (countdown === 0) {
                        clearInterval(timer);
                        goto('/profile');
                    }
                }, 1000);

                setTimeout(() => {
                    goto('/profile');
                }, 5000);
            }
        } catch (e) {
            console.error("Error checking user validity:", e);
        }
    });

    async function handleLogin() {
        error = '';

        if (!email || !password) {
            error = 'All fields are required';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = 'Please enter a valid email address';
            return;
        }

        const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com', '@icloud.com', '@protonmail.com', '@aol.com', '@zoho.com'];
        const emailDomain = email.substring(email.indexOf('@'));
        if (!allowedDomains.includes(emailDomain)) {
            error = 'Please use a valid email from Gmail, Outlook, Hotmail, Yahoo, iCloud, ProtonMail, AOL, or Zoho';
            return;
        }

        try {
            loading = true;
            await loginUser(email, password);
            goto('/profile');
        } catch (e: any) {
            error = e.message || 'Login failed';
        } finally {
            loading = false;
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {#if message}
        <div class="mb-4 p-6 bg-red-50 rounded-lg border border-red-100">
            <h2 class="text-lg font-semibold text-red-600 mb-2">{message}</h2>

            <div class="text-red-500 text-sm">
                Redirecting to home page in <span class="font-medium">{countdown}</span> seconds...
            </div>

            <div class="mt-3 w-full bg-red-200 rounded-full h-1.5">
                <div class="bg-red-500 h-1.5 rounded-full transition-all duration-1000" style="width: {(countdown / 5) * 100}%"></div>
            </div>
        </div>
        {:else}
        <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

        {#if error}
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
        </div>
        {/if}

        <form on:submit|preventDefault={handleLogin} class="space-y-4">
            <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" bind:value={email} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium">Password</label>
                <input type="password" id="password" bind:value={password} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>

            <button type="submit" disabled={loading || !email || !password} class="w-full py-2 px-4 bg-primary text-white rounded-md focus:outline-none disabled:opacity-50">{loading ? 'Logging in...' : 'Login'}</button>
        </form>

        <p class="mt-4 text-center text-sm">
            Don't have an account?
            <a href="/auth/register" class="text-primary hover:underline">Register</a>
        </p>
        {/if}
    </div>
</div>