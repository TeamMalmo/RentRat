<template>
  <footer>
    <div>
        <p>Made with ❤️ by <strong>Malmorats</strong></p>
        <p>Copyright © 2024 Team Malmö</p>
    </div>
    <a href="https://github.com/TeamMalmo/RentRat" target="_blank">
        <img src="/images/social.png" alt="github-logo" width="50px" height="50px" />
    </a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap : 1rem;
  background-color: none;
  color: black;
  text-align: center;
  padding: 1rem;
}

img:hover {
    transform: scale(1.2);
    transition: transform 0.4s ease-in-out;
}

</style>