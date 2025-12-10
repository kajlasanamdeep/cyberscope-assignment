import React from 'react';
import PropTypes from 'prop-types';

export default function Loader({ message = null }) {

  const wrapperStyle = styles.centeredWrapper;

  const spinnerSize = 48;
  const spinnerStyle = {
    ...styles.spinner,
    width: spinnerSize,
    height: spinnerSize,
    borderWidth: 5
  };

  return (
    <div style={wrapperStyle} role="status" aria-live="polite" aria-busy="true">
      <div style={spinnerStyle} />
      {message && <div style={styles.message}>{message}</div>}
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string
};

const styles = {
  centeredWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  spinner: {
    borderStyle: 'solid',
    borderColor: '#e6e6e6',
    borderTopColor: '#111',
    borderRadius: '50%',
    boxSizing: 'border-box',
    animation: 'spin 0.9s linear infinite'
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#444'
  }
};

const styleSheetId = 'loader-keyframes';
if (!document.getElementById(styleSheetId)) {
  const styleEl = document.createElement('style');
  styleEl.id = styleSheetId;
  styleEl.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleEl);
}
