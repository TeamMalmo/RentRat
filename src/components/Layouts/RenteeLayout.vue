<template>
    <header>
      <nav>
        <RouterLink to="/rentee">Home</RouterLink>
        <RouterLink to="/rentee/rats">Your Rats</RouterLink>
        <RouterLink to="/rentee/profile">Profile</RouterLink>
        <RouterLink to="/rentee/inbox">Inbox</RouterLink>
      </nav>
    </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>Copyright 2024</p>
  </footer>
  </template>