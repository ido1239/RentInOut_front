import styled from "styled-components";

export const Wrapper = styled.div`
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .model {
    position: absolute;
    max-height: 90vh;
    top: 7vh;
    left: 25%;
    width: 50%;
    background-color: white;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    z-index: 30;
    animation: slide-down 600ms ease-in-out forwards;
    h2{
        display: none;
    }
  }
  @media (max-width: 1024px){
    .model{
    border-radius: 0;
      width: 60%;
      left: 20%;
    }
  }
  @media (max-width: 768px) {
    .model {
        border-radius: 0;
      height: 100vh;
      top: 0;
      left: 0%;
      width: 100%;
      padding: 0;
      /* overflow-x: hidden; */
      h2{
        padding: 0;
        margin: 0;
        display: block;
        top: 0;
        position: absolute;
        z-index: 30;
        right: 20px;
        width: 20px;
        color:var(--light-blue-600);
        font-size: 2em;
        cursor: pointer;
      }
    }
  }
  
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-48px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`