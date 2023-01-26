<script>
    import toast, { Toaster } from 'svelte-french-toast';
    import PocketBase from 'pocketbase';
    const pb = new PocketBase('http://127.0.0.1:8090');
    let name = '';
    let nameemail = '';
    let namepassword = '';

    async function createUser() {
        await pb.collection("users").create({
            username: name,
            email: nameemail,
            password: namepassword,
            passwordConfirm: namepassword
        });
        window.location.href = '/auth/login';
    }
</script>

<div class="w-80 md:w-96 lg:w-96 h-60 bg-[#292524] rounded relative ml-auto mr-auto left-0 right-0 top-40">
    <h2 class="text-center text-xl relative top-3">Register</h2>
    <div>
        <center>
            <input bind:value={name} class="relative top-6 px-10 text-sm text-white/50 p-2 bg-[#1C1917] rounded" type="text" placeholder="Enter a username">
            <input bind:value={nameemail} class="relative top-8 px-10 text-sm text-white/50 p-2 bg-[#1C1917] rounded" type="email" placeholder="Enter a email">
            <input bind:value={namepassword} class="relative top-10 px-10 text-sm text-white/50 p-2 bg-[#1C1917] rounded" type="password" placeholder="Enter a password">
        </center>
    </div>
    {#if !name && !nameemail && !namepassword}
    <button disabled class="opacity-50 relative float-right mr-5 p-2 rounded px-5 top-14 text-sm text-white/50 bg-[#1C1917]">Register</button>
    {:else}
    <button on:click={createUser} class="relative float-right mr-5 p-2 rounded px-5 top-14 text-sm text-white/50 bg-[#1C1917]">Register</button>
    {/if}
</div>