<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Users extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/users_model');
  }

  /**
   * This method will get users with specific or none URI parameters
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
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'status' => $status,
      'account_type' => $account_type,
      'payment_status' => $payment_status,
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
        'error' => [
          'classname' => get_class($e),
          'message' => $e->getMessage()
        ]
      ], 500);
    }
  }
}
