<script lang="ts">
    import { createUser, isValidUser } from '$lib/user';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let name = '';
    let email = '';
    let password = '';
    let passwordConfirm = '';
    let emailVisibility = false;
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
                        goto('/');
                    }
                }, 1000);

                setTimeout(() => {
                    goto('/');
                }, 5000);
            }
        } catch (e) {
            console.error("Error checking user validity:", e);
        }
    });

    async function handleRegister() {
        error = '';

        if (!name || !email || !password || !passwordConfirm) {
            error = 'All fields are required';
            return;
        }

        const allowedDomains = ['@gmail.com', '@outlook.com', '@hotmail.com', '@yahoo.com', '@icloud.com', '@protonmail.com', '@aol.com', '@zoho.com'];
        const emailDomain = email.substring(email.indexOf('@'));
        if (!allowedDomains.includes(emailDomain)) {
            error = 'Please use a valid email from Gmail, Outlook, Hotmail, Yahoo, iCloud, ProtonMail, AOL, or Zoho';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = 'Please enter a valid email address';
            return;
        }

        if (password.length < 8) {
            error = 'Password must be at least 8 characters long';
            return;
        }

        if (password !== passwordConfirm) {
            error = 'Passwords do not match';
            return;
        }

        try {
            loading = true;
            await createUser(name, email, password, passwordConfirm, emailVisibility);
            goto('/auth/login');
        } catch (e: any) {
            error = e.message || 'Registration failed';
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
        <h1 class="text-2xl font-bold text-center mb-6">Register</h1>

        {#if error}
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
        </div>
        {/if}

        <form on:submit|preventDefault={handleRegister} class="space-y-4">
            <div>
                <label for="name" class="block text-sm font-medium">Name</label>
                <input type="text" id="name" bind:value={name} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>

            <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" bind:value={email} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
                <span class="text-xs opacity-50 mt-1">Supported email providers: Gmail, Outlook, Hotmail, Yahoo, iCloud, ProtonMail, AOL, Zoho</span>
            </div>

            <div>
                <label for="password" class="block text-sm font-medium">Password</label>
                <input type="password" id="password" bind:value={password} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>

            <div>
                <label for="passwordConfirm" class="block text-sm font-medium">Confirm Password</label>
                <input type="password" id="passwordConfirm" bind:value={passwordConfirm} class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" />
            </div>

            <div class="flex items-center">
                <input type="checkbox" id="emailVisibility" bind:checked={emailVisibility} class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                <label for="emailVisibility" class="ml-2 block text-sm">Make email visible to other users</label>
            </div>

            <button type="submit" disabled={loading || !name || !email || !password || !passwordConfirm} class="w-full py-2 px-4 bg-primary text-white rounded-md focus:outline-none disabled:opacity-50">{loading ? 'Registering...' : 'Register'}</button>
        </form>

        <p class="mt-4 text-center text-sm">
            Already have an account? 
            <a href="/auth/login" class="text-primary hover:underline">Login</a>
        </p>
        {/if}
    </div>
</div>