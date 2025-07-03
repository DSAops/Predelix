function Signup() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white/90 px-3 text-base text-zinc-900 focus:ring-2 focus:ring-fuchsia-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      <input
        type="email"
        placeholder="Email"
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white/90 px-3 text-base text-zinc-900 focus:ring-2 focus:ring-fuchsia-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      <input
        type="password"
        placeholder="Password"
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white/90 px-3 text-base text-zinc-900 focus:ring-2 focus:ring-fuchsia-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center self-end rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-700"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;