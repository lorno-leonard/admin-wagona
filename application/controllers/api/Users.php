<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Users extends REST_Controller {

  private $listAccountType = array(
    'PAID-ACCOUNT',
    'FREE-ACCOUNT'
  );

  private $listPaymentStatus = array(
    'COMPLETE',
    'NOT-COMPLETE',
    'WAIVED'
  );

  function __construct() {
    parent::__construct();
    $this->load->model('api/users_model');
  }

  /**
   * Get users with/without URI parameters
   *
   * @param URI id              user id
   * @param URI status          status [1,0]
   * @param URI account_type    type of account [PAID-ACCOUNT, FREE-ACCOUNT]
   * @param URI payment_status  status of payment [COMPLETE, NOT-COMPLETE, WAIVED]
   * @param URI limit           number of records to get, default: 20
   * @param URI offset          index where to start getting records
   * 
   * @return json
   */
  public function index_get() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->get('id');
    $status = !is_null($this->get('status')) && in_array((int) $this->get('status'), array(1, 0)) ? $this->get('status') : null;
    $account_type = !is_null($this->get('account_type')) && in_array($this->get('account_type'), array('PAID-ACCOUNT', 'FREE_ACCOUNT')) ? $this->get('account_type') : null;
    $payment_status = !is_null($this->get('payment_status')) && in_array($this->get('payment_status'), array('COMPLETE', 'NOT-COMPLETE', 'WAIVED')) ? $this->get('payment_status') : null;
    $fields = !is_null($this->get('fields')) && !empty($this->get('fields'))? $this->get('fields') : null;
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'status' => $status,
      'account_type' => $account_type,
      'payment_status' => $payment_status,
      'fields' => $fields,
      'limit' => $limit,
      'offset' => $offset
    );

    // Get Data
    try {
      $result = $this->users_model->get($opts);
      $this->set_response($result, REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'classname' => get_class($e),
        'message' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Update users
   *
   * @param URI id              account id
   * @param URI status          status [1,0]
   * 
   * @return json
   */
  public function index_patch() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->patch('id');
    $accountType = !is_null($this->patch('account_type')) && in_array($this->patch('account_type'), $this->listAccountType) ? $this->patch('account_type') : null;
    $paymentStatus = !is_null($this->patch('payment_status')) && in_array($this->patch('payment_status'), $this->listPaymentStatus) ? $this->patch('payment_status') : null;
    $status = !is_null($this->patch('status')) && in_array((int) $this->patch('status'), array(1, 0)) ? (int) $this->patch('status') : null;

    // Set Update Data
    $data = array();
    if(!is_null($accountType)) $data['account_type'] = $accountType;
    if(!is_null($paymentStatus)) $data['payment_status'] = $paymentStatus;
    if(!is_null($status)) $data['status'] = $status;

    // Check if $status is null
    if(count($data) == 0) {
      $this->set_response([
        'status' => FALSE,
        'message' => 'no parameter passsed.'
      ], 400);
      return;
    }

    // Update Data
    try {
      $result = $this->users_model->update($data, $id);
      $this->set_response($result, REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'classname' => get_class($e),
        'message' => $e->getMessage()
      ], 400);
    }
  }
}
