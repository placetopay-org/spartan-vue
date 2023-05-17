<template>
  <article>
    <!--  <my-header
      :user="user"
      @login="$emit('login')"
      @logout="$emit('logout')"
      @createAccount="$emit('createAccount')"
    /> -->

    <section>
      <img src="./assets/cover.jpg" />
      <hr />
      <h2>Desing System</h2>
      <p>
        Hemos desarrollado un innovador sistema de diseño llamado
        <strong>"Spartan"</strong> que se utiliza tanto en proyectos actuales
        como en futuros.
      </p>

      <p>
        Nuestro objetivo al crear este sistema fue unificar la línea gráfica en
        todos los proyectos. En nuestro proceso de diseño y desarrollo, nos
        basamos en el framework llamado
        <a
          href="https://tailwindui.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Tailwind,</strong>
        </a>
        que cuenta con sus propios componentes.
      </p>

      <p>
        Esto nos permitió ahorrar mucho tiempo en el desarrollo de nuestro
        propio sistema de diseño, ya que utilizamos este framework como base
        para crear uno más personalizado.
      </p>

      <h3>Diseño</h3>
      <p>
        Nuestro sistema de diseño viene ya diseñado desde la plataforma
        <a
          href="https://www.figma.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>figma</strong>
        </a>
        el cual pueden visualizarlo en un navegador o
        <a
          href="https://www.figma.com/downloads/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>instalar el software de manera gratuita</strong>
        </a>
      </p>

      <h4>Archivos:</h4>
      <ul>
        <li>
          <strong>1. Spartan:</strong> Sistema de diseño para todos los
          proyectos, esta en constante actualización
          <a
            href="https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=0%3A1&t=V9epUvhbpmJR5icZ-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Ver archivo</strong>
          </a>
        </li>
        <li>
          <strong>2. Panel v2:</strong> Es el nuevo proyecto del nuevo panel
          para la administración de comercios
          <a
            href="https://www.figma.com/file/UIzkf2Ot20xpg7kJmPx65L/Panel-v2?type=design&node-id=0%3A1&t=QGGIyonzBEM4ICDz-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Ver archivo</strong>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
import "./page.css";
import MyHeader from "./Header.vue";

export default {
  name: "my-page",

  components: { MyHeader },

  props: {
    user: {
      type: Object,
    },
  },

  emits: ["login", "logout", "createAccount"],
};
</script>
