import React from 'react';
import { Box, InputBase } from '@mui/material';
import { styled } from '@mui/system';

const WaveInputWrapper = styled(Box)({
  position: 'relative',
  marginBottom: '1.5rem',
  width: '100%',
});

const StyledInput = styled(InputBase)({
  fontSize: '16px',
  padding: '10px 10px 10px 5px',
  display: 'block',
  width: '100%',
  border: 'none',
  borderBottom: '1px solid #515151',
  background: 'transparent',
  '&:focus': {
    outline: 'none',
  },
});

const Label = styled('label')({
  color: '#999',
  fontSize: '18px',
  fontWeight: 'normal',
  position: 'absolute',
  pointerEvents: 'none',
  left: '5px',
  top: '10px',
  display: 'flex',
  '& .label-char': {
    transition: '0.2s ease all',
    transitionDelay: 'calc(var(--index) * 0.05s)',
  },
});

const Bar = styled('span')({
  position: 'relative',
  display: 'block',
  width: '100%',
  '&:before, &:after': {
    content: '""',
    height: '2px',
    width: '0',
    bottom: '1px',
    position: 'absolute',
    background: '#5264AE',
    transition: '0.2s ease all',
  },
  '&:before': {
    left: '50%',
  },
  '&:after': {
    right: '50%',
  },
});

const WaveInput = ({ label, value, onChange, ...props }) => {
  return (
    <WaveInputWrapper>
      <StyledInput
        {...props}
        value={value}
        onChange={onChange}
        onFocus={(e) => e.target.classList.add('focused')}
        onBlur={(e) => e.target.classList.remove('focused')}
      />
      <Bar className="bar" />
      <Label className="label">
        {label.split('').map((char, index) => (
          <span key={index} className="label-char" style={{ '--index': index }}>
            {char}
          </span>
        ))}
      </Label>
    </WaveInputWrapper>
  );
};

export default WaveInput;
