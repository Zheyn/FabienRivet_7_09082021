<template>
  <div class="header">
    <nav class="header_link">
      <div class="header_link-all">
        <div class="header_icon"><i class="fas fa-home"></i></div>
        <div class="header_icon-text">
          <a href="" class="header_link-profil">Accueil</a>
        </div>
      </div>
      <div class="header_link-all">
        <div class="header_icon"><i class="fas fa-user"></i></div>
        <div class="header_icon-text">
          <a href="" class="header_link-profil">Profil</a>
        </div>
      </div>
      <div class="header_link-all">
        <div class="header_icon"><i class="fas fa-sign-out-alt"></i></div>
        <div class="header_icon-text">
          <a href="" class="header_link-profil">Déconnexion</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
</script>

<style  lang="scss">
.header {
  grid-row: 1 / 5;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
  & .header_link-profil {
    display: block;
    width: 100%;
    font-size: 1.5rem;
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  & i {
    font-size: 1.6rem;
    color: rgb(0, 0, 0);
  }
  .header_link {
    width: 100%;
    position: sticky;
    top: 0;
  }
  .header_link-all {
    display: flex;
    align-items: center;
    width: 80%;
    margin-top: 10%;
    padding: 5%;
    border-radius: 50px;
  }
  & .header_icon {
    display: flex;

    width: 20%;
  }
  & .header_link-post {
    display: flex;
    justify-content: center;
    width: 80%;
    padding-top: 30px;
  }
}
</style>