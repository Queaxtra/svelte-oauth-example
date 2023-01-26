<script>
    import Navbar from '../../components/Navbar.svelte';
    import PocketBase from 'pocketbase';
    const pb = new PocketBase('http://127.0.0.1:8090');
    const username = pb.authStore.model?.username;
    const email = pb.authStore.model?.email;
</script>

<Navbar />
<div class="w-80 md:w-96 lg:w-96 h-40 bg-[#292524] rounded relative ml-auto mr-auto left-0 right-0 top-52">
    <h2 class="relative top-10 text-center text-xl">{username}</h2>
    <div class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-14">
        <p class="text-center text-sm relative top-1.5 text-white/50">{email}</p>
    </div>
</div>