<script>
    import { isValidUser } from "$lib/user";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let message = '';
    let countdown = 5;

    onMount(async () => {
        try {
            const valid = await isValidUser();
            if (valid) {
                message = "Redirecting to your profile...";
                
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
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
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
    <h1 class="text-4xl font-bold mb-8">SvelteKit + Pocketbase</h1>
    <div class="space-x-4">
        <a href="/auth/login" class="px-12 py-2.5 border border-primary bg-primary text-white rounded-md">Login</a>
        <a href="/auth/register" class="px-12 py-2.5 border border-primary text-primary rounded-md hover:bg-primary transition-all duration-300 hover:text-white">Register</a>
    </div>
    {/if}
</div>