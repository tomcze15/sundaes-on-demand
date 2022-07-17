import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({ message, variant }) => {
  const alertMeesage =
    message || 'An unexpected error occured. Please try again later.';

  const alertVariant = variant || 'danger';

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: 'red' }}>
      {alertMeesage}
    </Alert>
  );
};

export default AlertBanner;
