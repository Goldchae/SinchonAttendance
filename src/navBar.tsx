import sinchon from "./image/240.png";

function GlobalNavBar() {
  return (
    <nav className='navbar navbar-dark bg-dark'>
      <img className='navbar-brand' src={sinchon} alt='logo' />
      <a id='navbar-title' className='navbar-brand' href='#'>
        알고리즘 캠프 초급 출석확인
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-bs-toggle='collapse'
        data-bs-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
    </nav>
  );
}

export default GlobalNavBar;
