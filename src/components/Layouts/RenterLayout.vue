<template>
    <header>
      <nav>
        <RouterLink to="/renter">Home</RouterLink>
        <RouterLink to="/renter/profile">Profile</RouterLink>
        <RouterLink to="/renter/about">About</RouterLink>
      </nav>
    </header>
    
  <main>
    <RouterView />
  </main>

    <footer>
      <p>Copyright 2024</p>
    </footer>
  </template>