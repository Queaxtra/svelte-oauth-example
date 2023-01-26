<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import PocketBase from 'pocketbase';
    const pb = new PocketBase('http://127.0.0.1:8090');
    let nameemail = '';
    let namepassword = '';

    async function loginUser() {
        await pb.collection('users').authWithPassword(nameemail, namepassword);
        window.location.href = '/';
    }
</script>

<div class="w-80 md:w-96 lg:w-96 h-52 bg-[#292524] rounded relative ml-auto mr-auto left-0 right-0 top-40">
    <h2 class="text-center text-xl relative top-5">Login</h2>
    <div>
        <center>
            <input bind:value={nameemail} class="relative top-10 px-10 text-sm text-white/50 p-2 bg-[#1C1917] rounded" type="email" placeholder="Enter a email">
            <input bind:value={namepassword} class="relative top-12 px-10 text-sm text-white/50 p-2 bg-[#1C1917] rounded" type="password" placeholder="Enter a password">
        </center>
    </div>
    {#if !nameemail && !namepassword}
    <button disabled class="opacity-50 relative float-right mr-5 p-2 rounded px-5 top-16 text-sm text-white/50 bg-[#1C1917]">Login</button>
    {:else}
    <button on:click={loginUser} class="relative float-right mr-5 p-2 rounded px-5 top-16 text-sm text-white/50 bg-[#1C1917]">Login</button>
    {/if}
</div>