<script>
    import PocketBase from 'pocketbase';
    const pb = new PocketBase('http://127.0.0.1:8090');
    const user = pb.authStore.isValid;
    let showDropdown = false;

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function logoutUser() {
        pb.authStore.clear();
        window.location.href = '/';
    }
</script>

<nav class="w-auto h-14 bg-[#292524]">
    <h2 class="text-2xl relative ml-10 top-[10px] md:ml-40 lg:ml-40 md:top-[10px] lg:top-[10px]">Taolss</h2>
    <button class="relative float-right mr-5 -top-6 bg-[#1C1917] p-2 px-3 rounded text-white/50" on:click={toggleDropdown}><i class="fa-sharp fa-solid fa-bars"></i></button>

    {#if showDropdown}
    {#if !user}
    <div class="relative top-10 -mr-[2.5rem] float-right w-60 h-24 rounded bg-[#292524] drop-shadow-md">
        <ul>
            <li class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-3">
                <a href="/auth/login" class="relative top-1 ml-5 text-white/50"><i class="text-sm fa-solid fa-right-to-bracket"></i> Login</a>
            </li>
            <li class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-5">
                <a href="/auth/register" class="relative top-1 ml-5 text-white/50"><i class="text-sm fa-solid fa-pen-to-square"></i> Register</a>
            </li>
        </ul>
    </div>
    {:else}
    <div class="relative top-10 -mr-[2.5rem] float-right w-60 h-36 rounded bg-[#292524] drop-shadow-md">
        <ul>
            <li class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-3">
                <a href="/" class="relative top-1 ml-5 text-white/50"><i class="text-sm fa-solid fa-house"></i> Home</a>
            </li>
            <li class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-5">
                <a href="/user/profile" class="relative top-1 ml-5 text-white/50"><i class="text-sm fa-solid fa-user"></i> Profile</a>
            </li>
            <li class="relative bg-[#1C1917] w-52 h-8 rounded ml-auto mr-auto left-0 right-0 top-7">
                <button on:click={logoutUser} class="relative top-1 ml-5 text-white/50"><i class="text-sm fa-solid fa-right-from-bracket"></i> Logout</button>
            </li>
        </ul>
    </div>
    {/if}
    {/if}
</nav>