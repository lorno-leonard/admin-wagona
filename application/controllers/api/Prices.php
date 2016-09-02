<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Prices extends REST_Controller {

  function __construct() {
    parent::__construct();
    $this->load->model('api/prices_model');
  }

  /**
   * Get prices with/without URI parameters
   *
   * @param URI id              type id
   * @param URI limit           number of records to get, default: 20
   * @param URI offset          index where to start getting records
   * 
   * @return json
   */
  public function index_get() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->get('id');
    $fields = !is_null($this->get('fields')) && !empty($this->get('fields'))? $this->get('fields') : null;
    $limit = !is_null($this->get('limit')) && is_numeric($this->get('limit')) ? $this->get('limit') : null;
    $offset = !is_null($this->get('offset')) && is_numeric($this->get('offset')) ? $this->get('offset') : null;

    // Set Options
    $opts = array(
      'id' => $id,
      'fields' => $fields,
      'limit' => $limit,
      'offset' => $offset
    );

    // Get Data
    try {
      $result = $this->prices_model->get($opts);
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

  /**
   * Update price
   *
   * @param URI id              type id
   * @param URI status          status [1,0]
   * 
   * @return json
   */
  public function index_patch() {
    // Params
    $id = $this->uri->segment(3);
    $id = !is_null($id) ? $id : $this->patch('id');
    $description = !is_null($this->patch('description')) ? $this->patch('description') : null;
    $price = !is_null($this->patch('price')) ? $this->patch('price') : null;

    // Set Update Data
    $data = array();
    if(!is_null($description)) $data['description'] = $description;
    if(!is_null($price)) $data['price'] = $price;

    // Check if there's no data to be updated
    if(count($data) == 0) {
      $this->set_response([
        'status' => FALSE,
        'message' => 'no parameter passsed.'
      ], 400);
      return;
    }

    // Update Data
    try {
      $result = $this->prices_model->update($data, $id);
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
