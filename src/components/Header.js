import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import Button from './Button'

// onAdd is prop we are catching from the parent component
const Header = ({ title, onAdd, showAdd }) => {

  // const onClick = () => {
  //   console.log('Click');
  // }

  // Return the info about the route that we are curently on
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      { location.pathname === "/" && (<Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>) }
      
      {/* <Button color="red" text="Hello 1" />
      <Button color="blue" text="Hello 2" /> */}

      {/*
        Inline CSS
        <h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1>
        <h1 style={headingStyle}>{title}</h1>
      */}
    </header>
  )
}

// Default props
Header.defaultProps = {
  title: 'Task Tracker'
}

// Types and attributes of props
Header.propTypes = {
  title: PropTypes.string.isRequired
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'blue'
// }

export default Header;