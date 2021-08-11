<template>
  <div class='header'>
    <nav class="header_link">
      <div class='header_link-all'>
        <div class="header_icon"><i class="fas fa-home"></i></div>
        <div class="header_icon-text"><a href="" class="header_link-profil">Accueil</a></div>
      </div>
      <div class='header_link-all'>
        <div class="header_icon"><i class="fas fa-user"></i></div>
        <div class="header_icon-text"><a href="" class="header_link-profil">Profil</a></div>
      </div>
      <div class='header_link-all'>
        <div class="header_icon"><i class="fas fa-sign-in-alt"></i></div>
        <div class="header_icon-text"><a href="" class="header_link-profil">Connexion</a></div>
      </div>
      <div class='header_link-all'>
        <div class="header_icon"><i class="fas fa-sign-out-alt"></i></div>
        <div class="header_icon-text"><a href="" class="header_link-profil">Déconnexion</a></div>
      </div>
    </nav>
  </div>
</template>

<script>
  
</script>

<style  lang="scss">
  .header{
    position: sticky;
    top: 0;
    grid-row: 1 / 5;
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100vh;
    width: 100%;
    & .header_link-profil{
      display: block;
      width: 100%;
      font-size: 1.5rem;
      text-decoration: none;
      transition: .2s ease-in-out;
      color: rgb(218, 218, 218);
    }
    & i{
      margin-right: 10%;
      padding-right: 5%;
      font-size: 1.6rem;
      transition: .2s ease-in-out;
      color: rgb(218, 218, 218);
    }
    .header_link{
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .header_link-all{
      display: flex;
      align-items: center;
      width: 80%;
      margin-top: 10%;
      padding: 5%;
      border-radius: 50px;
      transition: .2s ease-in-out;
      &:hover{
        border-radius: 50px;
        background-color: rgb(38, 44, 68);
        transition: .1s ease-in-out;
        box-shadow: 0px 0px 19px -4px rgba(0,0,0,0.31);
      }
      &:hover > .header_icon i{
        color: rgb(67, 110, 202);
        transition: .1s ease-in-out;
      }
      &:hover > .header_icon-text a{
        color: rgb(67, 110, 202);
        transition: .1s ease-in-out;
      }
    }
    & .header_icon{
      display: flex;
      
      width: 20%;
      
    }
    & .header_link-post{
      display: flex;
      justify-content: center;
      width: 80%;
      padding-top: 30px;
    }
  }
  

</style>