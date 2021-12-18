<template>
  <div class="flex flex-col justify-center">
    <div class="-mt-32">
      <img src="../../assets/logo_round.png" alt="" />
    </div>
    <div class="flex justify-center">
      <div class="w-full max-w-xs">
        <div class="mb-4">
          <div class="text-white text-4xl font-bold self-center">
        Login
      </div>
      <div class="text-white text-sm">
        Please sign in to continue.
      </div>
        </div>
      <form>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
            >
              Email
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-white-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value="Jane Doe"
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password"
            >
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-white-200 appearance-none border-2 border-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>
        <div class="md:flex md:items-end">
            <button
              class="shadow bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              Sign Up
            </button>
        </div>
      </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-view',
};
</script>

<style scoped>
.logo {
  top: -200px;
}
</style>
