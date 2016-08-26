<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Country extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/country_model');
  }

  /**
   * Get countries with/without URI parameters
   *
   * @param URI id              country id
   * @param URI status          status [1,0]
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
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'status' => $status,
      'limit' => $limit,
      'offset' => $offset
    );

    // Get Data
    try {
      $result = $this->country_model->get($opts);
      $this->set_response($result, REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'error' => [
          'classname' => get_class($e),
          'message' => $e->getMessage()
        ]
      ], 400);
    }
  }

  /**
   * Update country
   *
   * @param URI id              country id
   * @param URI status          status [1,0]
   * 
   * @return json
   */
  public function index_patch() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->patch('id');
    $description = !is_null($this->patch('description')) ? $this->patch('description') : null;
    $status = !is_null($this->patch('status')) && in_array((int) $this->patch('status'), array(1, 0)) ? (int) $this->patch('status') : null;

    // Set Update Data
    $data = array();
    if(!is_null($description)) $data['description'] = $description;
    if(!is_null($status)) $data['status'] = $status;

    // Check if $status is null
    if(count($data) == 0) {
      $this->set_response([
        'status' => FALSE,
        'error' => [
          'message' => 'no parameter passsed.'
        ]
      ], 400);
      return;
    }

    // Update Data
    try {
      $result = $this->country_model->update($data, $id);
      $this->set_response($result, REST_Controller::HTTP_OK);
    }
    catch(Exception $e) {
      $this->set_response([
        'status' => FALSE,
        'error' => [
          'classname' => get_class($e),
          'message' => $e->getMessage()
        ]
      ], 400);
    }
  }
}
