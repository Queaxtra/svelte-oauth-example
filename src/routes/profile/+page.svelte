<script lang="ts">
    import { getUser, logoutUser, deleteUser, isValidUser } from "$lib/user";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    
    let user: any;
    let showDeleteModal = false;
    let confirmEmail = '';
    let error = '';
    let message = '';
    let countdown = 5;

    onMount(async () => {
        try {
            const valid = await isValidUser();
            if (!valid) {
                message = "Please login to access your profile!";
                const timer = setInterval(() => {
                    countdown--;
                    if (countdown === 0) {
                        clearInterval(timer);
                        goto('/auth/login');
                    }
                }, 1000);

                setTimeout(() => {
                    goto('/auth/login');
                }, 5000);
                return;
            }

            user = await getUser();
        } catch (e) {
            console.error("Error:", e);
            goto('/auth/login');
        }
    });

    async function handleLogout() {
        try {
            await logoutUser();
            goto('/login');
        } catch (e) {
            console.error("Error logging out:", e);
        }
    }

    async function handleDeleteAccount() {
        if (confirmEmail !== user.email) {
            error = 'Email does not match';
            return;
        }

        try {
            await deleteUser(user.id);
            await logoutUser();
            goto('/auth/login');
        } catch (e) {
            error = 'Failed to delete account';
        }
    }
</script>

{#if message}
<div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div class="mb-4 p-6 bg-red-50 rounded-lg border border-red-100">
            <h2 class="text-lg font-semibold text-red-600 mb-2">{message}</h2>
            
            <div class="text-red-500 text-sm">
                Redirecting to login page in <span class="font-medium">{countdown}</span> seconds...
            </div>

            <div class="mt-3 w-full bg-red-200 rounded-full h-1.5">
                <div class="bg-red-500 h-1.5 rounded-full transition-all duration-1000" style="width: {(countdown / 5) * 100}%"></div>
            </div>
        </div>
    </div>
</div>
{:else if user}
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Your Profile</h2>
        <p class="mb-2">Name: {user.name}</p>
        <p class="mb-2">Email: {user.email}</p>
        <p class="mb-4">Email Visibility: {user.emailVisibility ? 'Visible' : 'Hidden'}</p>

        <div class="space-y-3">
            <button on:click={handleLogout} class="w-full py-2 px-4 bg-primary text-white rounded-md">Logout</button>
            <button on:click={() => showDeleteModal = true} class="w-full py-2 px-4 bg-red-500 text-white rounded-md">Delete Account</button>
        </div>
    </div>
</div>

{#if showDeleteModal}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 class="text-xl font-semibold mb-4">Delete Account</h3>
        <p class="mb-4">To delete your account, please enter your email address ({user.email}) to confirm.</p>

        {#if error}
        <div class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
        </div>
        {/if}

        <input type="email" bind:value={confirmEmail} placeholder="Enter your email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary mb-4" />

        <div class="flex space-x-3">
            <button on:click={() => { showDeleteModal = false; confirmEmail = ''; error = ''; }} class="flex-1 py-2 px-4 bg-gray-100 text-gray-800 rounded-md">Cancel</button>
            <button on:click={handleDeleteAccount} disabled={confirmEmail !== user.email} class="flex-1 py-2 px-4 bg-red-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">Delete Account</button>
        </div>
    </div>
</div>
{/if}
{:else}
<div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Your Profile</h2>
        <p class="mb-2">Loading...</p>
    </div>
</div>
{/if}