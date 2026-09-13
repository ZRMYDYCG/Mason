<template>
  <div
    class="fixed flex w-screen h-screen justify-center items-center flex-col z-[99] overflow-hidden bg-white dark:bg-slate-900"
  >
    <div
      class="relative w-12 h-12 rotate-[165deg] before:content-[''] after:content-[''] before:absolute after:absolute before:top-2/4 after:top-2/4 before:left-2/4 after:left-2/4 before:block after:block before:w-[.5em] after:w-[.5em] before:h-[.5em] after:h-[.5em] before:rounded after:rounded before:-translate-x-1/2 after:-translate-x-1/2 before:-translate-y-2/4 after:-translate-y-2/4 before:animate-[loader-before_2s_infinite] after:animate-[loader-after_2s_infinite]"
    ></div>
  </div>
</template>

<style scoped>
@keyframes loader-before {
  0% {
    width: 0.5em;
    box-shadow:
      1em -0.5em rgb(20 85 225 / 75%),
      -1em 0.5em rgb(111 202 220 / 75%);
  }

  35% {
    width: 2.5em;
    box-shadow:
      0 -0.5em rgb(20 78 225 / 75%),
      0 0.5em rgb(111 202 220 / 75%);
  }

  70% {
    width: 0.5em;
    box-shadow:
      -1em -0.5em rgb(225 20 98 / 75%),
      1em 0.5em rgb(111 202 220 / 75%);
  }

  100% {
    box-shadow:
      1em -0.5em rgb(58 225 20 / 75%),
      -1em 0.5em rgb(111 202 220 / 75%);
  }
}

@keyframes loader-after {
  0% {
    height: 0.5em;
    box-shadow:
      0.5em 1em rgb(61 184 143 / 75%),
      -0.5em -1em rgb(233 169 32 / 75%);
  }

  35% {
    height: 2.5em;
    box-shadow:
      0.5em 0 rgb(180 184 61 / 75%),
      -0.5em 0 rgb(233 169 32 / 75%);
  }

  70% {
    height: 0.5em;
    box-shadow:
      0.5em -1em rgb(61 184 143 / 75%),
      -0.5em 1em rgb(233 169 32 / 75%);
  }

  100% {
    box-shadow:
      0.5em 1em rgb(180 61 184 / 75%),
      -0.5em -1em rgb(233 169 32 / 75%);
  }
}
</style>
