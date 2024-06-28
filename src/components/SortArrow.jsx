import SortArrowAsc from '../assets/sort-asc-svgrepo-com.svg?react';
import SortArrowDesc from '../assets/sort-desc-svgrepo-com.svg?react';
import SortArrowAscDesc from '../assets/sort-four-svgrepo-com.svg?react';
import PropTypes from 'prop-types';

const SortArrow = ({direction}) =>  {
  switch (direction) {
    case 'ASC':
      return <SortArrowAsc height="20px" width="20px" style={{verticalAlign: 'middle'}} />
    case 'DESC': 
      return <SortArrowDesc height="20px" width="20px" style={{verticalAlign: 'middle'}} />
    default:
      return <SortArrowAscDesc height="20px" width="20px" style={{verticalAlign: 'middle'}} />
  }
};

SortArrow.propTypes = {
  direction: PropTypes.string, 
};

export default SortArrow;
