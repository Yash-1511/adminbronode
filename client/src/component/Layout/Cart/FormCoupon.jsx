import React from 'react';
import style from './style';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { compose } from 'redux';
import renderTextField from '../../../commons/FormHelper/renderTextField';
import validate from './validate';
import { withStyles, Button } from '@material-ui/core';
import { resConnector } from '../../../commons/CustomAxios';

const FormCoupon = (props) => {
  const {
    classes,
    handleSubmit,
    invalid,
    submitting,
    total,
    priceSale,
  } = props;

  const submitForm = async (data) => {
    data['code'] = data.coupon.trim().toUpperCase();

    try {
      const res = await resConnector({
        url: '/coupon/check-coupon',
        method: 'get',
        params: data,
      });

      const { reduction, minimize, _id } = res.data.data;
      let totalSale = Math.round((total * parseInt(reduction)) / 100);
      priceSale(_id, totalSale > minimize ? minimize : totalSale);
    } catch ({ response }) {
      throw new SubmissionError({
        coupon: response.data.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field
        name="coupon"
        component={renderTextField}
        size="small"
        fullWidth
        label="Mã giảm giá"
        variant="outlined"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disableElevation
        className={classes.buttonApply}
        type="submit"
        disabled={invalid || submitting}
      >
        Áp dụng
      </Button>
    </form>
  );
};
export default compose(
  withStyles(style),
  reduxForm({ form: 'formCoupon', validate })
)(FormCoupon);
